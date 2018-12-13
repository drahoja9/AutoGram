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
ALT_PATH = /usr/include/algorithms-library


interface:
	mkdir -p build
	$(CXX) -pipe -std=c++14 -O3 -DNDEBUG -DRELEASE   -Wall -pedantic -Wextra -Werror -Wshadow -Wpointer-arith -Wcast-qual -Wdelete-non-virtual-dtor -Wredundant-decls -I$(ALT_PATH) -c -fPIC backend/cpp_interface.cpp -o build/cpp_interface.o
	$(CXX) build/cpp_interface.o -o build/cpp_interface.so -shared -Wl,--no-as-needed  -lalib2aux -lalib2cli -lalib2elgo -lalib2algo -lalib2str -lalib2data -lalib2xml -lalib2common -lalib2abstraction -lalib2std -rdynamic

clean_interface:
	rm -rf build


