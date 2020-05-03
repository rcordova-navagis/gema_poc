# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .gqlschema import CategoriesMutation
# from .models import Categories
#
#
# @receiver(post_save, sender=Categories)
# def my_handler(sender, instance, created, **kwargs):
#     print('post save callback Categories')
#     print(instance)
#     print(created)
    # return CategoriesMutation(categories=instance)
