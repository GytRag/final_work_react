// const mainUrl = "http://213.136.82.182:3021"
// const mainUrl = "http://localhost:3021/crud"
const useStore = require("../store/main");
const mainUrl = "/api"

const {mainLink} = useStore((state) => state);


module.exports =  {
    get: (url) => {
        return new Promise(resolve => {
            fetch(mainUrl + mainLink + url)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })

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
            fetch(mainUrl + mainLink + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })

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
            fetch(mainUrl + mainLink + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })

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
            fetch(mainUrl + mainLink + url, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                })

        })
    }
}