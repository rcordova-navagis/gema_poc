import inspect
from .Command import Command


class Resolver:

    def handler_for(self, command: Command):
        """
        Retrieve the handler class for a command. If the command implements a
        ``handler`` method, it should return the class of the handler. Otherwise
        it will search for a class with the name {CommandName}Handler.
        """
        try:
            return command.handler()
        except AttributeError:
            pass

        try:
            return getattr(self._getmodule(command), command.__class__.__name__+'Handler')
        except AttributeError:
            return None

    def validator_for(self, command: Command):
        """
        Retrieve the validator class for a command. If the command implements a
        ``validator`` method, it should return the class of the handler. Otherwise
        it will search for a class with the name {CommandName}Validator.
        """
        try:
            return command.validator()
        except AttributeError:
            pass

        try:
            return getattr(self._getmodule(command), command.__class__.__name__+'Validator')
        except AttributeError:
            return None

    def _getmodule(self, command: Command):
        return inspect.getmodule(command)
