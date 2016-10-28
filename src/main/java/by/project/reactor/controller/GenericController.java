package by.project.reactor.controller;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/*
 * aleksandr.hirs
 */

@Controller
public class GenericController {

    private static final Logger LOGGER = Logger.getLogger(GenericController.class);

    /*@Autowired
    CityService cityService;*/

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = {"/generic/main"}, method = RequestMethod.GET)
    public ModelAndView genericPage() {
        ModelAndView model = new ModelAndView();
        LOGGER.info("Role: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        model.setViewName("main");
        return model;
    }
}