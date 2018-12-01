#include <global/GlobalData.h>

#include <exception/CommonException.h>
#include <lexer/Lexer.h>
#include <parser/Parser.h>


#define AUTOMATON_EPSILON_REMOVAL "automaton_epsilon"
#define AUTOMATON_DETERMINIZATION "automaton_determinization"
#define AUTOMATON_MINIMIZATION "automaton_minimization"
#define AUTOMATON_MINIMIZATION_NO_VERBOSE "automaton_minimization_no_verbose"
#define AUTOMATON_TRIM "automaton_trim"
#define AUTOMATON_NORMALIZATION "automaton_normalization"
#define GRAMMAR_REDUCTION "grammar_reduction"
#define GRAMMAR_EPSILON_REMOVAL "grammar_epsilon"
#define GRAMMAR_UNIT_RULES_REMOVAL "grammar_unit"
#define GRAMMAR_CNF_CONVERSION "grammar_cnf"
#define GRAMMAR_LEFT_RECURSION_REMOVAL "grammar_left_recursion"
#define GRAMMAR_CYK "grammar_cyk"
#define REGEXP_TRIM "regexp_trim"
#define REGEXP_DERIVATION "regexp_derivation"


struct ResultStruct {
	ResultStruct() : t_ResCode(-1), t_Result(nullptr) {}
	~ResultStruct() { delete [] this->t_Result; }

	int t_ResCode;
	char * t_Result;
};

class ALT_Interface {
public:
	ALT_Interface() : m_ResultStruct(nullptr) {}
	~ALT_Interface() { delete this->m_ResultStruct; }
	void algorithms(std::string input, std::string algorithm, const char * optionalParam);
	void convert(std::string input, std::string from, std::string to);
	void compare(std::string input1, std::string input2, bool regular);

	ResultStruct * m_ResultStruct;
	
private:
	void setResultStruct(int resCode, const char * char_result);
	void setResultStruct(int resCode, bool result);
	void prepareAndRun(std::string input, std::string algorithm);
	std::string prepareForCompare(std::string input);
};

// --------------------------------------------------------------------------------------------------------------------

void ALT_Interface::setResultStruct(int resCode, const char * char_result) {
	delete this->m_ResultStruct;
	this->m_ResultStruct = new ResultStruct();

    std::string result = char_result;
	this->m_ResultStruct->t_ResCode = resCode;
	this->m_ResultStruct->t_Result = new char [result.size()+1];
	strncpy(this->m_ResultStruct->t_Result, result.c_str(), result.size());
	this->m_ResultStruct->t_Result[result.size()] = '\0';
}

void ALT_Interface::setResultStruct(int resCode, bool result) {
    delete this->m_ResultStruct;
	this->m_ResultStruct = new ResultStruct();

	this->m_ResultStruct->t_ResCode = resCode;
	if (result) {
	    this->m_ResultStruct->t_Result = new char [5];
	    strncpy(this->m_ResultStruct->t_Result, "True", 4);
	    this->m_ResultStruct->t_Result[4] = '\0';
	}
	else {
	    this->m_ResultStruct->t_Result = new char [6];
	    strncpy(this->m_ResultStruct->t_Result, "False", 5);
	    this->m_ResultStruct->t_Result[5] = '\0';
	}
}

void ALT_Interface::prepareAndRun(std::string input, std::string algorithm) {
	cli::Environment environment;
	environment.setVariable("input", input);

	cli::Parser parser ( cli::Lexer ("") );
	std::string query = "execute sax::SaxParseInterface $input | xml::Parse ^ - | " +
	                    algorithm +
	                    "| xml::Compose - | sax::SaxComposeInterface - > $output";
	parser = cli::Parser ( cli::Lexer ( query ) );
	parser.parse ( )->run ( environment );

	std::string res = environment.getVariable< std::string >("output");
	this->setResultStruct(0, res.c_str());
}

void ALT_Interface::algorithms ( std::string input, std::string algorithm, const char * optionalParam ) {
	try {
        if (algorithm == AUTOMATON_DETERMINIZATION)
            algorithm = "automaton::determinize::Determinize";
        else if (algorithm == AUTOMATON_TRIM)
            algorithm = "automaton::simplify::Trim";
        else if (algorithm == AUTOMATON_NORMALIZATION)
            algorithm = "automaton::simplify::Normalize";
        else if (algorithm == AUTOMATON_MINIMIZATION) {
            // First we need to eliminate unreachable and pointless states (following the BI-AAG practice)
            this->algorithms(input, AUTOMATON_TRIM, nullptr);

            input = this->m_ResultStruct->t_Result;
            algorithm = "automaton::simplify::MinimizeVerbose";
        }
        else if (algorithm == AUTOMATON_MINIMIZATION_NO_VERBOSE) {
            // First we need to eliminate unreachable and pointless states (following the BI-AAG practice)
            this->algorithms(input, AUTOMATON_TRIM, nullptr);

            input = this->m_ResultStruct->t_Result;
            algorithm = "automaton::simplify::Minimize";
        }
        else if (algorithm == AUTOMATON_EPSILON_REMOVAL)
            algorithm = "automaton::simplify::EpsilonRemoverIncoming";
        else if (algorithm == GRAMMAR_REDUCTION)
            algorithm = "grammar::simplify::Trim";
        else if (algorithm == GRAMMAR_EPSILON_REMOVAL)
            algorithm = "grammar::simplify::EpsilonRemover";
        else if (algorithm == GRAMMAR_UNIT_RULES_REMOVAL)
            algorithm = "grammar::simplify::SimpleRulesRemover";
        else if (algorithm == GRAMMAR_CNF_CONVERSION)
            algorithm = "grammar::simplify::ToCNF";
        else if (algorithm == GRAMMAR_LEFT_RECURSION_REMOVAL)
            algorithm = "grammar::simplify::LeftRecursionRemover";
        else if (algorithm == REGEXP_TRIM)
            algorithm = "regexp::simplify::RegExpOptimize";
        else if (algorithm == REGEXP_DERIVATION) {
            if (! optionalParam) {
                this->setResultStruct(1, "No string to differentiate by was given!");
                return;
            }
            algorithm = "regexp::RegExpDerivation";
        }
        else if (algorithm == GRAMMAR_CYK) {
            if (! optionalParam) {
                this->setResultStruct(1, "No string for CYK was given!");
                return;
            }
            algorithm = "grammar::generate::CockeYoungerKasamiVerbose";
        }
        else {
            this->setResultStruct(1, "Unknown algorithm passed as parameter!");
            return;
        }

        if (
            optionalParam &&
            (
                algorithm.find("RegExpDerivation") != std::string::npos ||
                algorithm.find("CockeYoungerKasami") != std::string::npos
            )
           )
            algorithm += " - \"" + (std::string)optionalParam + "\" ";
        else if (! optionalParam)
            algorithm += " - ";
        else {
            this->setResultStruct(1, "Optional parameter was given even though it can't be used!");
            return;
        }

        this->prepareAndRun(input, algorithm);
	} catch ( const exception::CommonException & exception ) {
		this->setResultStruct(1, exception.what());
		return;
	} catch ( const std::exception & exception ) {
		this->setResultStruct(3, exception.what());
		return;
	} catch ( ... ) {
		this->setResultStruct(127, "Unknown exception caught.");
		return;
	}
}

void ALT_Interface::convert(std::string input, std::string from, std::string to) {
    try {
        std::string algorithm;
        if (from == "fa") {
            if (to == "fa") {
                this->setResultStruct(0, input.c_str());
			    return;
            } else if (to == "rg") {
                algorithm = "automaton::convert::ToGrammarRightRG";
            } else if (to == "re") {
                algorithm = "automaton::convert::ToRegExpStateElimination";
            } else {
                this->setResultStruct(1, "Unknown 'to' parameter passed as parameter!");
			    return;
            }
        } else if (from == "rg" || from == "cfg") {
            if (to == "fa" || to == "pda") {
                algorithm = "grammar::convert::ToAutomaton";
            } else if (to == "rg") {
                this->setResultStruct(0, input.c_str());
			    return;
            } else if (to == "re") {
                algorithm = "grammar::convert::ToRegExpAlgebraic";
            } else {
                this->setResultStruct(1, "Unknown 'to' parameter passed as parameter!");
			    return;
            }
        } else if (from == "re") {
            if (to == "fa") {
                algorithm = "regexp::convert::ToAutomatonGlushkov";
            } else if (to == "rg") {
                algorithm = "regexp::convert::ToGrammarRightRGDerivation";
            } else if (to == "re") {
                this->setResultStruct(0, input.c_str());
			    return;
            } else {
                this->setResultStruct(1, "Unknown 'to' parameter passed as parameter!");
			    return;
            }
        } else {
            this->setResultStruct(1, "Unknown 'from' parameter passed as parameter!");
			return;
        }

		this->prepareAndRun(input, algorithm + " - ");
	} catch ( const exception::CommonException & exception ) {
		this->setResultStruct(1, exception.what());
	} catch ( const std::exception & exception ) {
		this->setResultStruct(3, exception.what());
		return;
	} catch ( ... ) {
		this->setResultStruct(127, "Unknown exception caught.");
		return;
	}
}

std::string ALT_Interface::prepareForCompare(std::string input) {
    // As there is currently no comparison algorithm that can find isomorphism between two NFAs, we need to determinize,
    // minimize, trim and normalize every NFA before the comparison

    this->algorithms(input, AUTOMATON_EPSILON_REMOVAL, nullptr);
    std::string inter_res = this->m_ResultStruct->t_Result;

    this->algorithms(inter_res, AUTOMATON_DETERMINIZATION, nullptr);
    inter_res = this->m_ResultStruct->t_Result;

    this->algorithms(inter_res, AUTOMATON_MINIMIZATION_NO_VERBOSE, nullptr);
    inter_res = this->m_ResultStruct->t_Result;

    this->algorithms(inter_res, AUTOMATON_TRIM, nullptr);
    inter_res = this->m_ResultStruct->t_Result;

    this->algorithms(inter_res, AUTOMATON_NORMALIZATION, nullptr);
    return this->m_ResultStruct->t_Result;
}

void ALT_Interface::compare(std::string input1, std::string input2, bool regular) {
    try {
        if (regular) {
		    input1 = this->prepareForCompare(input1);
		    input2 = this->prepareForCompare(input2);
		}

		cli::Environment environment;
		environment.setVariable("input1", input1);
		environment.setVariable("input2", input2);

		cli::Parser parser ( cli::Lexer ("") );
		std::string query = "execute sax::SaxParseInterface $input1 | xml::Parse ^ - > $input1";
		parser = cli::Parser ( cli::Lexer ( query ) );
		parser.parse ( )->run ( environment );

		query = "execute sax::SaxParseInterface $input2 | xml::Parse ^ - > $input2";
		parser = cli::Parser ( cli::Lexer ( query ) );
		parser.parse ( )->run ( environment );

		query = "execute compare::AutomatonCompare $input1 $input2 > $output";
		parser = cli::Parser ( cli::Lexer ( query ) );
		parser.parse ( )->run ( environment );

		bool res = environment.getVariable< bool >("output");
		this->setResultStruct(0, res);

	} catch ( const exception::CommonException & exception ) {
		this->setResultStruct(1, exception.what());
		return;
	} catch ( const std::exception & exception ) {
		this->setResultStruct(3, exception.what());
		return;
	} catch ( ... ) {
		this->setResultStruct(127, "Unknown exception caught.");
		return;
	}
}


extern "C" {
	// Class ALT_Interface wrapper
	void * createInterface() { return new(std::nothrow) ALT_Interface; }
	void deleteInterface(ALT_Interface * interface) { delete interface; }
	
	ResultStruct * algorithms(ALT_Interface * interface, const char * input, const char * algorithm, const char * optionalParam) {
		interface->algorithms(input, algorithm, optionalParam);
		return interface->m_ResultStruct;
	}

	ResultStruct * conversion(ALT_Interface * interface, const char * input, const char * from, const char * to) {
	    interface->convert(input, from, to);
	    return interface->m_ResultStruct;
	}

	ResultStruct * comparison(ALT_Interface * interface, const char * input1, const char * input2, bool regular) {
	    interface->compare(input1, input2, regular);
	    return interface->m_ResultStruct;
	}
	
	// Struct ResultStruct wrapper
	int getResultCode(ResultStruct * rs) { return rs->t_ResCode; }
	const char * getResult(ResultStruct * rs) { return rs->t_Result; }
}
