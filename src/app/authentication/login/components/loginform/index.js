import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Input, Button, Icon } from 'antd';


import './index.scss';

import { ROUTE_PATH } from '../../../../../data/config/constants';
import { showMessage } from '../../../../../data/config/utils';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserLoginForm extends Component {
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleInputChange = (event) => {
        this.props.form.setFieldsValue({
            [event.target.name]: event.target.value
        });
        this.props.form.validateFields();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, actions, history } = this.props;
        form.validateFields((err) => {
            if (!err) {
                let payload = form.getFieldsValue(['email', 'password']);
                actions.loginUser(payload, () => {
                    if (history.location.state && history.location.state.from && history.location.state.from.pathname && history.location.state.from.pathname !== null && history.location.state.from.pathname.trim().length > 0) {
                        history.push(history.location.state.from.pathname);
                    } else {
                        history.push(ROUTE_PATH.DASHBOARD);
                    }
                });
            } else {
                showMessage('error', 'Please enter/validate username and password!');
            }
        });
    };

    render() {
        const { form, admin_details } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
            <div className="oriLoginFormContainer">
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem validateStatus={emailError ? "warning" : ""} help={emailError || ''}>
                        {
                            getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your emailid' }, { type: 'email', message: "please enter a valid email id" }],
                            })(
                                <Input placeholder="Email" className="ori-font-xs ori-height-40 ori-lr-pad-20 ori-border-radius-20" name="email" disabled={admin_details.loaders.logging} onChange={this.handleInputChange} />
                            )
                        }
                    </FormItem>
                    <FormItem validateStatus={passwordError ? "warning" : ""} help={passwordError || ''}>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please enter your password!' }]
                            })(
                                <Input placeholder="Password" className="ori-font-12 ori-height-40 ori-lr-pad-20 ori-border-radius-20" type="password" name="password" disabled={admin_details.loaders.logging} onChange={this.handleInputChange} />
                            )
                        }
                    </FormItem>
                    <div className="ori-full-width ori-text-center ori-b-pad-10">
                        <p className="ori-font-xs">By continuing on Ori Chatbot, you agree to our <span className="ori-font-primary ori-cursor-ptr link">Terms & Conditions</span>  and <span className="ori-font-primary ori-cursor-ptr link">Privacy Policy</span>.</p>
                    </div>
                    <FormItem>
                        <Button className={classNames("ori-height-40 ori-font-xs ori-full-width ori-border-radius-20 ori-font-medium", { "ori-btn-fill-primary": !(hasErrors(getFieldsError())|| admin_details.loaders.logging) })} htmlType="submit" disabled={hasErrors(getFieldsError()) || admin_details.loaders.logging} >
                            {
                                admin_details.loaders.logging ? <span><Icon type="loading" className="ori-r-mrgn-5" /> LOGGING</span>: <span>LOGIN</span>
                            }
                        </Button>
                    </FormItem>
                    <div className="ori-full-width ori-text-center">
                        <p className="ori-font-xs ori-font-primary ori-cursor-ptr link">Forgot password ?</p>
                        <p className="ori-font-xs">Dont have a account? <span className="ori-font-primary ori-cursor-ptr link"> Signup Now</span>.</p>
                    </div>
                </Form>
            </div>
        );
    }
}

UserLoginForm.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    admin_details: PropTypes.object,
    history: PropTypes.object,
};

const LoginForm = Form.create()(UserLoginForm);

export default LoginForm;
