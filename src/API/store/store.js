import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL, API_URL2} from "../http";

export default class Store {
    user = {};
    isAuth = true;
    isLoading = false;
    isNotValidate ="";
    hasChellenge= false;
    userChellenge =[]
    // isAddChellenge = false;
    isAdmin = false;
    // ДОДЕЛАТЬ АДМИНКУ

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }


    setLoading(bool) {
        this.isLoading = bool;
    }

    setIsNotValidate(message) {
        this.isNotValidate = message;
    }

    setUserChellenge(message) {
        this.userChellenge = message;
    }

    setHasChellenge(bool) {
        this.hasChellenge = bool;
    }

    setIsAddChellenge(bool) {
        this.isAddChellenge = bool;
    }


    async login(username, password) {
        try {
            const response = await AuthService.login(username, password);
            console.log("RESPONSE:", response);
            localStorage.setItem('tokenA', response.data.accessToken);
            localStorage.setItem('tokenR', response.data.refreshToken);
            localStorage.setItem('id', response.data.id);

            this.setAuth(true);
            this.setUser(response.data);
        } catch (e) {
            console.log("Ошибка при авторизации:", e);
            if (e.response) {
                console.log("Ответ сервера:", e.response);
                console.log("Сообщение об ошибке:", e.response.data ? e.response.data.message : 'Нет сообщения');
            } else {
                console.log("Ошибка сети или сервер не отвечает:", e.message);
            }
        }
    }


    async registration(name, username, password, passwordConfirmation) {
        try {
            console.log(`name ${name}\nusername ${username} \npassword ${password}passwordConf ${passwordConfirmation}`);
            const response = await AuthService.registration(name, username, password, passwordConfirmation);

            console.log(response.data);
            await this.login(username, password);
        } catch (e) {
            console.log(e.response?.data.errors)
            const errors = e.response?.data.errors;
            if (errors) {
                Object.keys(errors).forEach(key => {
                    console.log(`${errors[key]}`);
                    this.setIsNotValidate(`${errors[key]}`)

                });
            } else {
                console.log("Нет ошибок.");
            }

        }
    }




    async logout() {
        try {
            localStorage.removeItem('tokenA');
            localStorage.removeItem('tokenR');
            this.setAuth(false);
            this.setUser({});
            console.log("ВСЕ четко вышло")
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/refresh`, {refreshToken: localStorage.getItem('tokenR')});
            console.log(response);
            localStorage.setItem('tokenA', response.data.accessToken);
            localStorage.setItem('tokenR', response.data.refreshToken);
            this.setAuth(true);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    cachedUser() {
        console.log(localStorage.getItem('user'))
        const cachedUserData = JSON.parse(localStorage.getItem('user'))

        this.setUser(cachedUserData)
        this.setAuth(true);

        return JSON.parse(localStorage.getItem('user'))
    }

    async challenges(id) {
        try {
            const accessToken = localStorage.getItem('tokenA');
            const response = await axios.get(`${API_URL2}/challenges/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            this.setHasChellenge(true)
            this.setUserChellenge(response.data);

        } catch (e) {
            console.log(e.response?.data?.message || 'Произошла ошибка при получении данных');
        }
    }

    async getChellenge(id, Data) {
        try {
            const accessToken = localStorage.getItem('tokenA');
            const response = await axios.post(
                'api/v1/challenges',
                {
                    dateFrom: Data.from,
                    dateTo: Data.to,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            this.setHasChellenge(true)
            this.setUserChellenge(response.data);
            console.log("Данные успешно обновлены:", response.data);
        } catch (e) {
            console.log(e.response?.data?.message || 'Произошла ошибка при получении данных');
        }
    }

    async getUserInfo(id) {
        try {
            const accessToken = localStorage.getItem('tokenA');
            const response = await axios.get(`${API_URL2}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            this.setUser(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message || 'Произошла ошибка при получении данных');
        }
    }

    async editUserInfo(id, userData) {
        try {
            const accessToken = localStorage.getItem('tokenA');
            const response = await axios.post(
                `${API_URL2}/edit/${id}`,
                {
                    name: userData.name,
                    username: userData.username,
                    goals: userData.goals,
                    age: parseInt(userData.age, 10),
                    description: userData.description,
                    sex: userData.sex
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            this.setUser(response.data);
            console.log("Данные успешно обновлены:", response.data);
        } catch (e) {
            console.log(e.response?.data?.message || 'Произошла ошибка при получении данных');
        }
    }


    async addChellengeToUser(userId, challengeId) {
        try {
            console.log(parseInt(userId, 10), challengeId);

            const accessToken = localStorage.getItem('tokenA');
            const response = await axios.post(
                `${API_URL2}/remove/challenge`,
                { userId: parseInt(userId, 10), challengeId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            console.log("ВСЁ ЧЁТКО, ЗАПРОСЫ ХИХИХИ", response.data);
        } catch (e) {
            console.log(e.response?.data?.message || 'Произошла ошибка при получении данных');
        }
    }
}

