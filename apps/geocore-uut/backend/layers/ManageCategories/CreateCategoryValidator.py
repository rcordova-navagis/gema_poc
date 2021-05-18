class CreateCategoryValidator:
    def validate(self, command):
        print(command.__class__.__name__, ' validate function just executed')
