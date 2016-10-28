package by.project.reactor.dao;

import by.project.reactor.model.City;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CityDaoImpl extends GenericDaoImpl<City, Integer> implements CityDao {

    @Override
    public City getCity(String nameRu) {
        Query query = currentSession()
                .createQuery("from City where nameRu=:nameRu")
                .setParameter("nameRu", nameRu);
        return (City) query.uniqueResult();

    }
}