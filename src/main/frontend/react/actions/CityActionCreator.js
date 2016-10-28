import Dispatcher from '../dispatcher/Dispatcher';
import CityConstants from '../constants/CityConstants';

export default {

    getCityByNameRu: (cities_page) => {
        Dispatcher.dispatch({
            type: CityConstants.GET_CITY_BY_NAME,
            cities_page: cities_page
        });
    }
};