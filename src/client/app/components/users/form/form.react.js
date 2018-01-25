import React from 'react';
import {browserHistory} from 'react-router';

import UsersActions from '../../../actions/users-actions';
import UsersStore from '../../../stores/users-store';

import Loading from '../../common/loading.react';
import DataIsNotAvailableClass from '../../common/data-is-not-available.react';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        const user = UsersStore.data,
            loadingSave = false,
            loadingPage = true;

        this.listeners = [];
        this.redirectTimeout = null;
        this.state = {user, loadingSave, loadingPage};

        this.updateName = this.updateName.bind(this);
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount() {
        const {id} = this.props.params;
        UsersActions.fetchUserData({id});         

        //-----------------//

        this.listeners.push("getUserDataPending");
        UsersStore.on("getUserDataPending",() => {
            this.onGetDataPending();
        });
        this.listeners.push("getUserDataChanged");
        UsersStore.on("getUserDataChanged",() => {
            this.onGetDataSuccess();
        });
        this.listeners.push("getUserDataError");
        UsersStore.on("getUserDataError",() => {
            this.onGetDataError();
        });

        //-----------------//

        this.listeners.push("saveUserDataPending");
        UsersStore.on("saveUserDataPending",() => {
            this.onSaveDataPending();
        });
        this.listeners.push("saveUserDataSuccess");
        UsersStore.on("saveUserDataSuccess",() => {
            this.onSaveDataSuccess();
        });
        this.listeners.push("saveUserDataError");
        UsersStore.on("saveUserDataError",() => {
            this.onSaveDataError();
        });
    }

    componentWillUnmount() {
        this.listeners.forEach(eventName => UsersStore.removeAllListeners(eventName));
        this.listeners = [];

        clearTimeout(this.redirectTimeout);
    }
    
    //-----------------//

    onGetDataPending() {
        this.setState({loadingPage: true});
    }
    onGetDataSuccess() {
        const user = UsersStore.data,
            loadingPage = false;

        this.setState({user, loadingPage});
    }
    onGetDataError() {
        this.setState({loadingPage: false});
    }

    //-----------------//

    onSaveDataPending() {
        this.setState({loadingSave: true});
    }
    async onSaveDataSuccess() {
        await this.setState({loadingSave: false});

        this.redirectTimeout = setTimeout(() => browserHistory.push("/users"), 500);
    }
    onSaveDataError(){
        this.setState({loadingSave: false});
    }

    //-----------------//

    updateName(evt) {
        this.setState(Object.assign(this.state.user,{name: evt.target.value}))
    }

    back() {
        if (this.state.loadingSave) {
            return;
        }

        browserHistory.push("/users");
    }

    save() {
        if (this.state.loadingSave ||
           (Object.keys(this.state.user).length && this.state.user.name === "")) {
            return;
        }

        UsersActions.saveUserData(this.state.user);
    }

    render() {
        const user = this.state.user,
            loadingSave = this.state.loadingSave,
            loadingPage = this.state.loadingPage,

            wrongName = !loadingPage && (user.name === "" || user.name.indexOf(",") !== -1),

            hideForm = !loadingPage ? "show" : "hidden",
            dataIsNotAvailable = !Object.keys(user).length && !loadingPage ? "show" : "hidden",

            loadingPageClass = loadingPage ? "show" : "hidden",

            disableSaveButton = loadingSave || wrongName ? "disabled" : "",
            saveButtonText = loadingSave ? "SAVING..." : "SAVE";

        return (
            <div className="col-md-12">
                <h1 className="text-muted">EDIT USER</h1>
                <Loading loadingClass={loadingPageClass}/>
                <DataIsNotAvailableClass dataIsNotAvailableClass={dataIsNotAvailable}/>
                <form className={hideForm}>
                    <hr/>
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