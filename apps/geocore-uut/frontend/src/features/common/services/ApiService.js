import axios from 'axios';
import {CONFIG} from './../../../config';

const UUT_BASE_URL = `${CONFIG.UUT_PROTOCOL}://${CONFIG.UUT_BASE_URL}:${CONFIG.UUT_PORT}/${CONFIG.UUT_PREFIX}`;

const UUT_LAYERS_URL = `${UUT_BASE_URL}/layers`;


export default class ApiService {

    static getUutLayers() {
        return new Promise((resolve, reject) => {
            axios.post(UUT_LAYERS_URL)
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
}