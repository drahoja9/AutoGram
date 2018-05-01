ALT_PATH=/home/jakub/alt/automata-library
ROOT_PATH=/home/jakub/BI-SP1/Backend

SOURCE_PATH=$(ROOT_PATH)/backend
BUILD_PATH=$(ROOT_PATH)/build


interface:
	mkdir -p $(BUILD_PATH)
	g++ -pipe -std=c++14 -O3 -DNDEBUG -DRELEASE   -Wall -pedantic -Wextra -Werror -Wshadow -Wpointer-arith -Wcast-qual -Wdelete-non-virtual-dtor -Wredundant-decls -I$(ALT_PATH)/alib2aux/src -I$(ALT_PATH)/alib2cli/src -I$(ALT_PATH)/alib2elgo/src -I$(ALT_PATH)/alib2algo/src -I$(ALT_PATH)/alib2str/src -I$(ALT_PATH)/alib2data/src -I$(ALT_PATH)/alib2xml/src -I$(ALT_PATH)/alib2common/src -I$(ALT_PATH)/alib2abstraction/src -I$(ALT_PATH)/alib2measure/src -I$(ALT_PATH)/alib2std/src -I/usr/include/libxml2 -c -fPIC $(SOURCE_PATH)/cpp_interface.cpp -o $(BUILD_PATH)/cpp_interface.o
	g++ $(BUILD_PATH)/cpp_interface.o -o $(BUILD_PATH)/cpp_interface.so -shared -Wl,-soname,test.so,--no-as-needed -L$(ALT_PATH)/alib2aux/lib-release -L$(ALT_PATH)/alib2cli/lib-release -L$(ALT_PATH)/alib2elgo/lib-release -L$(ALT_PATH)/alib2algo/lib-release -L$(ALT_PATH)/alib2str/lib-release -L$(ALT_PATH)/alib2data/lib-release -L$(ALT_PATH)/alib2xml/lib-release -L$(ALT_PATH)/alib2common/lib-release -L$(ALT_PATH)/alib2abstraction/lib-release -L$(ALT_PATH)/alib2measure/lib-release -L$(ALT_PATH)/alib2std/lib-release -rdynamic -lalib2cli -lalib2elgo -lalib2algo -lalib2str -lalib2data -lalib2xml -lalib2common -lalib2abstraction -lalib2measure -lalib2std -lalib2aux -lxml2  -Wl,-rpath,$(ALT_PATH)/bin-release
	
run_interface:
	python $(SOURCE_PATH)/python_interface.py
	
clean:
	rm -rf $(BUILD_PATH)

