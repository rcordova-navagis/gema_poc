import {CONFIG} from "../../../config";
import MyMVTLayer from "./MvtLayer";
import WirelessLayer from "./WirelessLayer";
import WiredLayer from "./WiredLayer";


export default class LayerResolver {
    static getLayer(layer, visible=true, onClick=null) {
        if (layer.category.name == 'Wireless') {
            return new WirelessLayer().getLayer(layer, visible, onClick);
        } else if(layer.category.name == 'Wired') {
            return new WiredLayer().getLayer(layer, visible, onClick);
        }

        return new MyMVTLayer({
            id: layer.id,
            data: `${CONFIG.TILESTACHE_BASE_URL}/${layer.dataset.django_tilestache_layer.name}/{z}/{x}/{y}.pbf`,
            pickable: false,
            filled: true,
            getFillColor: [200, 0, 0],
            getRadius: 20,
            pointRadiusMinPixels: 4,
            pointRadiusMaxPixels: 4,
            visible: visible,
            // onDataLoad: tileJson => {
            //     console.log('onDataLoad: ',tileJson);
            // },
            onClick: item => {
                console.log('onClick: ',item);
                // item.object.properties
                onClick();
            },
        });
    }
}