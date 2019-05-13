import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Collapse, Button, Checkbox, InputNumber } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { FILTER_TYPE } from '../../../../data/config/constants';

import './index.scss';

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;

export default class Filters extends Component {
    render() {
        let { filters, selected_filters, handleFilterUpdate, handleClearFilter, handleApplyFilter, screen_height, filter_container_height } = this.props;
        const button_container_height = 65;
        const total_offset_height = 60 + filter_container_height + 55 * filters.length + button_container_height;

        return (
            <div className="oriFiltersContainer">
                <Collapse bordered={false} accordion>
                    {
                        filters.map((filter) => {
                            if (filter.type === FILTER_TYPE.INPUT_NUMBER) {
                                return (
                                    <Panel header={<span className="ori-capitalize">{filter.name}</span>} key={filter.name} className="filterPanel">
                                        <div className="ori-lr-pad-15 ori-b-pad-15 ori-flex-row inputNumberContainer">
                                            <div className="ori-r-mrgn-10 ori-font-xs ori-font-light title ">Enter {filter.name} </div>
                                            <InputNumber min={0} size="small" className="inputBox" value={!isEmpty(selected_filters) && selected_filters[filter.filterKey] && selected_filters[filter.filterKey] !== undefined && selected_filters[filter.filterKey].length > 0 ? selected_filters[filter.filterKey][0].value : ""} onChange={(value) => {
                                                let input_data = [{
                                                    id: `#${filter.type}${name}`,
                                                    filterKey: filter.filterKey,
                                                    value: value,
                                                    label: value,
                                                }];
                                                handleFilterUpdate(filter.filterKey, input_data);
                                            }} />
                                        </div>
                                    </Panel>
                                );
                            } else if (filter.type === FILTER_TYPE.CHECKBOX) {
                                return (
                                    <Panel header={<span className="ori-capitalize">{filter.name}</span>} key={filter.name} className="filterPanel">
                                        <div className="ori-lr-pad-15 ori-b-pad-15 ori-overflow-auto" style={{ maxHeight: screen_height - total_offset_height }}>
                                            <CheckboxGroup className="ori-flex-row ori-flex-wrap ori-flex-jsb" value={selected_filters[filter.filterKey]} onChange={(checkedValue) => { handleFilterUpdate(filter.filterKey, checkedValue); }}>
                                                {
                                                    filter.representation.map((option, index) => {
                                                        return (
                                                            <Checkbox key={index} className="ori-display-block ori-font-xs ori-font-light ori-no-l-mrgn" value={option}  >{option.label}</Checkbox>
                                                        );
                                                    })
                                                }
                                            </CheckboxGroup>
                                        </div>
                                    </Panel>
                                );
                            }
                        })
                    }
                </Collapse>
                <div className="ori-pad-15 ori-flex-row ori-flex-jc ">
                    <Button className="ori-r-mrgn-10 ori-font-xs ori-border-radius-20 ori-btn-ghost-primary" onClick={() => handleClearFilter()}>Clear</Button>
                    <Button className={classNames("ori-font-xs ori-border-radius-20 ori-btn-fill-primary")} onClick={() => handleApplyFilter()}>Apply</Button>
                </div>
            </div>
        );
    }
}

Filters.propTypes = {
    selected_filters: PropTypes.object,
    filters: PropTypes.array.isRequired,
    handleFilterUpdate: PropTypes.func,
    handleClearFilter: PropTypes.func,
    handleApplyFilter: PropTypes.func,
    filter_container_height: PropTypes.number,
    screen_height: PropTypes.number,
};
