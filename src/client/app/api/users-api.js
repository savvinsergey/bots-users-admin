import axios from 'axios';

import config from "../config";
import UsersActions from "../actions/users-actions";

export default {
    async fetchList(page, limit) {
        try {
            const response = await axios.get(`${config.serverBaseUrl}/users`, {
                params: {page, limit}
            });

            // emulate loading
            setTimeout(() => {
                UsersActions.receiveUsersData(response.data ? response.data : []);
            }, 2000);
        } catch(err) {
            console.log("Error fetching users data");
            console.error(err);
        }
    },

    async fetchOne(id) {
        try {
            const response = await axios.get(`${config.serverBaseUrl}/user/${id}`, {});
            UsersActions.receiveUserData(response.data ? response.data : {});
        } catch(err) {
            console.log("Error fetching user data");
            console.error(err);
        }
    },

    async save(id, data) {
        try {
            const response = await axios.post(`${config.serverBaseUrl}/user/${id}`, data);
            UsersActions.saveUserData(response.data ? response.data : {});
        } catch(err) {
            console.log("Error saving user data:");
            console.error(err);
        }
    }
}