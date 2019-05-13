import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { LIVE_CARD_TYPE } from '../../../../data/config/constants';
import { icons } from '../../../../data/assets/assetsurl';

import SpinnerLoader from '../../../../components/spinnerloader';

const { Group, User, Desktop, Android, Star, Table, Message, Repeat } = icons;

class ChartStatusCard extends Component {
    render() {
        const { card_data, loading } = this.props;

        return (
            <div className="ori-relative ori-animated ori-zoom-in ori-full-width ori-bg-white ori-pad-15 ori-border-radius-4 ori-box-shadow-light">
                {
                    loading &&
                    <div className="ori-absolute ori-align-full">
                        <SpinnerLoader primary_overlay />
                    </div>
                }
                <div className="ori-absolute ori-flex">
                    {
                        card_data.type === LIVE_CARD_TYPE.TOTAL &&
                        <Group size={16} className="ori-font-light" />
                    }
                    {
                        (card_data.type === LIVE_CARD_TYPE.SESSION_TIME_PER_USER ) &&
                        <User size={16} className="ori-font-light" />
                    }
                    {
                        card_data.type === LIVE_CARD_TYPE.SESSIONS_PER_USER &&
                        <Repeat size={16} className="ori-font-light" />
                    }
                    {
                        (card_data.type === LIVE_CARD_TYPE.WEBSITE || card_data.type === LIVE_CARD_TYPE.DAU) &&
                        <Desktop size={16} className="ori-font-light" />
                    }
                    {
                        card_data.type === LIVE_CARD_TYPE.ANDROID &&
                        <Android size={16} className="ori-font-light" />
                    }
                    {
                        card_data.type === LIVE_CARD_TYPE.AVG_FEEDBACK &&
                        <Star size={16} className="ori-font-light" />
                    }
                    {
                        card_data.type === LIVE_CARD_TYPE.SESSIONS &&
                        <Table size={16} className="ori-font-light" />
                    }
                    {
                        card_data.type === LIVE_CARD_TYPE.MESSAGES_PER_USER &&
                        <Message size={16} className="ori-font-light" />
                    }
                </div>
                <div className="ori-pad-15">
                    <h1 className="ori-text-center ori-b-mrgn-5">{card_data.count}</h1>
                    <p className="ori-text-center ori-font-xs ori-capitalize-first">{card_data.text}</p>
                </div>
            </div>
        );
    }
}

ChartStatusCard.propTypes = {
    card_data: PropTypes.object,
    loading: PropTypes.bool
};

ChartStatusCard.defaultProps = {
    loading: false
};

export default ChartStatusCard;
