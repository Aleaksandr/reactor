package by.project.reactor.service;

import by.project.reactor.dao.GenericDao;
import by.project.reactor.dao.UserDao;
import by.project.reactor.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Integer> implements UserService {

    private UserDao userDao;
    public UserServiceImpl(){
    }
    @Autowired
    public UserServiceImpl(@Qualifier("userDaoImpl") GenericDao<User, Integer> genericDao) {
        super(genericDao);
        this.userDao = (UserDao) genericDao;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = userDao.getUserByLogin(login);
        UserDetails userDetails = null;
        if(user != null) {
            GrantedAuthority authority = new SimpleGrantedAuthority(user.getType().name());
            userDetails = (UserDetails)new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), Arrays.asList(authority));
        }
        return userDetails;
    }
}