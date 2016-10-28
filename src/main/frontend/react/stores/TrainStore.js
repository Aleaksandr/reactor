import Store from './Store';
import Dispatcher from '../dispatcher/Dispatcher';
import TrainConstants from '../constants/TrainConstants';

class TrainStore extends Store {
    constructor() {
        super();
    }
}

let trainStore = new TrainStore();

String.prototype.replaceAll = function(search, replace){
    return this.split(search).join(replace);
};

trainStore.dispatchToken = Dispatcher.register((action) => {
    switch(action.type) {
        case TrainConstants.UPDATE_TRAINS:
            fetch('/train/updateTrainsUFS', {
                method: 'POST',
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            }).then(result => {
                if (result.status === 'SUCCESS') {
                    action.targetElement.classList.remove('load');
                    action.targetElement.classList.add('success');
                } else {
                    throw new Error('FAILED');
                }
            }).catch(error => {
                action.targetElement.classList.remove('load');
                action.targetElement.classList.add('fail');
                console.log('Could not to load cities', error);
            });
            break;
        case TrainConstants.UPDATE_NEW_TRAINS:
            fetch('/train/updateUnknownTrains', {
                method: 'POST',
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            }).then(result => {
                if (result.status === 'SUCCESS') {
                    action.targetElement.classList.remove('load');
                    action.targetElement.classList.add('success');
                } else {
                    throw new Error('FAILED');
                }
            }).catch(error => {
                action.targetElement.classList.remove('load');
                action.targetElement.classList.add('fail');
                console.log('Could not to load cities', error);
            });
            break;
        case TrainConstants.SAVE_OR_UPDATE_TRAIN_STATION:
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if(JSON.parse(this.responseText).status == "SUCCESS"){
                        action.params.targetElement.classList.remove('load');
                        action.params.targetElement.classList.add('success');
                    } else {
                        action.params.targetElement.classList.remove('load');
                        action.params.targetElement.classList.add('fail');
                        console.log("NOT UPDATE");
                    }
                } else if(this.readyState == 4 && this.status != 200) {
                    action.params.targetElement.classList.remove('load');
                    action.params.targetElement.classList.add('fail');
                    console.log("FAIL");
                }
            };
            xhr.open('POST', '/train/saveOrUpdateTrainStation');
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.responseType = 'JSON';
            xhr.send(JSON.stringify(action.params.trainStation.getStation()).replaceAll('""', 'null'));
            break;
        case TrainConstants.GET_TRAIN_STATION_BY_ID:
            var searchParams = new URLSearchParams();
            searchParams.set("station_id", action.params.trainStation.state.station_id);
            fetch('/train/getTrainStationById', {
                method: 'POST',
                body: searchParams,
                credentials: 'include'
            }).then(response => {
                action.params.targetElement.classList.remove('load');
                if (response.ok) {
                    return response.text();
                } else {
                    console.log("not found Train Station");
                }
            }).then(result => {
                if(result) {
                    action.params.trainStation.updateState(JSON.parse(result.replaceAll('null', '""')));
                }
            }).catch(error => {
                console.log('Error load Train Station', error);
            });
            break;
        case TrainConstants.GET_TRAIN_STATION_BY_CODE:
            var sp = new URLSearchParams();
            sp.set("station_code", action.params.trainStation.state.station_code);
            fetch('/train/getTrainStationByCode', {
                method: 'POST',
                body: sp,
                credentials: 'include'
            }).then(response => {
                action.params.targetElement.classList.remove('load');
                if (response.ok) {
                    return response.text();
                } else {
                    console.log("not found Train Station");
                }
            }).then(result => {
                if(result) {
                    action.params.trainStation.updateState(JSON.parse(result.replaceAll('null', '""')));
                }
            }).catch(error => {
                console.log('Error load Train Station', error);
            });
            break;
        case TrainConstants.GET_TRAIN_STATIONS_TYPES:
            fetch('/train/getTrainStationTypes', {
                method: 'POST',
                credentials: 'include'
            }).then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.log("not found Train Station");
                }
            }).then(result => {
                if(result) {
                    action.params.trainStation.setState({ selectTypeValue : result.split(",") });
                }
            }).catch(error => {
                console.log('Error load Train Station', error);
            });
            break;
        case TrainConstants.GET_TRAIN_STATION_BY_NAME:
            var param = action.params.trainStation.state.name_ru_search;
            if(param && param.length > 2) {
                var sp_name = new URLSearchParams();
                sp_name.set("station_name", param);
                fetch('/train/getTrainStationByName', {
                    method: 'POST',
                    body: sp_name,
                    credentials: 'include'
                }).then(response => {
                    if (action.params.targetElement){
                        action.params.targetElement.classList.remove('load');
                    }
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.log("not found Train Station");
                    }
                }).then(result => {
                    if(result) {
                        action.params.trainStation.updateState(JSON.parse(result.replaceAll('null', '""')));
                    }
                }).catch(error => {
                    console.log('Error load Train Station', error);
                });
            }
            break;
    }
});

export default trainStore;