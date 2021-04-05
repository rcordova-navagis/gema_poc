# import graphene
# from graphene_django.types import DjangoObjectType, ObjectType
# from .models import Categories
#
#
# class CategoriesType(DjangoObjectType):
#     class Meta:
#         model = Categories
#
#
# # class LayersType(DjangoObjectType):
# #     class Meta:
# #         model = Layers
#
#
# # # Create Input Object Types
# class CategoriesInput(graphene.InputObjectType):
#     id = graphene.ID()
#     name = graphene.String()
#     parent_id = graphene.ID()
#
#
# class CategoriesMutation(graphene.Mutation):
#     class Input(graphene.InputObjectType):
#         id = graphene.ID(required=True)
#
#     ok = graphene.Boolean()
#     category = graphene.Field(CategoriesType)
#
#     @staticmethod
#     def mutate(root, info, id):
#         category = Categories.objects.get(pk=id)
#         ok = True
#         if category:
#             return CategoriesMutation(ok=ok, category=category)
#         return CategoriesMutation(ok=ok, category=None)
#
# # class LayersInput(graphene.InputObjectType):
# #     id = graphene.ID()
# #     title = graphene.String()
# #     actors = graphene.List(ActorInput)
# #     year = graphene.Int()