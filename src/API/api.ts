import axios from "axios";

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
    followDelete (userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    followPost (userId: number) {
        return instance.post(`follow/${userId}`)
    },
    getProfile (userId: number) {
        console.log('this method is obsolete. please use profileApi')
        return profileApi.getProfile(userId)
    }
};

export const profileApi = {
    getProfile (userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};
export enum ResultCodesEnum {Success = 0, Error = 1}

type DataResponseType = {
    id: number
    email: string
    login: string
};

type SetLoginResponseType = {
    data: DataResponseType
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginMeResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authApi = {
    setLogin () {
        return instance.get<SetLoginResponseType>(`auth/me`).then(res => res.data)
    },
    login (email: string, password: string, rememberMe = false) {
        return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe})
                       .then(res => res.data)
    },
    logout () {
        return instance.delete (`auth/login`)
    }
};




