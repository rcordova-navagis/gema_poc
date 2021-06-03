import axios from 'axios';
import {CONFIG} from './../../../config';

const UUT_BASE_URL = `${CONFIG.UUT_PROTOCOL}://${CONFIG.UUT_BASE_URL}:${CONFIG.UUT_PORT}/${CONFIG.UUT_PREFIX}`;

const UUT_LAYERS_URL = `${UUT_BASE_URL}/layers`;

const UUT_BOUNDARIES_URL = `${UUT_BASE_URL}/boundaries`;


export default class ApiService {

    /*
    * LAYERS
    *
    * */

    static getUutLayers() {
        return new Promise((resolve, reject) => {
            axios.get(UUT_LAYERS_URL)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    static saveLayerCategory(name, parentId = null) {
        return new Promise((resolve, reject) => {
            axios.post(`${UUT_LAYERS_URL}/categories`, {name: name, parentId: parentId})
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    static saveLayer(data) {
        return new Promise((resolve, reject) => {
            axios.post(UUT_LAYERS_URL, data)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    /*
    * BOUNDARIES
    *
    * */

    static updateBoundaryLayer(data) {
        return new Promise((resolve, reject) => {
            axios.post(UUT_BOUNDARIES_URL, data)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }
}