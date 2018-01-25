import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/users-constants";
import {EventEmitter} from "events";

import config from "../config";

//------------- private ----------------//

let _usersList = [];
let _page = 1;
let _limit = config.usersListLimit;

let _userData = {
    name: "",
    avatarUrl: ""
};

//------------- public ----------------//

class UsersStore extends EventEmitter {
    constructor() {
        super();

        AppDispatcher.register(action => {
            switch(action.actionType){
                // GET USERS LIST
                case ActionTypes.GET_USERS_DATA_PENDING:
                    this.emit("getUsersListPending");
                    break;
                case ActionTypes.GET_USERS_DATA_CHANGED:
                    _usersList = action.data;
                    this.emit("getUsersListChanged");
                    break;
                case ActionTypes.GET_USERS_DATA_ERROR:
                    this.emit("getUsersListError");
                    break;
                case ActionTypes.RECEIVE_PAGE:
                    _page = action.data;
                    this.emit("changePage");
                    break;

                // GET USER
                case ActionTypes.GET_USER_DATA_PENDING:
                    _userData = {};
                    this.emit("getUserDataPending");
                    break;
                case ActionTypes.GET_USER_DATA_CHANGED:
                    _userData = action.data;
                    this.emit("getUserDataChanged");
                    break;
                case ActionTypes.GET_USER_DATA_ERROR:
                    this.emit("getUserDataError");
                    break;

                // SAVE USER
                case ActionTypes.SAVE_USER_DATA_PENDING:
                    this.emit("saveUserDataPending");
                    break;
                case ActionTypes.SAVE_USER_DATA_SUCCESS:
                    this.emit("saveUserDataSuccess");
                    break;
                case ActionTypes.SAVE_USER_DATA_ERROR:
                    this.emit("saveUserDataError");
                    break;
            }
        });
    }

    get data() {
        return _userData;
    }

    get list() {
        return _usersList;
    }
    
    get page() {
        return _page;
    }

    get limit() {
        return _limit;
    }
}

export default new UsersStore();