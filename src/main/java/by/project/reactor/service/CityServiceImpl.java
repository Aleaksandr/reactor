package by.project.reactor.service;

import by.project.reactor.dao.CityDao;
import by.project.reactor.dao.GenericDao;
import by.project.reactor.model.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CityServiceImpl extends GenericServiceImpl<City, Integer> implements CityService {

    private CityDao cityDao;
    public CityServiceImpl(){
    }
    @Autowired
    public CityServiceImpl(@Qualifier("cityDaoImpl") GenericDao<City, Integer> genericDao) {
        super(genericDao);
        this.cityDao = (CityDao) genericDao;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public City getCity(String userName) {
        return cityDao.getCity(userName);
    }
}