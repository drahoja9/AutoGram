
#include <tclap/CmdLine.h>
#include <global/GlobalData.h>
#include <measure>
#include <sstream>
#include <iostream>

#include <exception/CommonException.h>
#include <lexer/Lexer.h>
#include <parser/Parser.h>

#include <factory/XmlDataFactory.hpp>


class ALT_Interface {
public:	
	int prepareAndRun(std::string algorithm, std::string input, const char * optionalParam);
	char * getResult() { return this->m_ReturnPtr; }
	
private:
	char * m_ReturnPtr = nullptr;
	
};

int ALT_Interface::prepareAndRun ( std::string algorithm, std::string input, const char * optionalParam ) {
	try {
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
				printf("Unknow algorithm passed as parameter!");
				return 1;
			}
			
		}
		else {
			if (algorithm == "regexp_derivation")
				algorithm = "regexp::RegExpDerivation";
			else if (algorithm == "grammar_cyk")
				algorithm = "grammar::generate::CockeYoungerKasami";
			else {
				printf("Unknow algorithm passed as parameter!");
				return 1;
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
		std::cout << res.length() << std::endl;
		this->m_ReturnPtr = new char [res.length()];
		strncpy(m_ReturnPtr, res.c_str(), res.length());
		
		return 0;
	} catch ( const exception::CommonException & exception ) {
		factory::XmlDataFactory::toStdout ( exception );
		return 1;
	} catch ( const TCLAP::ArgException & exception ) {
		common::Streams::err << exception.error ( ) << std::endl;
		return 2;
	} catch ( const std::exception & exception ) {
		common::Streams::err << "Exception caught: " << exception.what ( ) << std::endl;
		return 3;
	} catch ( ... ) {
		common::Streams::err << "Unknown exception caught." << std::endl;
		return 127;
	}
}


extern "C" {
	ALT_Interface* createInterface() { return new ALT_Interface; }

	const char * runAlgorithm(ALT_Interface* interface, const char * algorithm, const char * inputFile, const char * optionalParam) {
		int resCode = interface->prepareAndRun(algorithm, inputFile, optionalParam);
		std::cout << resCode << std::endl;
		return interface->getResult();
	}
	
	void cleanUp(char * memoryToFree) {
		std::cout << &memoryToFree << std::endl;
		//free(memoryToFree);
	}
}
