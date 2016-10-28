import React, { cloneElement } from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        activeNavItem: React.PropTypes.any.isRequired,
        onSelect: React.PropTypes.func.isRequired
    };

    getChildActiveProp = (child) => {
        if (child.props.active) {
            return true;
        }
        if (child.props.navItemKey === this.props.activeNavItem) {
            return true;
        }
        return child.props.active;
    };

    render() {
        return (
            <nav>
                <ul>
                    {
                        this.props.children.map((child) => {
                            return cloneElement(
                                child,
                                {
                                    active: this.getChildActiveProp(child),
                                    onItemClick: this.props.onSelect,
                                    key: child.props.navItemKey
                                }
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }
};