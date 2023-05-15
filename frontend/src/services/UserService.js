import { publicRequest, protectedRequest } from "../utils/requestMethod";

class User {

    async login({ email, password }) {
        return new Promise((resolve, reject) => {
            publicRequest().post("/auth/login", { email, password }).then(resolve).catch(reject);
        })
    }

    async register({ name, email, password, birthday, gender }) {
        return new Promise((resolve, reject) => {
            publicRequest().post("/auth/register", { name, email, password, birthday, gender }).then(resolve).catch(reject);
        })
    }

    async getUser(id) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/users/user/${id}`).then(resolve).catch(reject);
        })
    }

}

const UserService = new User();

export default UserService;