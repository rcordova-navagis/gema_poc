from .Resolver import Resolver
from .Command import Command
from .exceptions import CommandHandlerNotFound


class CommandBus:
    """
    The actual command bus, when given a command, it finds an appropriate handler
    and fires it.
    """

    #: The command name resolver, used to figure out names for commands that
    #: don't have a `handler` method.
    resolver = None

    def __init__(self, resolver=None):
        self.resolver = resolver or Resolver()

    def execute(self, command: Command):
        validator_cls = self.resolver.validator_for(command)

        if validator_cls is not None:
            validator_cls().validate(command)

        handler_cls = self.resolver.handler_for(command)

        if handler_cls is None:
            raise CommandHandlerNotFound('Unable to find handler for ' + command.__class__.__name__ )

        return handler_cls().handle(command)
