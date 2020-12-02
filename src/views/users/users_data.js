import get from "../../utils/requests/get"

const users = {
    getUsers: function(role, cb) {
        // create fetch promise
        let headers = {
            'content-type':'application/json',
            'Authorization': 'Token ' + localStorage.token
        };
        let url = 'api/v1/users/' + role + '/';

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

export default users;
