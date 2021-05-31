import {CONFIG} from "../../../config";
import {MVTLayer} from '@deck.gl/geo-layers';
import WirelessLayer from "./WirelessLayer";
import WiredLayer from "./WiredLayer";


export default class LayerResolver {
    static getLayer(layer, visible=true) {
        if (layer.category.name == 'Wireless') {
            return new WirelessLayer().getLayer(layer, visible);
        } else if(layer.category.name == 'Wired') {
            return new WiredLayer().getLayer(layer, visible);
        }

        return new MVTLayer({
            id: layer.id,
            data: `${CONFIG.TILESTACHE_BASE_URL}/${layer.dataset.django_tilestache_layer.name}/{z}/{x}/{y}.pbf`,
            pickable: false,
            filled: true,
            getFillColor: [200, 0, 0],
            getRadius: 20,
            pointRadiusMinPixels: 4,
            pointRadiusMaxPixels: 4,
            visible: visible,
        });
    }
}