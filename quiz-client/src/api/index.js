import axios from 'axios'

export const BASE_URL = 'http://localhost:32770/';

export const ENDPOINTS = {
    participant: 'participants',
    question: 'questions',
    getAnswers: 'questions/getanswers'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}
