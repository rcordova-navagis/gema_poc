from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


required_query_params = ['zooms', 'bbox', 'extension']


class SeedTilestacheLayerValidator:
    def validate_zoom(self, command):
        zooms = command.params['zooms'].split(' ')
        # if len(zooms) < 4:
        #     raise ValidationError(_("{field} invalid value".format(field='Zooms')))
        for (i, zoom) in enumerate(zooms):
            if not zoom.isdigit():
                raise ValidationError(_("{field} invalid value".format(field='Zooms')))

    def validate_padding(self, command):
        if 'padding' in command.params and (command.params['padding'] is None or not command.params['padding'].isdigit()):
            raise ValidationError(_("{field} invalid value".format(field='Padding')))

    def validate(self, command):
        print(command.__class__.__name__, ' validate function just executed')

        for k in required_query_params:
            if k not in command.params or command.params[k] is None:
                raise ValidationError(_("{field} is missing".format(field=k)))

        self.validate_zoom(command)

        self.validate_padding(command)



