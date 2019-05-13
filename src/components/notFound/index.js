import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const NotFound = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
    <h3>
      <Link to="/">Go To Home</Link>
    </h3>
  </div>
);

NotFound.propTypes = {
    location: PropTypes.object
}

export default NotFound;