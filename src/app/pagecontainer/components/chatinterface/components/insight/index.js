import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Select, Button } from 'antd';
import CircleDown from 'react-icons/lib/fa/chevron-circle-down';

import './index.scss';

import ShowMessage from '../../../../../../components/showmessage';
import TextEditor from './components/texteditor';
import EntityEditor from './components/entityeditor';

const Option = Select.Option;

export default class Insight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intent_extended: false,
            selected_entity: null
        };
    }

    handleSelectedEntityRange = (range) => {
        const { active_popup_message } = this.props;

        if (range && range.startIndex && range.endIndex && range.endIndex >= range.startIndex) {
            const entity = active_popup_message.payload.text.substr(range.startIndex, range.endIndex - range.startIndex + 1);
            this.setState({
                selected_entity: {
                    ...this.state.selected_entity,
                    startIndex: range.startIndex,
                    endIndex: range.endIndex,
                    entity,
                }
            });
        }
    }

    createNewEntity = () => {
        this.props.addEntity(this.state.selected_entity);
        this.setState({
            intent_extended: true,
            selected_entity: null
        });
    };

    handleCancle = () => {
        const { closeModal } = this.props;
        closeModal();
    };

    handleSave = () => {
        const { active_popup_message, actions, closeModal } = this.props;
        const payload = {
            chatLogId: active_popup_message.chatLogId,
            text: active_popup_message.payload.text,
            NLPSnapshot: {...active_popup_message.NLPSnapshot }
        };
        actions.createUtterance(payload, closeModal);
    };

    render() {
        const { intent_extended, selected_entity } = this.state;
        const { nlp_details, active_popup_message, updateEntityType, deleteEntity } = this.props;

        if ((active_popup_message === null) || (nlp_details.intents && nlp_details.intents.length === 0)) {
            return (
                <ShowMessage message={active_popup_message === null ? "message object not selected" : "Intent list not found. please check internet connection and refresh the page again."} sad fade_item />
            );
        } else {
            return (
                <div className=" oriInsightContainer">
                    <div className="ori-lr-pad-40 ori-tb-pad-20">
                        <div className="ori-relative ori-pad-10">
                            <div className="ori-absolute ori-cursor-ptr ori-flex ori-pad-5 ori-border-light ori-border-radius-half alignInsightDownIcon" onClick={() => this.setState({ intent_extended: !intent_extended })}>
                                <CircleDown size={16} className={classNames("ori-font-light ori-transition-half", { "ori-rotate-180": intent_extended })} />
                            </div>
                            <Row >
                                <Col xs={24} sm={24} className="ori-pad-5" >
                                    <p className="ori-font-xs">INTENT</p>
                                    <Select showSearch className="ori-full-width ori-font-xs intentDropdown" size="small" defaultValue={active_popup_message.NLPSnapshot.intentSnapshot.intent} onChange={(intent_name) => this.props.updateMessageIntent(intent_name)} >
                                        {
                                            nlp_details.intents.map((intent) => {
                                                return (
                                                    <Option key={intent.id} value={intent.name}>{intent.name} </Option>
                                                );
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col xs={24} sm={24} className="ori-pad-5">
                                    <p className="ori-font-xs ">TEXT</p>
                                    <TextEditor message={active_popup_message} handleSelectedEntityRange={this.handleSelectedEntityRange} />
                                </Col>
                            </Row>
                        </div>
                        {
                            selected_entity && selected_entity.entity && selected_entity.entity.trim().length > 0 &&
                            <Button size="small" className="ori-animated ori-zoom-in ori-font-xs ori-lr-mrgn-15 ori-border-radius-1 ori-btn-fill-primary-light" onClick={this.createNewEntity}>{`add an entity for "${selected_entity.entity}"`}</Button>
                        }
                        {
                            intent_extended &&
                            <div className="ori-pad-10">
                                {
                                    active_popup_message.NLPSnapshot && active_popup_message.NLPSnapshot.entitySnapshot && active_popup_message.NLPSnapshot.entitySnapshot.length > 0 &&
                                    <Row className="ori-mobile-hidden ori-lr-pad-5">
                                        <Col xs={24} sm={8} className="ori-lr-pad-5">
                                            <p className="ori-font-xs ">TYPE</p>
                                        </Col>
                                        <Col xs={24} sm={16} className=" ori-lr-pad-5" >
                                            <p className="ori-font-xs ">ENTITY</p>
                                        </Col>
                                    </Row>
                                }
                                {
                                    active_popup_message.NLPSnapshot && active_popup_message.NLPSnapshot.entitySnapshot && active_popup_message.NLPSnapshot.entitySnapshot.length > 0 &&
                                    active_popup_message.NLPSnapshot.entitySnapshot.map((entity, index) => {
                                        return (
                                            <EntityEditor entities={nlp_details.entities} selected_entity={entity} key={index} index={index} updateEntityType={updateEntityType} deleteEntity={deleteEntity} />
                                        );
                                    })
                                }
                            </div>
                        }
                        
                    </div>
                    <div className="ori-pad-20 ori-flex-row ori-flex-jc">
                        <Button className="ori-r-mrgn-10 ori-border-radius-20" disabled={nlp_details.loaders.intents_updating} onClick={this.handleCancle}>Cancel</Button>
                        <Button type="primary" className="ori-border-radius-20" loading={nlp_details.loaders.intents_updating} onClick={this.handleSave}>Save</Button>
                    </div>
                </div>
            );
        }
    }
}

Insight.propTypes = {
    nlp_details: PropTypes.object,
    active_popup_message: PropTypes.object,
    closeModal: PropTypes.func,
    updateMessageIntent: PropTypes.func,
    addEntity: PropTypes.func,
    updateEntityType: PropTypes.func,
    deleteEntity: PropTypes.func,
    actions: PropTypes.object,
};