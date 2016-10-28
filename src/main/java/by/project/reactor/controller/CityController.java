package by.project.reactor.controller;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
public class CityController {

    private static final Logger LOGGER = Logger.getLogger(CityController.class);

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping("/cities")
    public String citiesPage(HttpServletResponse response) {
        LOGGER.info("cities start");
        LOGGER.info("Role: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        return "cities";
    }
}
