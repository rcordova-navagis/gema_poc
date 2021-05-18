import axios from 'axios';
import {VectorTile} from  '@mapbox/vector-tile';
import Protobuf from 'pbf';


// let OSM_ROADS_BASE_URL = 'http://192.168.178.4:8080/api/tilestache/osmroads1';
let OSM_ROADS_BASE_URL = 'http://192.168.178.4:1001/osmroads';
let layerExt = 'pbf';

// export default class VectorLayer {
//     static async getTile (z, x, y) {
//         return axios({
//             method: 'GET',
//             url: `${OSM_ROADS_BASE_URL}/${z}/${x}/${y}.${layerExt}`,
//             responseType: 'json'
//         });
//     }
// }

function getTile (z, x, y) {
    return `${OSM_ROADS_BASE_URL}/${z}/${x}/${y}.${layerExt}`;

    // return axios({
    //     method: 'GET',
    //     url: `${OSM_ROADS_BASE_URL}/${z}/${x}/${y}.${layerExt}`,
    //     // responseType: 'json',
    //     responseType: 'arraybuffer',
    //     headers: {Accept: 'application/x-protobuf'},
    //     transformResponse: [function (data) {
    //         return new VectorTile(new Protobuf(data));
    //     }]
    // });

    // let result = await promise;
    //
    // console.log('await result: ',result);
    //
    // return result.data ? result.data : null;
}

export {getTile};