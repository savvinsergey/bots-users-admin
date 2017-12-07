import lodash from "lodash";

import AppDispatcher from "../dispatcher/app-dispatcher";
import {ActionTypes} from "../constants/users-constants";
import {EventEmitter} from "events";

import config from "../config";

//------------- private ----------------//

let _users = [];
let _page = 1;
let _limit = config.usersListLimit;

//------------- public ----------------//

class UsersStore extends EventEmitter {
    constructor() {
        super();

        AppDispatcher.register(action => {
            let index;
            switch(action.actionType){
                case ActionTypes.RECEIVE_USERS_DATA:
                    _users = action.data;

                    this.emit("changeUsersData");
                    break;
                case ActionTypes.RECEIVE_USER_DATA:
                    index = lodash.findIndex(_users,{id: action.data.id});
                    _users[index] = action.data;
                    break;
                case ActionTypes.SAVE_USER_DATA:
                    index = lodash.findIndex(_users,{id: action.data.id});
                    _users[index] = action.data;

                    this.emit("saveUserData");
                    break;
                case ActionTypes.RECEIVE_PAGE:
                    _page = action.data;

                    this.emit("changePage");
                    break;
            }
        });
    }

    getOne(id) {
        let index = lodash.findIndex(_users,{id});
        if (!_users[index]) {
            return {};
        }

        return _users[index];
    }

    get list() {
        return _users;
    }
    
    get page() {
        return _page;
    }

    get limit() {
        return _limit;
    }
}

export default new UsersStore();