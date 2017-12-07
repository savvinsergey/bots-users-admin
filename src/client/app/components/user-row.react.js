import React from 'react';
import {Link} from 'react-router';

export default class UserRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;

        return (
            <tr>
                <td>
                    <div className="user-row">
                        <div className="avatar">
                            <img width="50px" height="50px" src={"avatars/" + user.avatarUrl}/>
                        </div>
                        <div>
                            <h3><Link to={"/user/" + user.id}>{user.name}</Link></h3>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}   