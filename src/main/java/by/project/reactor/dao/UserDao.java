package by.project.reactor.dao;

import by.project.reactor.model.User;

public interface UserDao extends GenericDao<User, Integer> {

    User getUserByLogin(String login);
}