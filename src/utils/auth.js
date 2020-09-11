module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true);
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },

    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {

        let payload = {
            username: username,
            password: pass
        };

        let headers = {
            'content-type':'application/json'
        };

        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        };

        // create fetch promise
        let promise = fetch('/api-token-auth/', options);

        // await promise
        promise.then(function(response){
            return response.json();
        }).then(function(response){
            // success - process response

            if(response.token) {
                cb({
                    authenticated: true,
                    token: response.token
                })
            }
            else {
                cb({authenticated: false})
            }
        })
    },
};
