import axios from 'axios';
import {CONFIG} from './../../../config';

const UUT_BASE_URL = `${CONFIG.UUT_PROTOCOL}://${CONFIG.UUT_BASE_URL}:${CONFIG.UUT_PORT}/${CONFIG.UUT_PREFIX}`;

const UUT_BOUNDARIES_URL = `${UUT_BASE_URL}/boundaries`;


export default class ApiService {


    /*
    * BOUNDARIES
    *
    * */

    static getBoundaryHierarchy() {
        return new Promise((resolve, reject) => {
            axios.get(UUT_BOUNDARIES_URL)
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