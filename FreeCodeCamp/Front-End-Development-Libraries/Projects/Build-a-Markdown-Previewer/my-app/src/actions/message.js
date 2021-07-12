// Trình tạo hành động Redux này dành cho các hành động liên quan đến thông báo (thông báo) từ các API
import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});


export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});