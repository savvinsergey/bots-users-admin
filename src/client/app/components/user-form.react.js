import React from 'react';
import {browserHistory} from 'react-router';

import UsersAPI from '../api/users-api';
import UsersStore from '../stores/users-store';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        const user = UsersStore.getOne(+this.props.params.id);
        const loading = false;

        this.state = {user, loading};

        this.updateName = this.updateName.bind(this);
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount() {
        // Example of optimization for real usage
        // const user = UsersStore.getOne(this.props.id);
        // if (!user.address) { // We should check user has all info if not then fetch all data from server
        //    UsersAPI.fetchOne(this.props.id);
        // }

        UsersAPI.fetchOne(this.props.params.id); // we can get data from users list. it was did for example using fetchOne request
        UsersStore.on("saveUserData",() => {
            this.onSaveData();
        });
    }

    onSaveData() {
        setTimeout(() => {
            this.setState(Object.assign(this.state, {loading: false}));
            browserHistory.push("/users");
        },1000);
    }

    updateName(evt) {
        this.setState(Object.assign(this.state.user,{name: evt.target.value}))
    }

    back() {
        if (this.state.loading) {
            return;
        }

        browserHistory.push("/users");
    }

    async save() {
        if (this.state.loading ||
            this.state.user.name === "") {
            return;
        }

        this.setState(Object.assign(this.state, {loading: true}));

        const user = this.state.user;
        await UsersAPI.save(user.id, user);
    }

    render() {
        const user = this.state.user;
        const loading = this.state.loading;
        const wrongName = user.name === "" || user.name.indexOf(",") !== -1;
        const disableSaveButton = loading || wrongName ? "disabled" : "";
        const saveButtonText = loading ? "SAVING..." : "SAVE";

        return (
            <div className="col-md-12">
                <h1 className="text-muted">EDIT USER</h1>
                <hr/>
                <form>
                    <div className="user-row">
                        <div className="form-group avatar">
                            <img width="50px" height="50px" src={"/avatars/" + user.avatarUrl}/>
                        </div>
                        <div className="form-group name-input">
                            <input type="text" placeholder="User name" className="form-control input-lg"
                                   value={user.name}
                                   onChange={this.updateName}/>
                        </div>
                        <div className="user-form-buttons">
                            <button type="button" className="btn btn-default"
                                onClick={this.back}>BACK</button>
                            <button type="button" className={"btn btn-primary " + disableSaveButton}
                                onClick={this.save}>{saveButtonText}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}