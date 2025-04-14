// const mainUrl = "http://localhost:3021"
// const mainUrl = "/api"
const mainUrl = "http://213.136.82.182:4021"
module.exports =  {
    get: (url) => {
        return new Promise(resolve => {
            fetch(mainUrl + url)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.error("FETCH ERROR:", err);
                });

        })
    },
    post: (url, data) => {
        return new Promise(resolve => {

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
            fetch(mainUrl + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.error("FETCH ERROR:", err);
                });

        })
    },
    getToken: (url) => {
        return new Promise(resolve => {

            const options = {
                method: "GET",
                headers: {
                    authorization: localStorage.getItem('token'),
                }
            }
            fetch(mainUrl + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.error("FETCH ERROR:", err);
                });

        })
    },
    postToken: (url, data) => {
        return new Promise(resolve => {

            const options = {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem('token'),
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
            fetch(mainUrl + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.error("FETCH ERROR:", err);
                });

        })
    }
}