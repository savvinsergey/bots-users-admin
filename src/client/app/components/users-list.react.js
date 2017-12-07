import React from 'react';

import UsersAPI from '../api/users-api';
import UsersActions from "../actions/users-actions";
import UsersStore from '../stores/users-store';

import UserRow from './user-row.react';

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
        let list = UsersStore.list,
            page = UsersStore.page,
            limit = UsersStore.limit,
            loading = true;

        this.state = {list, page, limit, loading};

        this.goToPage = this.goToPage.bind(this);
    }

    componentWillMount() {
        UsersAPI.fetchList(this.state.page, this.state.limit);
        UsersStore.on("changeUsersData",() => {
            this.onChangeData();
        });
        UsersStore.on("changePage",() => {
            this.onChangePage();
        });
    }

    onChangeData() {
        const list = UsersStore.list;
        const page = UsersStore.page;
        const loading = false;

        this.setState(Object.assign(this.state, {list, page, loading}));
    }

    onChangePage() {
        this.setState(Object.assign(this.state, {loading: true}));

        const page = UsersStore.page;
        UsersAPI.fetchList(page, this.state.limit);
    }

    goToPage(page) {
        UsersActions.receivePage(page);
    }

    render() {
        const dataIsNotAvailable = !this.state.list.length && !this.state.loading ? "show" : "hidden";
        const hideElements = !this.state.loading ? "show" : "hidden";
        const loading = this.state.loading ? "show" : "hidden";

        const disablePrevBtn = this.state.page === 1 ? "disabled" : "";
        const disableNextBtn = this.state.limit > this.state.list.length || !this.state.list.length ? "disabled" : "";

        const prevPageNum = this.state.page - 1;
        const nextPageNum = this.state.page + 1;

        let UsersRows = [];
        for (let i = 0; i < this.state.list.length; i++) {
            UsersRows.push(<UserRow key={i} user={this.state.list[i]}/>)
        }

        return (
            <div className="col-md-12">
                <h1 className="text-muted">USERS</h1>
                <div className={"users-list-loader " + loading}>
                    <img src="/static/ajax-loader.gif"/>
                </div>
                <div className={dataIsNotAvailable}>
                    <h3 className="list-not-available">Data is not available</h3>
                </div>
                <div className={hideElements}>
                    <table className="table">
                        <tbody>
                            {UsersRows}
                        </tbody>
                    </table>
                    <ul className="pagination pagination-lg">
                        <li className={disablePrevBtn}>
                            <a href="#"
                               onClick={() => !disablePrevBtn && this.goToPage(prevPageNum)}>Prev</a>
                        </li>
                        <li className={disableNextBtn}>
                            <a href="#"
                               onClick={() => !disableNextBtn && this.goToPage(nextPageNum)}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}