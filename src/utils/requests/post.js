module.exports = {
    post: function(url, headers, payload, cb) {
        this.add(url, headers, payload, (res) => {
            cb(res)
        })
    },

    add: function(url, headers, payload, cb) {

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        };

        // create fetch promise
        let promise = fetch(url , options);

        // await promise
        promise.then(function(response){
            return response.json();
        }).then(function(result){
            // success - process response
            if(result.error) {
                cb({error: result.error})
            }
            else {
                cb({result: result})
            }
        })
    },
};
