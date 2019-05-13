import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Icon } from 'antd';
import classNames from 'classnames';

import './index.scss';

import { assets } from '../../../../data/assets/assetsurl';
import { formatPrice, formatDate, formatDateTime, formatMonthTime } from '../../../../data/config/utils';
import { PROFILE_ITEM_TYPE, CURRENCY } from '../../../../data/config/constants';

import InlineItem from '../../../../components/inlineitem';

export default class ProfileCard extends Component {
    render() {
        let { profile_details } = this.props;

        return (
            <div className="ori-flex-column ori-full-width ori-pad-10 oriProfileCardContainer">
                <div className="ori-text-center ori-tb-pad-10">
                    <div className="ori-flex-row ori-flex-jc ori-b-pad-15">
                        <div className="ori-animated ori-zoom-in ori-relative">
                            <Avatar icon="user" src={profile_details.imageUrl && profile_details.imageUrl.trim().length > 0 ?profile_details.imageUrl: assets.user } shape="square" className="ori-font-xl ori-bg-white ori-font-primary profileAvatar" />
                            <div className="ori-absolute avatarBadge">
                                {/* <img src={assets.messenger} alt="" className="iconBadge" /> */}
                            </div>
                        </div>
                    </div>
                    <p className="ori-font-bold ori-capitalize">{profile_details.name ? profile_details.name : "UNKNOWN"}</p>
                    <p className="ori-font-xs ori-font-light"><Icon type="phone" className="ori-font-xxs ori-r-mrgn-3 rotateIcon" /> <span>{profile_details.rmn ? profile_details.rmn : "xxxxxxxxxx"}</span>
                    </p>
                    <p className="ori-font-xs ori-font-light"><Icon type="mail" className="ori-font-xxs ori-r-mrgn-3" /><span>{profile_details.email ? profile_details.email : "xxxxxxxx@xyz.com"}</span></p>
                </div>
                {
                    profile_details.sections && profile_details.sections.length > 0 &&
                    profile_details.sections.map((section, index) => {
                        return (
                            <div key={index} className="ori-animated ori-zoom-in ori-pad-8 ori-border-radius-4 ori-bg-default ori-tb-mrgn-5">
                                {
                                    section.sectionTitle &&
                                    <p className="ori-font-bold ori-uppercase ori-b-mrgn-5">{section.sectionTitle}</p>
                                }
                                {
                                    section.data && section.data.length > 0 &&
                                    <div className="ori-pad-5 ori-font-light ori-border-radius-4 ori-bg-white">
                                        {
                                            section.data.map((item, index) => {
                                                if (item.type === PROFILE_ITEM_TYPE.CURRENCY) {
                                                    item = { ...item, value: formatPrice(item.value, CURRENCY.RUPEES) };
                                                } else if (item.type === PROFILE_ITEM_TYPE.DATE) {
                                                    item = { ...item, value: formatDate(item.value) };
                                                } else if (item.type === PROFILE_ITEM_TYPE.DATE_TIME) {
                                                    item = { ...item, value: formatDateTime(item.value) };
                                                }
                                                return (
                                                    <InlineItem key={index} title={item.subTitle} info={item.value} size="small" url={item.type && item.type === PROFILE_ITEM_TYPE.URL} />
                                                );
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        );
                    })
                }
                {
                    profile_details.botEvents && profile_details.botEvents.length > 0 &&
                    <div className="ori-animated ori-zoom-in ori-pad-8 ori-border-radius-4 ori-bg-default ori-tb-mrgn-5">
                        <p className="ori-font-bold ori-uppercase ori-b-mrgn-5">Bot Events</p>
                        <div className="ori-pad-5 ori-bg-white">
                            {
                                profile_details.botEvents.map((bot_event, index) => {
                                    return (
                                        <div key={index} className="ori-border-radius-4 ori-font-light ori-flex-row  ori-font-xs botEventItem">
                                            <div className="ori-full-flex ori-capitalize">{bot_event.tag}</div>
                                            <div className="ori-l-pad-5 ori-r-pad-10">{formatMonthTime(bot_event.createdAt)}</div>
                                            <div className={classNames("ori-lr-pad-5  ori-border-radius-4 ori-uppercase ori-font-xxs ori-flex-column ori-flex-jc", { "ori-font-green ori-bg-green-light": bot_event.tagType.toLowerCase() === "success", "ori-font-primary ori-bg-primary-light": bot_event.tagType.toLowerCase() !== "success", })}>{bot_event.tagType}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

ProfileCard.propTypes = {
    profile_details: PropTypes.object,
};

