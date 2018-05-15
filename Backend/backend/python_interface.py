"""

Python interface for `Algorithms Library Toolkit`_ (C++), using `ctypes`_ built-in library to call chosen algorithms
directly from Python code.

.. _ctypes: https://docs.python.org/3.6/library/ctypes.html
.. _Algorithms Library Toolkit: https://gitlab.fit.cvut.cz/algorithms-library-toolkit/automata-library

.. module:: python_interface
    :platform: Unix
    :synopsis: Python interface for Algorithms Library Toolkit (C++), using ctypes built-in library to call chosen \
    algorithms directly from Python code.

.. moduleauthor:: Jakub Drahos <drahoja9@fit.cvut.cz>

"""

import os
import ctypes


class AltInterfaceException(Exception):
    """

    Base exception for class :class:`AltInterface`, when something goes wrong. Carries the exception message.

    """
    def __init__(self, msg: str):
        self.msg = msg
        self.exc_type = 'AltInterfaceException'


class AltInterface:
    """

    Python class exposing methods for calling respective functions from ALT library.

    This class should be always used alongside with Python `context manager`_ as there is some cleanup needed at the
    end and this way users don't have to think about it.

    Usage example::

            with AltInterface() as interface:
                res = interface.algorithms(xml_input, algorithm_name)


    .. _context manager: https://docs.python.org/3/reference/compound_stmts.html#with

    """

    def __init__(self):
        """

        Simple constructor, providing basic setup of ctypes library - loading C++ ALT interface as dll library,
        defining types of arguments and return values for this C++ interface and creating instance of it.

        """
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
        """

        Setup method for Python context manager.

        :return: instance of this (:class:`AltInterface`) class

        """
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """

        Teardown method for Python context manager. Takes care of C++ interface cleanup.

        :param exc_type: automatically filled by context manager
        :param exc_val: automatically filled by context manager
        :param exc_tb: automatically filled by context manager

        """
        self.lib.deleteInterface(self.interface)

    @staticmethod
    def _prepare_strings(*strings: str) -> list:
        """

        Prepares list of strings for Python to C++ transformation - creates ctypes string buffers (basically C ``const
        char *`` buffers) for each one.

        :param strings: `list` of strings to be transformed

        :return: new `list` of ctypes string buffers

        """
        res = []
        for string in strings:
            if string is not None:
                res.append(ctypes.create_string_buffer(string.encode()))
            else:
                # C++ interface for ALT library has all parameters mandatory, so None (NULL) is also needed
                res.append(None)

        return res

    def _parse_result(self, result_struct: int) -> tuple:
        """

        Parses result from C++ interface (comes as void pointer, but in Python it is represented as an integer).

        :param result_struct: result structure from C++ interface

        :return: `tuple` containing result code (`int`; zero when everything's OK, non-zero otherwise) and result \
        itself (`str`)

        """
        return_code = self.lib.getResultCode(result_struct)
        result = self.lib.getResult(result_struct)
        return return_code, result.decode()

    def algorithms(self, xml_input: str, algorithm: str, optional_param: str = None) -> str:
        """

        Python wrapper method for running algorithms from C++ ALT interface.

        Currently supported algorithms are:

        * ``'automaton_determinization'``
        * ``'automaton_minimization'``
        * ``'automaton_trim'``
        * ``'automaton_normalization'``
        * ``'automaton_epsilon'``
        * ``'grammar_reduction'``
        * ``'grammar_epsilon'``
        * ``'grammar_unit'``
        * ``'grammar_cnf'``
        * ``'grammar_left_recursion'``
        * ``'grammar_cyk'``
        * ``'regexp_trim'``
        * ``'regexp_derivation'``

        :param xml_input: input automaton/grammar/regexp in XML format
        :param algorithm: algorithm to be used for given input, always with prefix describing input type (e.g. \
        ``'grammar_reduction'``)
        :param optional_param: extra parameter for algorithms that need it (currently only regexp derivation and CYK)

        :return: result of the given algorithm

        :raises: :class:`AltInterfaceException`

        """
        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(xml_input, algorithm, optional_param)
        result_struct = self.lib.algorithms(self.interface, *params)
        res_code, res = self._parse_result(result_struct)

        if res_code != 0:
            raise AltInterfaceException(res)

        return res

    def conversion(self, xml_input: str, source: str, target: str) -> str:
        """

        Python wrapper method for running conversion from C++ ALT interface.

        Algorithms used for conversions:

        * FA to RG: successive construction algorithm
        * FA to RE: state elimination
        * RG to FA: successive construction algorithm
        * RG to RE: Brzozowski's algebraic method
        * RE to FA: Glushkov's NFA construction algorithm
        * RE to RG: Brzozowski's derivation algorithm
        * CFG to PDA: ###

        :param xml_input: input automaton/grammar/regexp in XML format
        :param source: conversion input type (currently allowed are only ``'fa'``, ``'rg'``, ``'re'`` and ``'cfg'``)
        :param target: conversion output type (currently allowed are only ``'fa'``, ``'rg'``, ``'re'`` and ``'pda'``)

        :return: result of conversion

        :raises: :class:`AltInterfaceException`

        """
        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(xml_input, source, target)
        result_struct = self.lib.conversion(self.interface, *params)
        res_code, res = self._parse_result(result_struct)

        if res_code != 0:
            raise AltInterfaceException(res)

        return res

    def comparison(self, input1: str, input1_type: str, input2: str, input2_type: str) -> bool:
        """

        Python wrapper method for running comparison from C++ ALT interface.

        Comparison is done by transforming both inputs to NFA/PDA and then comparing the formal languages they accept.

        .. warning::

            It's possible to compare only two sets between each other: [FA, RG, RE] and [CFG, PDA]! (e.g. You can't
            compare for example FA and PDA)

        :param input1: input automaton/grammar/regexp in XML format
        :param input1_type: type of input1 (currently allowed are only ``'fa'``, ``'rg'``, ``'re'``, ``'cfg'`` and \
        ``'pda'``)
        :param input2: input automaton/grammar/regexp in XML format
        :param input2_type: type of input2 (currently allowed are only ``'fa'``, ``'rg'``, ``'re'``, ``'cfg'`` and \
        ``'pda'``)

        :return: result of comparison ('True" or 'False')

        :raises: :class:`AltInterfaceException`

        """
        if input1_type in ['rg', 're']:
            input1 = self.conversion(input1, input1_type, 'fa')
        elif input1_type == 'cfg':
            input1 = self.conversion(input1, input1_type, 'pda')

        if input2_type in ['rg', 're']:
            input2 = self.conversion(input2, input2_type, 'fa')
        elif input1_type == 'cfg':
            input2 = self.conversion(input2, input2_type, 'pda')

        if input1_type in ['fa', 'rg', 're'] and input2_type in ['fa', 'rg', 're']:
            regular = True
        else:
            regular = False

        # The order of parameters for function _prepare_strings is very important and corresponds with order for C/C++
        # interface alone! Do not change!
        params = self._prepare_strings(input1, input2)
        result_struct = self.lib.comparison(self.interface, *params, regular)
        res_code, res = self._parse_result(result_struct)

        if res_code != 0:
            raise AltInterfaceException(res)

        return res == 'True'
