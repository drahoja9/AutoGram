import os
import ctypes


class AltInterface:
    def __init__(self):
        par_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
        self.lib = ctypes.cdll.LoadLibrary(par_dir + '/build/cpp_interface.so')

        self.lib.createInterface.restype = ctypes.c_void_p
        self.lib.deleteInterface.argtypes = [ctypes.c_void_p]

        self.lib.algorithms.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p]
        self.lib.algorithms.restype = ctypes.c_void_p

        self.lib.conversion.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_char_p, ctypes.c_char_p]
        self.lib.conversion.restype = ctypes.c_void_p

        self.lib.comparison.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_char_p]
        self.lib.comparison.restype = ctypes.c_void_p

        self.lib.getResultCode.argtypes = [ctypes.c_void_p]
        self.lib.getResultCode.restype = ctypes.c_int

        self.lib.getResult.argtypes = [ctypes.c_void_p]
        self.lib.getResult.restype = ctypes.c_char_p

        self.interface = self.lib.createInterface()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.lib.deleteInterface(self.interface)

    @staticmethod
    def _prepare_strings(*strings: str) -> list:
        res = []
        for string in strings:
            if string is not None:
                res.append(ctypes.create_string_buffer(string.encode()))
            else:
                res.append(None)

        return res

    def _parse_result(self, result_struct: int) -> tuple:
        return_code = self.lib.getResultCode(result_struct)
        result = self.lib.getResult(result_struct)
        return return_code, result.decode()

    def algorithms(self, xml_input: str, algorithm: str, optional_param: str = None) -> tuple:
        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(xml_input, algorithm, optional_param)
        result_struct = self.lib.algorithms(self.interface, *params)

        return self._parse_result(result_struct)

    def conversion(self, xml_input: str, source: str, target: str) -> tuple:
        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(xml_input, source, target)
        result_struct = self.lib.conversion(self.interface, *params)

        return self._parse_result(result_struct)

    def comparison(self, input1: str, input1_type: str, input2: str, input2_type: str) -> tuple:
        if input1_type != 'fa':
            _, input1 = self.conversion(input1, input1_type, 'fa')
        if input2_type != 'fa':
            _, input2 = self.conversion(input2, input2_type, 'fa')

        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(input1, input2)
        result_struct = self.lib.comparison(self.interface, *params)

        return self._parse_result(result_struct)
