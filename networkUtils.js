


import got from 'got';

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));



function _request(url) {


    return got(url, {

        resolveBodyOnly: true,
        retry: {
            limit: 20,
            calculateDelay: ({computedValue}) => {
                return computedValue ;
            }
        },
        timeout: {
            request: 10000
        }
    });


}




async function get(url, https, controller) {

    return _request(url, controller);
}




export default {
    get,


}