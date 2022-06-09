package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Controller
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("admin")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String users(Model model) {
        model.addAttribute("users", userService.listUsers());
        return "userss";
    }

    @GetMapping("create")
    public String createUserForm(User user) {
        return "create";
    }

    @PostMapping("create")
    public String createUser(/*@ModelAttribute("user") */User user, @RequestParam("listRoles") ArrayList<String> roles) {

        String role = roles.get(0);

        Role rol = new Role(role);
        Set<Role> aut = new HashSet<>(Arrays.asList(rol/*, rolU*/));
        System.out.println(aut);
        user.setRoles(aut);
        System.out.println(user);
        userService.add(user);
        return "redirect:/admin";
    }

    @GetMapping("delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @GetMapping("update/{id}")
    public String updateUserForm(@PathVariable("id") Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "update";
    }

    @PostMapping("update")
    public String updateUser(User user) {
        userService.update(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getRoles());
        return "redirect:/admin";
    }
}
