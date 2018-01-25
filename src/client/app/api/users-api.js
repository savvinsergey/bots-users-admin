import axios from 'axios';

import config from "../config";
import UsersActions from "../actions/users-actions";

export default {
    async fetchList(page, limit) {
        try {
            const response = await axios.get(`${config.serverBaseUrl}/users`, {
                params: {page, limit}
            });
            setTimeout(() => {
                UsersActions.getUsersDataChanged(response.data ? response.data : []);
            }, 2000);
        } catch(err) {
            UsersActions.getUsersDataError(err);

            console.log("Error fetching users list data");
            console.error(err);
        }
    },

    async fetchOne(id) {
        try {
            const response = await axios.get(`${config.serverBaseUrl}/user/${id}`, {});
            setTimeout(() => {
                UsersActions.getUserDataChanged(response.data ? response.data : {});
            }, 1500);
        } catch(err) {
            UsersActions.getUserDataError(err);
            
            console.log("Error fetching user data");
            console.error(err);
        }
    },

    async save(id, data) {
        try {
            const response = await axios.post(`${config.serverBaseUrl}/user/${id}`, data);
            setTimeout(() => {
                UsersActions.saveUserDataSuccess(response.data ? response.data : {});
            }, 1000);
        } catch(err) {
            UsersActions.saveUserDataError(err);
            
            console.log("Error saving user data");
            console.error(err);
        }
    }
}