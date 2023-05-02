import {protectedRequest} from "../utils/requestMethod";

class User {

    async getUser(id) {
        await protectedRequest().get(`/users/user/${id}`)
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            });
    }
}

export default User;