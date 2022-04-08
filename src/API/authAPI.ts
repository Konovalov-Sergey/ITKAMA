import { instance, ResponseType } from "./api";



type DataSetLoginType = {
    id: number
    email: string
    login: string
};

type DataLoginType = {userId: number};

export const authApi = {
    setLogin () {
        return instance.get<ResponseType<DataSetLoginType>>(`auth/me`).then(res => res.data)
    },
    login (email: string, password: string, rememberMe = false) {
        return instance.post<ResponseType<DataLoginType>>(`auth/login`, {email, password, rememberMe})
                       .then(res => res.data)
    },
    logout () {
        return instance.delete (`auth/login`)
    }
};