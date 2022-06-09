package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.User;

import java.security.Principal;

@Controller
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class HelloController {
    private final UserDao ud;

    public HelloController(UserDao ud) {
        this.ud = ud;
    }

    @GetMapping(value = "/user")
    public String printWelcome(ModelMap model, Principal princ) {
        User us = ud.findByName(princ.getName());
        model.addAttribute("messages", us);
        return "user";
    }
}


