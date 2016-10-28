package by.project.reactor.dao;

import by.project.reactor.model.User;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl extends GenericDaoImpl<User, Integer> implements UserDao {

    @Override
    public User getUserByLogin(String login) {
        Query query = currentSession()
                .createQuery("from User where login=:login")
                .setParameter("login", login);
        return (User) query.uniqueResult();

    }
}