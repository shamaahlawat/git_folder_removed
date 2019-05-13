import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import * as CONSTANTS from './data/config/constants';

import PrivateRoute from './components/privateroute';
import NotFound from './components/notFound';
import App from './app';
import PageContainer from './app/pagecontainer';
import Login from './app/authentication/login';
import Conversation from './app/pagecontainer/modules/conversation';
import Dashboard from './app/pagecontainer/modules/dashboard';
import ChatHistory from './app/pagecontainer/modules/history';
import UsageAnalytics from './app/pagecontainer/modules/analytics/usageanalytics';
import ChatlogAnalytics from './app/pagecontainer/modules/analytics/chatloganalytics';
import SessionFlow from './app/pagecontainer/modules/analytics/sessionflow';

ReactGA.initialize("ga-0008-your-id");

function logPageView() {
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history} onChange={logPageView}>
                    <App>
                        <Switch>
                            <Route exact path={CONSTANTS.ROUTE_PATH.LOGIN} component={Login} />
                            <Redirect exact from={CONSTANTS.ROUTE_PATH.ANALYTICS} to={CONSTANTS.ROUTE_PATH.USAGE_ANALYTICS} />
                            <PageContainer>
                                <Switch>
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.DASHBOARD} component={Dashboard} />
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.CONVERSATION} component={Conversation} />
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.CHAT_HISTORY} component={ChatHistory} />
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.USAGE_ANALYTICS} component={UsageAnalytics} />
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.CHATLOG_ANALYTICS} component={ChatlogAnalytics} />
                                    <PrivateRoute exact path={CONSTANTS.ROUTE_PATH.SESSION_FLOW} component={SessionFlow} />
                                    <Route component={NotFound} />
                                </Switch>
                            </PageContainer>
                        </Switch>
                    </App>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
