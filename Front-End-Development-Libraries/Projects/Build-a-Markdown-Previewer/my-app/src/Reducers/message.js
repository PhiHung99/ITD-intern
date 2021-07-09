//Trình giảm thiểu này cập nhật messagetrạng
// thái khi hành động thông báo được gửi từ bất kỳ đâu trong ứng dụng.

import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

export default function reducersMessage(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}