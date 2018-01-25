import React from 'react';
import PropTypes from 'prop-types';

const DataIsNotAvailable = ({dataIsNotAvailableClass}) => (
    <div className={dataIsNotAvailableClass}>
        <h3 className="list-not-available">Data is not available</h3>
    </div>
);

DataIsNotAvailable.propTypes = {
    dataIsNotAvailableClass: PropTypes.string.isRequired
};

export default DataIsNotAvailable;