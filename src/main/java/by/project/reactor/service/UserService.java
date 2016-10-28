package by.project.reactor.service;

import by.project.reactor.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends GenericService<User,Integer>, UserDetailsService {

}