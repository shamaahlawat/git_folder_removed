import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DatePicker, Radio, Select } from 'antd';

import './index.scss';

import { icons } from '../../data/assets/assetsurl';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { LineChart, PieChart, PaperPlane, Group, Repeat } = icons;

class PageHeader extends Component {

    render() {
        const { screen_width, title, title_only, show_date_range, date_range, handleDateRangeChange, show_platform, platform, handlePlatformChange, show_granularity, granularity_hour_hidden, granularity, handleGranularityChange, show_past_hours, handlePastHours, line_chart, pie_chart, paper_plane, group, repeat } = this.props;
        const mobile = screen_width < 768
        return (
            <div className={classNames("ori-full-width ori-t-pad-15 ori-b-pad-10 ori-b-border-light oriPageHeaderContainer", { "ori-flex-row": !mobile })}>
                <div className="ori-flex-row ori-flex-jsb ori-flex-wrap ori-full-flex ">
                    <div className="ori-lr-pad-10 ori-b-mrgn-5">
                        {
                            line_chart &&
                            <LineChart size={14} className="ori-font-light ori-r-mrgn-5" />
                        }
                        {
                            pie_chart &&
                            <PieChart size={14} className="ori-font-light ori-r-mrgn-5" />
                        }
                        {
                            paper_plane &&
                            <PaperPlane size={18} className="ori-font-light ori-r-mrgn-5" />
                        }
                        {
                            group &&
                            <Group size={14} className="ori-font-light ori-r-mrgn-5" />
                        }
                        {
                            repeat &&
                            <Repeat size={14} className="ori-font-light ori-r-mrgn-5" />
                        }
                        <span className="ori-capitalize">{title}</span>
                    </div>
                    {
                        !title_only && show_date_range &&
                        <div className="ori-r-pad-10 ori-b-mrgn-5">
                            <RangePicker size="small" className="rangePickerContainer" format="DD-MM-YYYY" value={date_range} placeholder={['Start date', 'End date']} onChange={handleDateRangeChange} />
                        </div>
                    }
                    
                </div>
                {
                    !title_only &&
                    <div className="ori-flex-row ori-flex-jsb ori-flex-wrap  ori-r-pad-5">
                        {
                            show_granularity &&
                            <div className="ori-lr-pad-5 ori-b-mrgn-5">
                                <RadioGroup size="small" className="radioButtonSwitch" value={ granularity } onChange={handleGranularityChange} >
                                    {
                                        !granularity_hour_hidden &&
                                        <RadioButton value="hour">Hour</RadioButton>
                                    }
                                    <RadioButton value="day">Day</RadioButton>
                                    <RadioButton value="week">Week</RadioButton>
                                    <RadioButton value="month">Month</RadioButton>
                                </RadioGroup>
                            </div>
                        }
                        {
                            show_past_hours &&
                            <div className="ori-lr-pad-5 ori-b-mrgn-5">
                                <RadioGroup size="small" className="radioButtonSwitch" defaultValue={1} onChange={handlePastHours}>
                                    <RadioButton value={1}>last 1 hr</RadioButton>
                                    <RadioButton value={2}>last 2 hrs</RadioButton>
                                    <RadioButton value={4}>last 4 hrs</RadioButton>
                                    <RadioButton value={6}>last 6 hrs</RadioButton>
                                </RadioGroup>
                            </div>
                        }
                        {
                            show_platform &&
                            <div className="ori-lr-pad-5 ori-b-mrgn-5">
                                <Select size="small" className="selectPlatform" value={platform} onChange={handlePlatformChange}>
                                    <Option className="ori-font-xs" value="all">All</Option>
                                    <Option className="ori-font-xs" value="android">Android</Option>
                                    <Option className="ori-font-xs" value="website" >Website</Option>
                                </Select>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

PageHeader.propTypes = {
    screen_width: PropTypes.number.isRequired,
    title: PropTypes.string,
    show_date_range: PropTypes.bool,
    date_range: PropTypes.array,
    handleDateRangeChange: PropTypes.func,
    show_platform: PropTypes.bool,
    platform: PropTypes.string,
    handlePlatformChange: PropTypes.func,
    show_granularity: PropTypes.bool,
    granularity: PropTypes.string,
    handleGranularityChange: PropTypes.func,
    show_past_hours: PropTypes.bool,
    handlePastHours: PropTypes.func,
    title_only: PropTypes.bool,
    line_chart: PropTypes.bool,
    pie_chart: PropTypes.bool,
    group: PropTypes.bool,
    paper_plane: PropTypes.bool,
    repeat: PropTypes.bool,
};

PageHeader.defaultProps = {
    title: "",
    line_chart: false,
    pie_chart: false,
    group: false,
    paper_plane: false,
    title_only: false,
    show_date_range: false,
    show_platform: false,
    show_past_hours: false,
    show_granularity: false,
    granularity_hour_hidden: false,
};

export default PageHeader;