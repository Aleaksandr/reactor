package by.project.reactor.service;

import by.project.reactor.model.City;

public interface CityService extends GenericService<City,Integer> {

    public City getCity(String nameRu);
}