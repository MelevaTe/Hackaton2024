import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/login', { username, password });
    }

    static async registration(name, username, password, passwordConfirmation) {
        return $api.post('/register', { name,username, password, passwordConfirmation });
    }

}
