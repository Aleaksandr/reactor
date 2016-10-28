import Store from './Store';
import Dispatcher from '../dispatcher/Dispatcher';
import CityConstants from '../constants/CityConstants';

class CityStore extends Store {
    constructor() {
        super();
    }
}

let cityStore = new CityStore();

String.prototype.replaceAll = function(search, replace){
    return this.split(search).join(replace);
};

cityStore.dispatchToken = Dispatcher.register((action) => {
    switch(action.type) {
        case CityConstants.GET_CITY_BY_NAME:
            var param = action.cities_page.state.name_ru_search;
            if(param && param.length > 2) {
                var sp_name = new URLSearchParams();
                sp_name.set("city_name", param);
                fetch('/cities/getCityByName', {
                    method: 'POST',
                    body: sp_name,
                    credentials: 'include'
                }).then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.log("not found Train Station");
                    }
                }).then(result => {
                    if(result) {
                        action.cities_page.updateState(JSON.parse(result.replaceAll('null', '""')));
                    }
                }).catch(error => {
                    console.log('Error load Train Station', error);
                });
            }
            break;
    }
});

export default cityStore;