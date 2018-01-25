import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const PaginateBtn = ({disabledBtn, goToPage, pageNumber, title}) => (
    <li className={disabledBtn ? "disabled" : ""}>
        <a href="#"
           onClick={() => !disabledBtn && goToPage(pageNumber)}>{title}</a>
    </li>
);

PaginateBtn.propTypes = {
    title: PropTypes.string.isRequired,
    goToPage: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    disabledBtn: PropTypes.bool
};

PaginateBtn.defaultProps = {
    disabledBtn: false
};

export default PaginateBtn;