import http from './http'
const ApiStore = {
    customer: {
        login: (reqDto) => http.post('/v1/login', reqDto),
        extention: () => http.get('/v1/extention')
    }
}
export default ApiStore;