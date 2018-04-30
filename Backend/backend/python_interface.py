import os
#from ctypes import *

#par_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
#lib = cdll.LoadLibrary(par_dir + '/build/test.so')
#lib.runAlgorithm.restype = c_char_p


#inputFile = '/home/jakub/alt/automata-library/examples2/regexp/regexp.xml'
#inputFile = '/home/jakub/test/a.xml'
#algorithm = 'regexp_derivation'

#with open(inputFile, "r") as f:
#	xml_input = f.read()

#res = lib.runAlgorithm(algorithm, inputFile, None)
#print(res)
#lib.cleanUp(lib.runAlgorithm(algorithm, xml_input, ''))

import ctypes

par_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
lib = ctypes.cdll.LoadLibrary(par_dir + '/build/cpp_interface.so')

class Runner:
	def __init__(self):
		lib.createInterface.restype = ctypes.c_void_p
		
		lib.runAlgorithm.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p]
		lib.runAlgorithm.restype = ctypes.c_char_p
		
		self.obj = lib.createInterface()
		
	def runAlgorithm(self, algorithm, xml_input, optionalParam=None):
		return lib.runAlgorithm(self.obj, algorithm, xml_input, optionalParam)
		

inputFile = '/home/jakub/alt/automata-library/examples2/regexp/regexp.xml'
#inputFile = '/home/jakub/test/a.xml'
algorithm = 'regexp_derivation'

with open(inputFile, "r") as f:
	xml_input = f.read()

r = Runner()
res = r.runAlgorithm(algorithm, xml_input, '0')
print(res, len(res))

