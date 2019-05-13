import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Input } from 'antd';

import './index.scss';

const { TextArea } = Input;

export default class TextEditor extends Component {

    componentDidMount() {
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection.anchorNode && selection.anchorNode === this.selectionAnchorNode) {
                const selected_range = {
                    startIndex: this.inputNode.selectionStart,
                    endIndex: this.inputNode.selectionEnd - 1,
                }
                this.props.handleSelectedEntityRange(selected_range);
            }
        }, false);
    }

    renderHighLightEntity = (entity, text, key) => {
        const start = text.substr(0, entity.startIndex);
        const value = text.substr(entity.startIndex, entity.endIndex - entity.startIndex + 1);
        const end = text.substr(entity.endIndex + 1);

        return(
            <div key={key} className="ori-absolute ori-font-xs textContainer overlapOnInput">
                <span>{start}</span>
                <span className={`default-entity ori-mt-opacity-low entity-${key}`}>{value}</span>
                <span>{end}</span>
            </div>
        );
    }

    render() {
        const { message } = this.props;

        return (
            <div className="ori-relative ori-full-width oriTextEditorContainer" ref={(node) => { this.selectionAnchorNode = node; }}>
                <TextArea className="ori-full-width ori-font-xs ori-border-radius-1  textContainer textContent" autosize={{ minRows: 1 }} ref={node => this.inputNode = node && findDOMNode(node)} value={message.payload.text} />
                {
                    message.NLPSnapshot && message.NLPSnapshot.entitySnapshot && message.NLPSnapshot.entitySnapshot.length > 0 && 
                    message.NLPSnapshot.entitySnapshot.map((entity, index)=>{
                        return this.renderHighLightEntity(entity,message.payload.text, index)
                    })
                }
            </div>
        );
    }
}

TextEditor.propTypes = {
    message: PropTypes.object.isRequired,
    handleSelectedEntityRange: PropTypes.func,
};
