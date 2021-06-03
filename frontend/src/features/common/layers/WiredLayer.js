import {CONFIG} from "../../../config";
import MyMVTLayer from "./MvtLayer";

const LAYER_ATTRIBUTES_TO_SHOW = {
    'sitename': 'Sitename',
    'address': 'Address',
    'region': 'Region',
    'cell_name': 'Cell Name',
    'coverage_type': 'Coverage Type',
    '1_80_green_81_100_red': '1-80 (Green), 81-100 (Red)',
    'inner_101_mbps_1gbps_outer_50_100mps': 'Inner 101mbps - 1Gbps',
};

export default class WiredLayer {

    getColorByType(name) {
        if (name.toLowerCase() === 'indoor') {
            return [0, 229, 255];
        }

        // #7cb342 - green
        return [124, 179, 66];
    }

    getInfoData(item) {
        let data = {rows: [], title: '', subtitle: ''};

        if (item.hasOwnProperty('sitename')) data.title = item.sitename;

        if (item.hasOwnProperty('coverage_type')) data.subtitle = item.coverage_type;

        for (let key in LAYER_ATTRIBUTES_TO_SHOW) {
            if (item.hasOwnProperty(key)) {
                data.rows.push({
                    'name': LAYER_ATTRIBUTES_TO_SHOW[key],
                    'value': item[key],
                });
            }
        }

        return data;
    }

    getLayer(layer, visible=true, onClick=null) {
        console.log('WiredLayer getLayer: ',layer);

        return new MyMVTLayer({
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
            // onDataLoad: tileJson => {
            //     console.log('onDataLoad: ',tileJson);
            // },
            onClick: item => {
                console.log('onClick: ',item);
                onClick(true, this.getInfoData(item.object.properties));
            },
        });
    }
}