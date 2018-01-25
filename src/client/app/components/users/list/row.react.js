import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const UserRow = ({user}) => (
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

UserRow.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatarUrl: PropTypes.string,
        name: PropTypes.string
    })
};

UserRow.defaultProps = {
    user: {
        avatarUrl: "avatars/no-image.jpg",
        name: "Name was not specified"
    }
};

export default UserRow;