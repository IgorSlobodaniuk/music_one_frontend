import get from "../../utils/requests/get"

const card = {
    getCardData: function(role, cb) {
        // create fetch promise
        let headers = {
            'content-type':'application/json',
            'Authorization': 'Token ' + localStorage.token
        };
        let url = 'api/v1/user_card/';

        get.get(url, headers, (res) => {
            if (!res.error){
                cb({result: res});
            }
            else {
                cb({error: true});
            }
        });
    }
};

export default card;
