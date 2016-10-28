package by.project.reactor.dao;

import by.project.reactor.model.City;

public interface CityDao extends GenericDao<City, Integer> {

    City getCity(String nameRu);
}