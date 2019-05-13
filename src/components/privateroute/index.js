import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTE_PATH } from '../../data/config/constants';
import { getLocalAdminDetails } from '../../data/config/utils';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            (props) => {
                let oriAdminDetails = getLocalAdminDetails();
                if (oriAdminDetails && oriAdminDetails.token && oriAdminDetails.admin_id) {
                    return (
                        <Component {...props} />
                    );
                } else {
                    return (
                        <Redirect to={{ pathname: ROUTE_PATH.LOGIN, state: { from: props.location } }} />
                    );
                }
            }
        }
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object
}

export default PrivateRoute;