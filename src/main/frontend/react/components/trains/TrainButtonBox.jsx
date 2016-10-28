import React from 'react';
import TrainActionCreator from '../../actions/TrainActionCreator';

export default class TrainButtonBox extends React.Component {
    constructor(props) {
        super(props);
    }

    makeTest = (type, event) => {
        let targetElement = event.currentTarget;
        if (!targetElement.classList.contains('load')) {
            targetElement.classList.add('load');
            switch(type) {
                case 'trains_update':
                    TrainActionCreator.updateTrains(targetElement);
                    break;
                case 'trains_new_update':
                    TrainActionCreator.updateNewTrains(targetElement);
                    break;
            }
        }
    };

    mouseOverHandler= (event) => {
        if (event.currentTarget.classList.contains('fail') || event.currentTarget.classList.contains('success')) {
            event.currentTarget.classList.remove('fail', 'success');
        }
    };

    render() {
        return (
            <div className="content-box">
                <div className="content-box__title">
                    <div className="content-box__title_text">
                        Train's moderator buttons
                    </div>
                    <hr/>
                </div>
                <div className="content-box__controls">
                    <div className="button" onClick={event => this.makeTest('trains_update', event)} onMouseOver={this.mouseOverHandler}>
                        <div className="text">Update trains from UFS</div>
                        <div className="loading"></div>
                        <div className="result"></div>
                    </div>

                </div>
                <div className="content-box__controls">
                    <div className="button" onClick={event => this.makeTest('trains_new_update', event)} onMouseOver={this.mouseOverHandler}>
                        <div className="text">Update new trains</div>
                        <div className="loading"></div>
                        <div className="result"></div>
                    </div>

                </div>
            </div>
        )
    }
}