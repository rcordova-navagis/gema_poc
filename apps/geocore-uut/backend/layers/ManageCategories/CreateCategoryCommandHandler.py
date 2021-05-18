from libs.commander import Command, CommandHandler
from ..models import Categories
from django.forms.models import model_to_dict


class CreateCategoryCommandHandler(CommandHandler):
    def handle(self, command: Command):
        category = Categories(
            name=command.data['name']
        )

        if 'parentId' in command.data and command.data['parentId'] is not None:
            parent = Categories.objects.get(id=command.data['parentId'])
            category.parent_id = parent

        category.save()

        return model_to_dict(category)
