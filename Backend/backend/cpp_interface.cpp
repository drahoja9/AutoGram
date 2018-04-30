
#include <tclap/CmdLine.h>
#include <global/GlobalData.h>
#include <measure>
#include <sstream>
#include <iostream>

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
	void prepareAndRun(std::string algorithm, std::string input, const char * optionalParam);

	ResultStruct * m_ResultStruct;
	
private:
	void setResultStruct(int resCode, std::string result) {
		this->m_ResultStruct->t_ResCode = resCode;
		this->m_ResultStruct->t_Result = new char [result.length()];
		strncpy(this->m_ResultStruct->t_Result, result.c_str(), result.size());
		this->m_ResultStruct->t_Result[result.size()] = '\0';
	}
};

void ALT_Interface::prepareAndRun ( std::string algorithm, std::string input, const char * optionalParam ) {
	try {
		if (this->m_ResultStruct)
			delete this->m_ResultStruct;
		this->m_ResultStruct = new ResultStruct();
	
		if (!optionalParam) {
			if (algorithm == "automaton_determinization")
				algorithm = "automaton::determinize::Determinize";
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
				this->setResultStruct(1, "Unknow algorithm passed as parameter!");
				return;
			}
			
		}
		else {
			if (algorithm == "regexp_derivation")
				algorithm = "regexp::RegExpDerivation";
			else if (algorithm == "grammar_cyk")
				algorithm = "grammar::generate::CockeYoungerKasami";
			else {
				this->setResultStruct(1, "Unknow algorithm passed as parameter!");
				return;
			}
		}

		cli::Environment environment;
		environment.setVariable("input", input);
			
		cli::Parser parser ( cli::Lexer ("") );
		
		std::string query = "execute sax::SaxParseInterface $input | xml::Parse ^ - | " + algorithm + " - ";
		if (optionalParam)
			query += "\"" + (std::string)optionalParam + "\" ";
		query += "| xml::Compose - | sax::SaxComposeInterface - > $output";
		
		parser = cli::Parser ( cli::Lexer ( query ) );
		parser.parse ( )->run ( environment );
		
		std::string res = environment.getVariable< std::string >("output");
		this->setResultStruct(0, res);
		
	} catch ( const exception::CommonException & exception ) {
		this->setResultStruct(1, exception.what());
		return;
	} catch ( const TCLAP::ArgException & exception ) {
		this->setResultStruct(2, exception.error());
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
	
	ResultStruct * runAlgorithm(ALT_Interface* interface, const char * algorithm, const char * inputFile, const char * optionalParam) {
		interface->prepareAndRun(algorithm, inputFile, optionalParam);
		return interface->m_ResultStruct;
	}
	
	// Struct ResultStruct wrapper
	int getResultCode(ResultStruct * rs) { return rs->t_ResCode; }
	const char * getResult(ResultStruct * rs) { return rs->t_Result; }
}
