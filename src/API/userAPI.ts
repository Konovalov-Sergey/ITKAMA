import { GetItemsType, instance, ResponseType } from "./api";


export const usersApi = {
    getUsers (currentPage=1, pageSize=10, term = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        .then(res => res.data);
    },
    follow (userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow (userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    }
};