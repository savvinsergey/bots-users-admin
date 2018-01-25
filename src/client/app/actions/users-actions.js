import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/users-constants";
import UsersAPI from "../api/users-api";

export default {
    // GET USERS LIST
    fetchUsersData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USERS_DATA_PENDING,
            data
        });

        UsersAPI.fetchList(data.page, data.limit);
    },
    getUsersDataChanged(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USERS_DATA_CHANGED,
            data
        });
    },
    getUsersDataError(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USERS_DATA_ERROR,
            data
        });
    },
    receivePage(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_PAGE,
            data
        });
    },

    // GET USER
    fetchUserData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USER_DATA_PENDING,
            data
        });

        UsersAPI.fetchOne(data.id);
    },
    getUserDataChanged(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USER_DATA_CHANGED,
            data
        });
    },
    getUserDataError(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_USER_DATA_ERROR,
            data
        });
    },

    // SAVE USER
    saveUserData(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_USER_DATA_PENDING,
            data
        });
        
        UsersAPI.save(data.id, data);
    },
    saveUserDataError(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_USER_DATA_ERROR,
            data
        });
    },
    saveUserDataSuccess(data) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.SAVE_USER_DATA_SUCCESS,
            data
        });
    }

};