import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {"API-KEY" : "c95f2f5d-b2b1-4928-ac51-9ce39660503a" }         
});

export enum ResultCodesEnum {Success = 0, Error = 1};

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};

export type ResponseType<D = {}> = {
    data: D,
    resultCode: ResultCodesEnum,
    messages: Array<string>
};


