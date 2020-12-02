import post from "../../utils/requests/post"

const post_card = {
    postCardResult: function(data, cb) {
        // create fetch promise
        let headers = {
            'content-type':'application/json',
            'Authorization': 'Token ' + localStorage.token
        };
        let url = 'api/v1/user_card/';

        post.post(url, headers, data,(res) => {
            if (!res.error){
                cb({result: res});
            }
            else {
                cb({error: true});
            }
        });
    }
};

export default post_card;
