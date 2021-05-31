import {MVTLayer} from '@deck.gl/geo-layers';
import {CONFIG} from "../../../config";


export default class WiredLayer {

    getColorByType(name) {
        if (name.toLowerCase() === 'indoor') {
            return [0, 229, 255];
        }

        // #7cb342 - green
        return [124, 179, 66];
    }

    getLayer(layer, visible=true) {
        console.log('WiredLayer getLayer: ',layer);

        return new MVTLayer({
            id: layer.id,
            data: `${CONFIG.TILESTACHE_BASE_URL}/${layer.dataset.django_tilestache_layer.name}/{z}/{x}/{y}.pbf`,
            pickable: true,
            filled: true,
            stroked: false,
            getFillColor: this.getColorByType(layer.name),
            getRadius: 5,
            pointRadiusMinPixels: 3,
            pointRadiusMaxPixels: 4,
            visible: visible,
        });
    }
}