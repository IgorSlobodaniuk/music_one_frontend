import post from './requests/post'

const logout = {
    removeToken: function(cb) {
        // create fetch promise

        let headers = {'X-CSRFToken': localStorage.token};
        let url = 'user/logout/';
        let payload = {}

        delete localStorage.token;
        post.post(url, headers, payload,(res) => {
            console.log(res);
            if (!res.result.detail.error){
                cb({logged_out: true});

            }
        });
    },
};


export default logout;
