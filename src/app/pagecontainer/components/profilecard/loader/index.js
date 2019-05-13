import React, { Component } from 'react';

import './index.scss';

export default class ProfileCardLoader extends Component {
    render() {
        return (
            <div className="ori-full-width ori-pad-10 ori-loader-line-height ori-flex-column oriProfileCardLoaderContainer">
                <div className="ori-b-pad-15">
                    <div className="ori-flex-row ori-flex-jc ori-b-pad-15">
                        <div className="ori-card-loading avatarLoader">&nbsp;</div>
                    </div>
                    <div className="ori-flex-row ori-flex-jc ori-b-mrgn-10">
                        <p className="ori-height-xs ori-width-70 ori-card-loading ">&nbsp;</p>
                    </div>
                    {
                        [1, 2].map(i => {
                            return (
                                <div key={i} className="ori-flex-row ori-flex-jc ori-b-mrgn-10">
                                    <p className="ori-height-xxs width-100 ori-card-loading ">&nbsp;</p>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    [1, 2, 3].map(i => {
                        return (
                            <div key={i} className="ori-pad-8 ori-border-radius-4 ori-bg-default ori-tb-mrgn-5">
                                <p className="ori-b-mrgn-5 width-100 ori-height-sm ori-card-loading">&nbsp;</p>
                                <div className="ori-pad-5 ori-border-radius-4 ori-bg-white">
                                    {
                                        [1, 2, 3,4].map(i => {
                                            return (
                                                <div key={i} className="ori-flex-row ori-flex-jsb ori-b-mrgn-5">
                                                    <p className="ori-height-xxs ori-quarter-width ori-card-loading">&nbsp;</p>
                                                    <p className="ori-height-xxs ori-quarter-width ori-card-loading">&nbsp;</p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        );
    }
}

