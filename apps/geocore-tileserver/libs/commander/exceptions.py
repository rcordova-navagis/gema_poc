class CommandHandlerNotFound(Exception):
    pass


class CommandBusException(Exception):
    pass


class CommandHandlerDoesNotExistException(CommandBusException):
    pass


class CommandHandlerFunctionDoesNotExistException(CommandBusException):
    pass


class CommandHandlerValidateFunctionDoesNotExistException(CommandBusException):
    pass
