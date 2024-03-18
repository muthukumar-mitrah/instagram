
const BASE_URL = 'http://192.168.1.166:7000'

const requestOptions = async (method, body) => {

    let options = {
        method: method,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    console.log('body', body)
    if(body) {
        options = {
            ...options,
            body: body,
        };
    }
    return options;
}

const request = async (url, method, body) => {
    const _url = `${BASE_URL}/${url}`;
    console.log('_url', _url)
    const options = await requestOptions(method, body);
    console.log('options', options)

    return await fetch(_url, options).then(res => {
        if(res.ok) {
            return res.json()
        }
        throw res
    })
};

export const Get = endpoint => request(endpoint, 'GET');

export const Post = (endpoint, body) => request(endpoint, 'POST', body);

export const Put = (endpoint, body) => request(endpoint, 'PUT', body);

export const Delete = endpoint => request(endpoint, 'DELETE')

export const postStory = (body) => {
    return Post('uploadStory', body)
}

export const getStories = (body) => {
    return Get('stories')
}

export const deleteStories = (id) => {
    return Delete(`delete/${id}`)
}

export const getStory = (id) => {
    return Get(`download/${id}`)
}