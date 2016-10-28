import React from 'react';
import ReactDOM from 'react-dom';
import NavItemsConstants from './constants/NavItemsConstants';
import NavBar from './components/nav/NavBar.jsx';
import NavItem from './components/nav/NavItem.jsx';
import TrainNavBarBox from './components/trains/TrainNavBarBox.jsx';

import '../css/main.scss';

export default class Main extends React.Component {
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
        switch(this.state.activeNavItem) {
            case NavItemsConstants.CITIES:
                break;
            case NavItemsConstants.HOTELS:
                break;
            case NavItemsConstants.PARTNERS:
                break;
            case NavItemsConstants.CARS:
                break;
            case NavItemsConstants.TRAINS:
                contentItem = <TrainNavBarBox />;
                break;
        }

        return (
            <div className="container">
                <NavBar activeNavItem={this.state.activeNavItem} onSelect={this.handleNavSelect}>
                    <NavItem navItemKey={NavItemsConstants.CITIES} itemText={'Cities'} />
                    <NavItem navItemKey={NavItemsConstants.HOTELS} itemText={'Hotels'} />
                    <NavItem navItemKey={NavItemsConstants.POI} itemText={'POI'} />
                    <NavItem navItemKey={NavItemsConstants.AIRPORTS} itemText={'Airports'} />
                    <NavItem navItemKey={NavItemsConstants.AIRLINES} itemText={'Airlines'} />
                    <NavItem navItemKey={NavItemsConstants.STATISTICS} itemText={'Statistics'} />
                    <NavItem navItemKey={NavItemsConstants.MODERATOR_ACTIONS} itemText={'Moderator actions'} />
                    <NavItem navItemKey={NavItemsConstants.VISA} itemText={'Visa'} />
                    <NavItem navItemKey={NavItemsConstants.PARTNERS} itemText={'Partners'} />
                    <NavItem navItemKey={NavItemsConstants.CARS} itemText={'Cars'} />
                    <NavItem navItemKey={NavItemsConstants.TRAINS} itemText={'Trains'} />
                </NavBar>
                <div className="content">
                    {contentItem}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-container')
);