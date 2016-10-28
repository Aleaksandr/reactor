import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from '../../../../../../node_modules/react-pure-render/function';

import GoogleMap from 'google-map-react';
import PlacePoint from '../../components/google/PlacePoint.jsx';

export default class SimpleMap extends Component {

    static defaultProps = {
        center: {lat: 53.949696, lng: 27.682574},
        zoom: 15,
        bootstrapURLKeys: {key: "AIzaSyBDeowdG3FwZ78rsT6niTkdr0uz1ah_E1Q"}
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GoogleMap
                onClick={this.props.onClick}
                center={this.props.center}
                bootstrapURLKeys={this.props.bootstrapURLKeys}
                zoom={this.props.zoom}>
                <PlacePoint lat = {this.props.center.lat}
                            lng = {this.props.center.lng} />
            </GoogleMap>
        );
    }
}