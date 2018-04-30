
test: 
	rm -f build/test.so
	rm -f build/test.o
	g++ -pipe -std=c++14 -O3 -DNDEBUG -DRELEASE   -Wall -pedantic -Wextra -Werror -Wshadow -Wpointer-arith -Wcast-qual -Wdelete-non-virtual-dtor -Wredundant-decls -I/home/jakub/alt/automata-library/alib2cli/src -I/home/jakub/alt/automata-library/alib2elgo/src -I/home/jakub/alt/automata-library/alib2algo/src -I/home/jakub/alt/automata-library/alib2str/src -I/home/jakub/alt/automata-library/alib2data/src -I/home/jakub/alt/automata-library/alib2xml/src -I/home/jakub/alt/automata-library/alib2common/src -I/home/jakub/alt/automata-library/alib2abstraction/src -I/home/jakub/alt/automata-library/alib2measure/src -I/home/jakub/alt/automata-library/alib2std/src -I/usr/include/libxml2 -c -fPIC /home/jakub/BI-SP1/Backend/backend/cpp_interface.cpp -o /home/jakub/BI-SP1/Backend/build/cpp_interface.o
	g++ build/cpp_interface.o -o build/cpp_interface.so -shared -Wl,-soname,test.so,--no-as-needed -L/home/jakub/alt/automata-library/alib2cli/lib-release -L/home/jakub/alt/automata-library/alib2elgo/lib-release -L/home/jakub/alt/automata-library/alib2algo/lib-release -L/home/jakub/alt/automata-library/alib2str/lib-release -L/home/jakub/alt/automata-library/alib2data/lib-release -L/home/jakub/alt/automata-library/alib2xml/lib-release -L/home/jakub/alt/automata-library/alib2common/lib-release -L/home/jakub/alt/automata-library/alib2abstraction/lib-release -L/home/jakub/alt/automata-library/alib2measure/lib-release -L/home/jakub/alt/automata-library/alib2std/lib-release -rdynamic -lalib2cli -lalib2elgo -lalib2algo -lalib2str -lalib2data -lalib2xml -lalib2common -lalib2abstraction -lalib2measure -lalib2std -lxml2  -Wl,-rpath,/home/jakub/BI-SP1/Backend/build
	
run:
	python backend/python_interface.py
