import React from 'react';
import ReactDOM from 'react-dom';
import CityActionCreator from './actions/CityActionCreator.js';
import SimpleMap from './components/google/SimpleMap.jsx';
import Select from 'react-select';
import '../css/cities.scss';


export default class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_ru_search: '',
            center: {lat: 53.949696, lng: 27.682574}
        };
    }

    getNames = (input) => {
        if (!input || input.length < 2) {
            return Promise.resolve({ options: [] });
        }
        return fetch('/cities/getCityByNamesRu?q='+input, {
            method: 'POST',
            credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("not found Train Station");
                }
            }).then(result => {
                return { options: result.items };

            }).catch(error => {
                console.log('Error load Names Station', error);
            });
    };

    onChange = (value) => {
        this.setState({
            name_ru_search: value ? value.name : ''
        });
    };

    getStationByNameOnClose = (e) => {
        var timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() =>{
            CityActionCreator.getCityByNameRu(this);
        }, 500);

    };

    handleMapClick = ({x, y, lat, lng, event}) => {
        this.setState({
            center: {lat: lat, lng: lng}
        });
    };

    render() {

        const AsyncComponent = Select.Async;
        return (
            <div className="container">
                <div className="google-map">
                    <map>
                        <SimpleMap
                            onClick={this.handleMapClick}
                            center = {this.state.center} />
                    </map>
                </div>
                <div className="input-box">
                    <label> Input name:
                        <div className="input_text_auto">
                            <AsyncComponent multi={false}
                                            value={this.state.name_ru_search}
                                            onChange={this.onChange}
                                            onClose={this.getStationByNameOnClose}
                                            valueKey="name" labelKey="name"
                                            loadOptions={this.getNames}
                                            backspaceRemoves={true}
                            />
                        </div>
                    </label>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Cities />,
    document.getElementById('react-container')
);