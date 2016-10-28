import React from 'react';
import ReactDOM from 'react-dom';
import TrainConstants from '../../constants/TrainConstants';
import TrainNavItemConstants from '../../constants/TrainNavItemConstants';
import NavBar from '../../components/nav/NavBar.jsx';
import NavItem from '../../components/nav/NavItem.jsx';
import TrainButtonBox from '../../components/trains/TrainButtonBox.jsx';
import TrainStationEditorBox from '../../components/trains/TrainStationEditorBox.jsx';

export default class TrainNavBarBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNavItem: ''
        };
    }

    handleNavSelect = (callback) => {
        this.setState({activeNavItem: callback.itemKey});
    };

    render() {

        var contentItem = '';
        var isActive = false;

        switch(this.state.activeNavItem) {

            case TrainNavItemConstants.TRAINS_BUTTON:
                contentItem = <TrainButtonBox />;
                break;
            case TrainNavItemConstants.TRAIN_STATION_EDITOR:
                contentItem = <TrainStationEditorBox />;
                break;
            default:
                contentItem = <TrainButtonBox />;
                isActive = true;
                break;
        }

        return (
            <div className="container_trains">
                <NavBar activeNavItem={this.state.activeNavItem} onSelect={this.handleNavSelect}>
                    <NavItem active = {isActive} navItemKey={TrainNavItemConstants.TRAINS_BUTTON} itemText={'Buttons'} />
                    <NavItem navItemKey={TrainNavItemConstants.TRAIN_STATION_EDITOR} itemText={'Train Station Editor'} />
                </NavBar>
                <div className="content_trains">
                    {contentItem}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <TrainNavBarBox />,
    document.getElementById('react-container')
);