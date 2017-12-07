import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/users-constants";

export default {
    receiveUsersData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_USERS_DATA,
            data
        });
    },
    receiveUserData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_USER_DATA,
            data
        });
    },
    saveUserData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_USER_DATA,
            data
        });
    },
    receivePage(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_PAGE,
            data
        });
    }
};