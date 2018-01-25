import React from 'react';

import UsersActions from '../../../actions/users-actions';
import UsersStore from '../../../stores/users-store';

import Loading from '../../common/loading.react';
import DataIsNotAvailableClass from '../../common/data-is-not-available.react';

import UserRow from './row.react';
import PaginateBtn from '../../common/paginate-btn.react';

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
        let list = UsersStore.list,
            page = UsersStore.page,
            limit = UsersStore.limit,
            loading = true;

        this.listeners = [];
        this.state = {list, page, limit, loading};

        this.goToPage = this.goToPage.bind(this);
    }

    componentWillMount() {
        const {page, limit} = this.state;
        UsersActions.fetchUsersData({page, limit});

        //-------------------//

        this.listeners.push("getUsersListPending");
        UsersStore.on("getUsersListPending",() => {
            this.onPendingData();
        });
        this.listeners.push("getUsersListChanged");
        UsersStore.on("getUsersListChanged",() => {
            this.onChangeData();
        });
        this.listeners.push("getUsersListError");
        UsersStore.on("getUsersListError",() => {
            this.onDataError();
        });

        //-------------------//

        this.listeners.push("changePage");
        UsersStore.on("changePage",() => {
            this.onChangePage();
        });
    }

    componentWillUnmount() {
        this.listeners.forEach(eventName => UsersStore.removeAllListeners(eventName));
        this.listeners = [];
    }

    //-----------------//

    onPendingData() {
        this.setState({loading: true});
    }

    onDataError() {
        this.setState({loading: false});
    }
    
    onChangeData() {
        const list = UsersStore.list,
            loading = false;

        this.setState({list, loading});
    }

    //-----------------//

    async onChangePage() {
        const page = UsersStore.page,
            limit = this.state.limit;

        await this.setState({page, list: []});

        UsersActions.fetchUsersData({page, limit});
    }

    //-------------------//

    goToPage(page) {
        UsersActions.receivePage(page);
    }

    render() {
        const dataIsNotAvailable = !this.state.list.length && !this.state.loading ? "show" : "hidden",
            hideElements = !this.state.loading ? "show" : "hidden",
            loading = this.state.loading ? "show" : "hidden",

            disablePrevBtn = this.state.page === 1,
            disableNextBtn = this.state.limit > this.state.list.length || !this.state.list.length,

            prevPageNum = this.state.page - 1,
            nextPageNum = this.state.page + 1;

        let UsersRows = [];
        for (let i = 0; i < this.state.list.length; i++) {
            UsersRows.push(<UserRow key={i} user={this.state.list[i]}/>)
        }

        return (
            <div className="col-md-12">
                <h1 className="text-muted">USERS</h1>
                <Loading loadingClass={"users-list-loader " + loading}/>
                <DataIsNotAvailableClass dataIsNotAvailableClass={dataIsNotAvailable}/>
                <div className={hideElements}>
                    <table className="table">
                        <tbody>
                            {UsersRows}
                        </tbody>
                    </table>
                    <ul className="pagination pagination-lg">
                        <PaginateBtn
                            disabledBtn={disablePrevBtn}
                            goToPage={this.goToPage}
                            title="Prev"
                            pageNumber={prevPageNum} />
                        <PaginateBtn
                            disabledBtn={disableNextBtn}
                            goToPage={this.goToPage}
                            title="Next"
                            pageNumber={nextPageNum} />
                    </ul>
                </div>
            </div>
        );
    }
}