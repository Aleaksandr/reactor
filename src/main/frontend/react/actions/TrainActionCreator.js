import Dispatcher from '../dispatcher/Dispatcher';
import TrainConstants from '../constants/TrainConstants';

export default {

    updateTrains: (targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.UPDATE_TRAINS,
            targetElement: targetElement
        });
    },
    updateNewTrains: (targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.UPDATE_NEW_TRAINS,
            targetElement: targetElement
        });
    },
    saveOrUpdateTrainStation: (trainStation, targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.SAVE_OR_UPDATE_TRAIN_STATION,
            params: {
                trainStation: trainStation,
                targetElement: targetElement
            }
        });
    },
    getTrainStationById: (trainStation, targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.GET_TRAIN_STATION_BY_ID,
            params: {
                trainStation: trainStation,
                targetElement: targetElement
            }
        });
    },
    getTrainStationTypes: (trainStation) => {
        Dispatcher.dispatch({
            type: TrainConstants.GET_TRAIN_STATIONS_TYPES,
            params: {
                trainStation: trainStation
            }
        });
    },
    getTrainStationByCode: (trainStation, targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.GET_TRAIN_STATION_BY_CODE,
            params: {
                trainStation: trainStation,
                targetElement: targetElement
            }
        });
    },
    getTrainStationByName: (trainStation, targetElement) => {
        Dispatcher.dispatch({
            type: TrainConstants.GET_TRAIN_STATION_BY_NAME,
            params: {
                trainStation: trainStation,
                targetElement: targetElement
            }
        });
    }
};