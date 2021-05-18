from abc import abstractmethod, ABC
from .Command import Command


class CommandHandler(ABC):
    @abstractmethod
    def handle(self, cmd: Command):
        pass
