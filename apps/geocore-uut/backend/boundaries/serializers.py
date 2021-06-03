from rest_framework import serializers
from .models import BoundaryCountries, BoundaryRegions, BoundaryProvinces, BoundaryMunicipalities, BoundaryBarangays


class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = BoundaryBarangays
        fields = ['id', 'psgc_ph', 'name', 'type']


class MunicipalitySerializer(serializers.ModelSerializer):
    children = serializers.ListField(child=BarangaySerializer())

    class Meta:
        model = BoundaryMunicipalities
        fields = ['id', 'psgc_ph', 'name', 'type', 'children']


class ProvinceSerializer(serializers.ModelSerializer):
    children = serializers.ListField(child=MunicipalitySerializer())

    class Meta:
        model = BoundaryProvinces
        fields = ['id', 'psgc_ph', 'name', 'type', 'children']


class RegionSerializer(serializers.ModelSerializer):
    children = serializers.ListField(child=ProvinceSerializer())

    class Meta:
        model = BoundaryRegions
        fields = ['id', 'psgc_ph', 'name', 'type', 'children']

    # def provinces(self, obj):
    #     objects = BoundaryProvinces.objects.filter(parent_id=obj['id']).values('id', 'psgc_ph', 'name', 'parent_id').all()
    #     serializer = RegionSerializer(objects, many=True)
    #     return serializer.data


class CountrySerializer(serializers.ModelSerializer):
    children = serializers.ListField(child=RegionSerializer())

    class Meta:
        model = BoundaryCountries
        fields = ['id', 'psgc_ph', 'name', 'type', 'children']

    # def regions(self, obj):
    #     objects = BoundaryRegions.objects.filter(parent_id=obj['id']).values('id', 'psgc_ph', 'name', 'parent_id').all()
    #     serializer = RegionSerializer(objects, many=True)
    #     return serializer.data