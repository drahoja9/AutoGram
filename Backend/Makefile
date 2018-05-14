################################ General ################################
# Put it first so that "make" without argument is like "make help".
help:
	@echo "Type 'make interface' to compile the python_interface.cpp into the BUILD_PATH (set in this Makefile) as shared library to be used with Python ctypes built-in library."
	@echo "Type 'make clean_interface' to clean the whole build directory set by BUILD_PATH."
	@echo "Type 'make docs' to build the html docs into the DOCS_BUILD_PATH (set in this Makefile)."
	@echo "Type 'make clean_docs' to clean the whole docs build directory set by DOCS_BUILD_PATH."

.PHONY: help Makefile interface docs clean_docs clean_interface


################################ DOCS part ################################
DOCS_SOURCE_PATH = docs/source
DOCS_BUILD_PATH = docs/build
SPHINXBUILD = sphinx-build

docs:
	"$(SPHINXBUILD)" "$(DOCS_SOURCE_PATH)" "$(DOCS_BUILD_PATH)"

clean_docs:
	rm -f "$(DOCS_BUILD_PATH)"/*


################################ C++ ALT library part ################################
ALT_PATH=/home/jakub/alt/automata-library


interface:
	mkdir -p build
	g++ -pipe -std=c++14 -O3 -DNDEBUG -DRELEASE   -Wall -pedantic -Wextra -Werror -Wshadow -Wpointer-arith -Wcast-qual -Wdelete-non-virtual-dtor -Wredundant-decls -I$(ALT_PATH)/alib2aux/src -I$(ALT_PATH)/alib2cli/src -I$(ALT_PATH)/alib2elgo/src -I$(ALT_PATH)/alib2algo/src -I$(ALT_PATH)/alib2str/src -I$(ALT_PATH)/alib2data/src -I$(ALT_PATH)/alib2xml/src -I$(ALT_PATH)/alib2common/src -I$(ALT_PATH)/alib2abstraction/src -I$(ALT_PATH)/alib2measure/src -I$(ALT_PATH)/alib2std/src -I/usr/include/libxml2 -c -fPIC backend/cpp_interface.cpp -o build/cpp_interface.o
	g++ build/cpp_interface.o -o build/cpp_interface.so -shared -Wl,-soname,test.so,--no-as-needed -L$(ALT_PATH)/alib2aux/lib-release -L$(ALT_PATH)/alib2cli/lib-release -L$(ALT_PATH)/alib2elgo/lib-release -L$(ALT_PATH)/alib2algo/lib-release -L$(ALT_PATH)/alib2str/lib-release -L$(ALT_PATH)/alib2data/lib-release -L$(ALT_PATH)/alib2xml/lib-release -L$(ALT_PATH)/alib2common/lib-release -L$(ALT_PATH)/alib2abstraction/lib-release -L$(ALT_PATH)/alib2measure/lib-release -L$(ALT_PATH)/alib2std/lib-release -rdynamic -lalib2cli -lalib2elgo -lalib2algo -lalib2str -lalib2data -lalib2xml -lalib2common -lalib2abstraction -lalib2measure -lalib2std -lalib2aux -lxml2  -Wl,-rpath,$(ALT_PATH)/bin-release

clean_interface:
	rm -rf build

