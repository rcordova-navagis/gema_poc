# from layers.forms import LayerForm


class CreateLayerValidator:
    def validate(self, command):
        # form = LayerForm(request.POST)
        # if not form.is_valid():
        #     print(form.errors.as_data())
        #     raise Exception('Invalid Form')
        print(command.__class__.__name__, ' validate function just executed')
