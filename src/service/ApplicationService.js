import axios from 'axios'
const URL = 'http://localhost:8080/gcs';

class ApplicationService {
    login(username, password) {
        return axios.post(`${URL}/users/login`,{
            username:username,
            password:password
        })
    }

    updateCertificate(id, name, price, description, duration) {
        
            return axios.post(`${URL}/certificates/${id}`,{
                name:name,
                price:price,
                description:description,
                duration:duration
            }, {
                headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
            })
        
        

    }


    addCertificate(name, price, description, duration) {
        return axios.post(`${URL}/certificates`,{
            name:name,
            price:price,
            description:description,
            duration:duration
        }, {
            headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
        })
    }

    getAllTags() {
        return axios.get(`${URL}/tags?offset=0&limit=100`, {
            headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
    })
    }

    getCertificates(queryParams){
        return axios.get(`${URL}/certificates?${queryParams}`, {
                headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
        })
    }

    getCertificateById(id){
        return axios.get(`${URL}/certificates?${id}`, {
                headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
        })
    }

    deleteCertificateById(id){
        return axios.post(`${URL}/certificates/delete/${id}`,{
                headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
            }
        )
    }

    findCertificate(searchQuery){
        return axios.get(`${URL}/certificates?${searchQuery}`, {
            headers: {'Authorization': 'Bearer_' + localStorage.getItem('jwt')}
        });
    }
}

export default new ApplicationService();