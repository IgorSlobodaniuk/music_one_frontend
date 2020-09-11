module.exports = {
    get: function(url, headers, cb) {
        this.getRequest(url, headers, cb)
    },

    getRequest: function(url, headers, cb) {
        // create fetch promise

        let options = {
            method: 'GET',
            headers: headers
        };

        let promise = fetch(url, options);

        // await promise
        promise.then(function(response){
            return response.json();
        }).then(function(res){
            // success - process response
            cb({error: false, result: res});
        })
    },
};
