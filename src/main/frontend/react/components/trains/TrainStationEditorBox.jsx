import React from 'react';
import TrainActionCreator from '../../actions/TrainActionCreator.js';
import Search from 'react-icons/lib/fa/search'
import Download from 'react-icons/lib/fa/download'
import SimpleMap from '../../components/google/SimpleMap.jsx';
import Select from 'react-select';

export default class TrainStationEditorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            station_id: '',
            station_code: '',
            esr_code: '',
            name_ru: '',
            name_en: '',
            name_esr: '',
            name_ru_short: '',
            name_ru_reserve: '',
            latitude: '',
            longitude: '',
            group_station_id: '',
            city_id: '',
            station_type: '',
            road_code: '',
            road_name: '',
            road_name_short: '',
            address: '',
            train_country_code: '',
            country_code: '',
            center: {lat: 53.949696, lng: 27.682574},
            selectTypeValue: [''],
            name_ru_search: ''
        };
    }

    componentWillMount() {
        TrainActionCreator.getTrainStationTypes(this);
    }

    updateState(gson) {
        this.setState(gson);
        this.setcoords();
    }

    getStation() {
        return  {
            station_id: this.state.station_id,
            station_code: this.state.station_code,
            esr_code: this.state.esr_code,
            name_ru: this.state.name_ru,
            name_en: this.state.name_en,
            name_esr: this.state.name_esr,
            name_ru_short: this.state.name_ru_short,
            name_ru_reserve: this.state.name_ru_reserve,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            group_station_id: this.state.group_station_id,
            city_id: this.state.city_id,
            station_type: this.state.station_type,
            road_code: this.state.road_code,
            road_name: this.state.road_name,
            road_name_short: this.state.road_name_short,
            address: this.state.address,
            train_country_code: this.state.train_country_code,
            country_code: this.state.country_code
        };
    }

    makeTest = (type, event) => {

        let targetElement = event.currentTarget;
        if (!targetElement.classList.contains('load')) {
            targetElement.classList.add('load');
            switch(type) {
                case 'train_station_id':
                    var timeoutId;
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() =>{TrainActionCreator.getTrainStationById(this, targetElement)}, 1000);
                    break;
                case 'train_station_code':
                    TrainActionCreator.getTrainStationByCode(this, targetElement);
                    break;
                case 'train_station_name':
                    TrainActionCreator.getTrainStationByName(this, targetElement);
                    break;
                case 'train_station_save':
                    TrainActionCreator.saveOrUpdateTrainStation(this, targetElement);
                    break;
            }
        }
    };

    setcoords = () => {
        this.setState({center: {
            lat: this.state.latitude ? this.state.latitude : null,
            lng: this.state.longitude ? this.state.longitude : null
        }});
    };

    mouseOverHandler = (event) => {
        if (event.currentTarget.classList.contains('fail') || event.currentTarget.classList.contains('success')) {
            event.currentTarget.classList.remove('fail', 'success');
        }
    };

    handleMapClick = ({x, y, lat, lng, event}) => {
        this.setState({ latitude : lat,
            longitude : lng,
            center: {lat: lat, lng: lng}
        });
    };

    onChange = (value) => {
        this.setState({
            name_ru_search: value ? value.name : ''
        });
    };

    getStationByCodeEnterKey = (e) => {
        if (e.key === 'Enter') {
            this.makeTest('train_station_code', e)
        }
    };

    getStationByNameOnClose = (e) => {
        var timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() =>{
            TrainActionCreator.getTrainStationByName(this, null);
            this.skipAutocomplValue();
        }, 500);

    };

    skipAutocomplValue = () => {
        this.setState({
            name_ru_search: ''
        });
    };

    getNames = (input) => {
        if (!input || input.length < 2) {
            return Promise.resolve({ options: [] });
        }
        return fetch('/train/getTrainStationNames?q='+input, {
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

    render() {
        const AsyncComponent = Select.Async;
        return (
            <div className="content-box">
                <div className="content-box__title">
                    <div className="content-box__title_text">
                        Train Station Editor
                    </div>
                    <hr/>
                </div>
                <div className="content-box__controls">

                    <div id = "train_station" className = "content-box__controls__train_station_data">
                        <label>
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
                            <div className="get_train_station_by_name_icon">
                                <Download
                                    onClick = {e => {this.makeTest('train_station_name', e); this.skipAutocomplValue()}}
                                    size={19}/>
                            </div>
                        </label>
                        <label>ID:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ station_id : e.target.value })}
                                   onKeyUp = {e => this.makeTest('train_station_id', e)}
                                   value={this.state.station_id} >
                            </input>
                        </label>
                        <label>STATION_CODE:
                            <input type="text"
                                   className="input_text"
                                   onKeyPress={this.getStationByCodeEnterKey}
                                   onChange = {e => this.setState({ station_code : e.target.value })}
                                   value={this.state.station_code} >
                            </input>
                            <Search
                                className='search_train_station_icon'
                                onClick = {e => this.makeTest('train_station_code', e)}
                                size={19}/>
                        </label>
                        <label>ESR_CODE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ esr_code : e.target.value })}
                                   value={this.state.esr_code} >
                            </input>
                        </label>
                        <label>NAME_RU:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ name_ru : e.target.value })}
                                   value={this.state.name_ru} >
                            </input>
                        </label>
                        <label>NAME_EN:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ name_en : e.target.value })}
                                   value={this.state.name_en} >
                            </input>
                        </label>
                        <label>NAME_RU_SHORT:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ name_ru_short : e.target.value })}
                                   value={this.state.name_ru_short} >
                            </input>
                        </label>
                        <label>NAME_ESR:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ name_esr : e.target.value })}
                                   value={this.state.name_esr} >
                            </input>
                        </label>
                        <label>NAME_RU_RESERVE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ name_ru_reserve : e.target.value })}
                                   value={this.state.name_ru_reserve} >
                            </input>
                        </label>
                        <label>LATITUDE:
                            <input type="text"
                                   className="input_text"
                                   onChange ={(e) => {
                                   this.setState({ latitude : e.target.value == '' ? 0 : parseFloat(e.target.value) });
                                   this.setcoords();
                                   }}
                                   value={this.state.latitude} >
                            </input>
                        </label>
                        <label>LONGITUDE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {(e) => {
                                   this.setState({ longitude : e.target.value == '' ? 0 : parseFloat(e.target.value) });
                                   this.setcoords();
                                   }}
                                   value={this.state.longitude} >
                            </input>
                        </label>
                        <label>GROUP_STATION_ID:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ group_station_id : e.target.value })}
                                   value={this.state.group_station_id} >
                            </input>
                        </label>
                        <label>CITY_ID:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ city_id : e.target.value })}
                                   value={this.state.city_id} >
                            </input>
                        </label>
                        <label>TYPE:
                            <select className="select_type"
                                   onChange = {e => this.setState({ station_type : e.target.value })}
                                   value={this.state.station_type} >
                                    <option value="UNKNOWN_STATION"></option>
                                    {this.state.selectTypeValue.map((child) => {
                                        return (
                                            <option key={child} value={child}>{child}</option>
                                        );
                                    })}
                            </select>
                        </label>
                        <label>ROAD_CODE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ road_code : e.target.value })}
                                   value={this.state.road_code} >
                            </input>
                        </label>
                        <label>ROAD_NAME:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ road_name : e.target.value })}
                                   value={this.state.road_name} >
                            </input>
                        </label>
                        <label>ROAD_NAME_SHORT:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ road_name_short : e.target.value })}
                                   value={this.state.road_name_short} >
                            </input>
                        </label>
                        <label>ADDRESS:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ address : e.target.value })}
                                   value={this.state.address} >
                            </input>
                        </label>
                        <label>TRAIN_COUNTRY_CODE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ train_country_code : e.target.value })}
                                   value={this.state.train_country_code} >
                            </input>
                        </label>
                        <label>COUNTRY_CODE:
                            <input type="text"
                                   className="input_text"
                                   onChange = {e => this.setState({ country_code : e.target.value })}
                                   value={this.state.country_code} >
                            </input>
                        </label>

                        <div className="button" onClick={event => this.makeTest('train_station_save', event)} onMouseOver={this.mouseOverHandler}>
                            <div className="text">SAVE</div>
                            <div className="loading"></div>
                            <div className="result"></div>
                        </div>
                    </div>

                    <map>
                        <SimpleMap
                            onClick={this.handleMapClick}
                            center = {this.state.center} />
                    </map>

                </div>
            </div>
        )
    }
}