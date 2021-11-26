import * as axios from "axios";

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {"API-KEY" : "c95f2f5d-b2b1-4928-ac51-9ce39660503a" }         
});

export const usersApi = {
    getUsers (currentPage=1, pageSize=10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        });
    },
    followDelete (userId) {
        return instance.delete(`follow/${userId}`)
    },
    followPost (userId) {
        return instance.post(`follow/${userId}`)
    },
    getProfile (userId) {
        console.log('this method is obsolete. please use profileApi')
        return profileApi.getProfile(userId)
    }
};

export const profileApi = {
    getProfile (userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    }
};

export const authApi = {
    setLogin () {
        return instance.get(`auth/me`)
    },
    login (email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout () {
        return instance.delete (`auth/login`)
    }
};




