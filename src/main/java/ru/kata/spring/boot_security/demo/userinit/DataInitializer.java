package ru.kata.spring.boot_security.demo.userinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void init() {
        Role role1 = new Role("ROLE_ADMIN");
        Role role2 = new Role("ROLE_USER");

        userService.addRole(role1);
        userService.addRole(role2);

        List<Role> roleAdmin = new ArrayList<>();
        List<Role> roleUser = new ArrayList<>();

        roleAdmin.add(role1);
        roleUser.add(role2);

        User user1 = new User("admin", "$2a$12$t6hgzDGBQx.pDAi4EiCRBO2mNsEACBhe2nk5qT/K7lNSVHyVVxKum", "ad@min",roleAdmin);
        User user2 = new User("user", "$2a$12$l7xnIlZAHWXAQbyWKpJIuusnWqvvoZc9hf8HV18g4Zpe2eA.nNtIy",  "us@er", roleUser);

        userService.add(user1);
        userService.add(user2);
    }
}
