import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Input, TreeSelect } from 'antd';
import DeleteIcon from 'react-icons/lib/md/delete';

import './index.scss';

const TreeNode = TreeSelect.TreeNode;

export default class EntityEditor extends Component {
    render() {
        const { selected_entity, entities, index, updateEntityType, deleteEntity } = this.props;

        return (
            <div className="ori-relative ori-animated ori-fade-in oriEntityEditorContainer">
                <div className="ori-absolute ori-animated ori-zoom-in ori-cursor-ptr ori-flex ori-pad-5 alignInsightDeleteIcon" onClick={()=>{deleteEntity(index);}}>
                    <DeleteIcon size={20} className={classNames("ori-font-light ")} />
                </div>
                <Row className="ori-mobile-pad-5">
                    <Col xs={24} sm={8} className="ori-animated ori-zoom-in ori-lr-pad-5 ori-b-pad-5" >
                        <TreeSelect size="small" showSearch className="ori-full-width ori-font-xs entityTreeSelect" placeholder="please select entity" dropdownClassName="entityDropdown" dropdownStyle={{ maxHeight: '40vh', overflow: 'auto', minWidth: '200px' }} defaultValue={selected_entity.type} value={selected_entity.type} onChange={(type)=>{updateEntityType(type, index);}} >
                            {
                                entities && entities.length > 0 && 
                                entities.map((entity, index) => {
                                    return (
                                        <TreeNode key={index} title={entity.name} value={entity.name}>
                                            {
                                                entity.children && entity.children.length > 0 &&
                                                entity.children.map((entity_child, index) => {
                                                    return (
                                                        <TreeNode  title={entity_child.name} key={index} value={`${entity.name}::${entity_child.name}`}/>
                                                    );
                                                })
                                            }
                                        </TreeNode>
                                    );
                                })
                            }
                        </TreeSelect>
                    </Col>
                    <Col xs={24} sm={16} className="ori-animated ori-zoom-in ori-lr-pad-5 ori-b-pad-5">
                        <Input className="ori-full-width ori-font-xs ori-border-radius-1" size="small" value={selected_entity.entity} onChange={()=>{}}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

EntityEditor.propTypes = {
    entities: PropTypes.array.isRequired,
    selected_entity: PropTypes.object,
    deleteEntity: PropTypes.func,
    index: PropTypes.number
};