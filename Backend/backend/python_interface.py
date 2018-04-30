import os
import ctypes


class Runner:
	def __init__(self):
		par_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
		self.lib = ctypes.cdll.LoadLibrary(par_dir + '/build/cpp_interface.so')
	
		self.lib.createInterface.restype = ctypes.c_void_p
		self.lib.deleteInterface.argtypes = [ctypes.c_void_p]
		
		self.lib.runAlgorithm.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p]
		self.lib.runAlgorithm.restype = ctypes.c_void_p
		
		self.lib.getResultCode.argtypes = [ctypes.c_void_p]
		self.lib.getResultCode.restype = ctypes.c_int
				
		self.lib.getResult.argtypes = [ctypes.c_void_p]
		self.lib.getResult.restype = ctypes.c_char_p
		
		self.interface = self.lib.createInterface()
	
	def __enter__(self):
		return self
	
	def __exit__(self, exc_type, exc_val, exc_tb):
		self.lib.deleteInterface(self.interface)
		
	def runAlgorithm(self, algorithm, xml_input, optional_param=None):
		result_struct = self.lib.runAlgorithm(self.interface, algorithm, xml_input, optional_param)
		return_code = self.lib.getResultCode(result_struct)
		result = self.lib.getResult(result_struct)
		
		return {'return_code': return_code, 'result': result}


with Runner() as r:
	input_file = '/home/jakub/alt/automata-library/examples2/automaton/ENFSM2.xml'
	algorithm = 'automaton_epsilon'

	with open(input_file, "r") as f:
		xml_input = f.read()
	
	res = r.runAlgorithm(algorithm, xml_input)
	print(res)
	res1 = r.runAlgorithm('automaton_determinization', res['result'])
	print(res1)
	res2 = r.runAlgorithm('automaton_minimization', res1['result'])
	print(res2)

