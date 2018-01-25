import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({loadingClass, loadingSrc}) => (
    <div className={loadingClass}>
        <img src={loadingSrc}/>
    </div>
);

Loading.propTypes = {
    loadingClass: PropTypes.string.isRequired,
    loadingSrc: PropTypes.string
};

Loading.defaultProps = {
    loadingClass: "",
    loadingSrc: "/static/ajax-loader.gif"
};

export default Loading;