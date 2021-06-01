import {MVTLayer} from '@deck.gl/geo-layers';
import {ContourLayer} from '@deck.gl/aggregation-layers';
import {CONFIG} from "../../../config";
import MyMVTLayer from "./MvtLayer";

const CONTOURS = [
    {threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1}, // => Isoline for threshold 1
    {threshold: 5, color: [0, 255, 0], strokeWidth: 2}, // => Isoline for threshold 5
    {threshold: [6, 10], color: [0, 0, 255, 128]} // => Isoband for threshold range [6, 10)
];

const LAYER_ATTRIBUTES_TO_SHOW = {
    'sitename': 'Sitename',
    'address': 'Address',
    'region': 'Region',
    'coverage_type': 'Coverage Type',
    'outer_300_m_from_inner_donut': 'Outer 300m from inner/donut',
    '1_80_green_81_100_red': '1-80 (Green), 81-100 (Red)',
    'outer_50_100mps': 'Outer 50-100mbps'
};

export default class WirelessLayer {

    getColorByType(name) {
        if (name.toLowerCase() === 'inner') {
            return [156, 39, 176];
        }

        // outer
        return [51, 235, 145];
    }

    getFillColor(color, object) {
        let val = object && object.properties.hasOwnProperty('1_80_green_81_100_red')
                    ? parseInt(object.properties['1_80_green_81_100_red'])
                    : 50;
        let opacity = 130;

        if (val <= 25) {
            opacity = 50;
        } else if (val <= 50) {
            opacity = 100;
        }

        return [...color, opacity];
    }

    getRadius(object) {
        let radius = object && object.properties.hasOwnProperty('1_80_green_81_100_red')
               ? parseInt(object.properties['1_80_green_81_100_red']) * 2
               : 50;
        console.log('getRadius: ',radius);
        return radius;
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
        console.log('WirelessLayer getLayer: ',layer);

        const color = this.getColorByType(layer.name);

        return new MyMVTLayer({
            id: layer.id,
            data: `${CONFIG.TILESTACHE_BASE_URL}/${layer.dataset.django_tilestache_layer.name}/{z}/{x}/{y}.pbf`,
            pickable: true,
            filled: true,
            stroked: true,
            getFillColor: (object, objectInfo) => this.getFillColor(color, object, objectInfo),
            getLineColor: color,
            getRadius: this.getRadius,
            pointRadiusMinPixels: 10,
            visible: visible,
            // onDataLoad: tileJson => {
            //     console.log('onDataLoad: ',tileJson);
            // },
            onClick: item => {
              console.log('onClick: ',item);
              onClick(true, this.getInfoData(item.object.properties));
            },
            // renderSubLayers: props => {
            //     console.log('renderSubLayers: ',props);
            //     new ContourLayer({
            //         // Three contours are rendered.
            //         contours: CONTOURS,
            //         cellSize: 200,
            //         getPosition: d => d.COORDINATES,
            //     });
            // }
        });
    }
}