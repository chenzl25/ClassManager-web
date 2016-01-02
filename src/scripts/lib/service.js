import Immutable from 'immutable';

function Request(url, options) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;

        xhr.onload = function(event) {
            console.log(event.target.response)
            var response = Immutable.Map(event.target.response);
            if (response.get('error') == true) {
                reject(response.get('message'));
            } else {
                resolve(response);
            }
        }
        xhr.onerror = reject;

        let defaultMethod = options.data ? "POST" : "GET";

        if (options.mimeType)
            xhr.overrideMimeType(options.mimeType);

        xhr.open(options.method || defaultMethod, url);

        if (options.responseType)
            xhr.responseType = options.responseType;

        for (let header of Object.keys(options.headers || {})) 
            xhr.setRequestHeader(header, options.headers[header]);

        let data = options.data;
        if (data && Object.getPrototypeOf(data).constructor.name == "Object") {
            if (options.formData === true) {
                options.data = new FormData;
                for (let key of Object.keys(data)) {
                    options.data.append(key, data[key]);
                }
                xhr.send(options.data);
            } else {
                xhr.send(JSON.stringify(options.data));
            }
        } else {
            //GET
            xhr.send(null);
        }
    });
}
// Request("http://example.com/", {
//         method: "PUT",
//         mimeType: "application/json",
//         headers: {
//             "X-Species": "Hobbit"
//         },
//         data: {
//             foo: new File(path),
//             thing: "stuff"
//         },
//         responseType: "json"
//     });

//post json default
export function post(url, data) {
    url = '/api' + url;
    return Request(url, {
        method: "POST",
        mimeType: "application/json",
        data: data,
        responseType: "json",
        headers: {"Content-type": "application/json"},
        formData: false,
    })
}
export function postFormData(url, data) {
    url = '/api' + url;
    return Request(url, {
        method: "POST",
        data: data,
        responseType: "json",
        // headers: {"Content-type": "multipart/form-data"},
        formData: true,
    })
}
export function get(url, data) {
    url = '/api' + url;
    return Request(url, {
        method: "GET",
        mimeType: "application/json",
        responseType: "json"
    })
}
export function deleteData(url, data) {
    url = '/api' + url;
    return Request(url, {
        method: "DELETE",
        mimeType: "application/json",
        responseType: "json"
    })
}