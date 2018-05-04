#include <global/GlobalData.h>

#include <exception/CommonException.h>
#include <lexer/Lexer.h>
#include <parser/Parser.h>

#include <factory/XmlDataFactory.hpp>


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
	void compare(std::string input1, std::string input2);

	ResultStruct * m_ResultStruct;
	
private:
	void setResultStruct(int resCode, std::string result);
	void setResultStruct(int resCode, bool result);
	void prepareAndRun(std::string input, std::string algorithm);
};

void ALT_Interface::setResultStruct(int resCode, std::string result) {
	this->m_ResultStruct->t_ResCode = resCode;
	this->m_ResultStruct->t_Result = new char [result.length()];
	strncpy(this->m_ResultStruct->t_Result, result.c_str(), result.size());
	this->m_ResultStruct->t_Result[result.size()-1] = '\0';
}

void ALT_Interface::setResultStruct(int resCode, bool result) {
	this->m_ResultStruct->t_ResCode = resCode;
	this->m_ResultStruct->t_Result = new char [6];
	if (result) {
	    strncpy(this->m_ResultStruct->t_Result, "True", 4);
	    this->m_ResultStruct->t_Result[4] = '\0';
	}
	else {
	    strncpy(this->m_ResultStruct->t_Result, "False", 5);
	    this->m_ResultStruct->t_Result[5] = '\0';
	}
}

void ALT_Interface::prepareAndRun(std::string input, std::string algorithm) {
    try {
        if (this->m_ResultStruct)
			delete this->m_ResultStruct;
		this->m_ResultStruct = new ResultStruct();

		cli::Environment environment;
		environment.setVariable("input", input);

		cli::Parser parser ( cli::Lexer ("") );
		std::string query = "execute sax::SaxParseInterface $input | xml::Parse ^ - | " +
		                    algorithm +
		                    " - | xml::Compose - | sax::SaxComposeInterface - > $output";
		parser = cli::Parser ( cli::Lexer ( query ) );
		parser.parse ( )->run ( environment );

		std::string res = environment.getVariable< std::string >("output");
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

void ALT_Interface::algorithms ( std::string input, std::string algorithm, const char * optionalParam ) {
	if (!optionalParam) {
		if (algorithm == "automaton_determinization")
			algorithm = "automaton::determinize::Determinize";
		else if (algorithm == "automaton_trim")
		    algorithm = "automaton::simplify::Trim";
		else if (algorithm == "automaton_minimization")
			algorithm = "automaton::simplify::Minimize";
		else if (algorithm == "automaton_epsilon")
			algorithm = "automaton::simplify::EpsilonRemoverIncoming";
		else if (algorithm == "grammar_reduction")
			algorithm = "grammar::simplify::Trim";
		else if (algorithm == "grammar_epsilon")
			algorithm = "grammar::simplify::EpsilonRemover";
		else if (algorithm == "grammar_unit")
			algorithm = "grammar::simplify::SimpleRulesRemover";
		else if (algorithm == "grammar_cnf")
			algorithm = "grammar::simplify::ToCNF";
		else if (algorithm == "grammar_left_recursion")
			algorithm = "grammar::simplify::LeftRecursionRemover";
		else {
			this->setResultStruct(1, "Unknown algorithm passed as parameter!");
			return;
		}
	}
	else {
		if (algorithm == "regexp_derivation")
			algorithm = "regexp::RegExpDerivation";
		else if (algorithm == "grammar_cyk")
			algorithm = "grammar::generate::CockeYoungerKasami";
		else {
			this->setResultStruct(1, "Unknown algorithm passed as parameter!");
			return;
		}
	}

	if (optionalParam)
		algorithm += "\"" + (std::string)optionalParam + "\" ";

	this->prepareAndRun(input, algorithm);
}

void ALT_Interface::convert(std::string input, std::string from, std::string to) {
    try {
        std::string algorithm;
        if (from == "fa") {
            if (to == "fa") {
                this->setResultStruct(0, input);
			    return;
            } else if (to == "rg") {
                algorithm = "automaton::convert::ToGrammarRightRG";
            } else if (to == "re") {
                algorithm = "automaton::convert::ToRegExpStateElimination";
            } else {
                this->setResultStruct(1, "Unknown 'to' parameter passed as parameter!");
			    return;
            }
        } else if (from == "rg") {
            if (to == "fa") {
                algorithm = "grammar::convert::ToAutomaton";
            } else if (to == "rg") {
                this->setResultStruct(0, input);
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
                this->setResultStruct(0, input);
			    return;
            } else {
                this->setResultStruct(1, "Unknown 'to' parameter passed as parameter!");
			    return;
            }
        } else {
            this->setResultStruct(1, "Unknown 'from' parameter passed as parameter!");
			    return;
        }

		this->prepareAndRun(input, algorithm);
	} catch ( const exception::CommonException & exception ) {
		this->setResultStruct(1, exception.what());
	}
}

void ALT_Interface::compare(std::string input1, std::string input2) {
    try {
        if (this->m_ResultStruct)
			delete this->m_ResultStruct;
		this->m_ResultStruct = new ResultStruct();

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

	ResultStruct * comparison(ALT_Interface * interface, const char * input1, const char * input2) {
	    interface->compare(input1, input2);
	    return interface->m_ResultStruct;
	}
	
	// Struct ResultStruct wrapper
	int getResultCode(ResultStruct * rs) { return rs->t_ResCode; }
	const char * getResult(ResultStruct * rs) { return rs->t_Result; }
}
