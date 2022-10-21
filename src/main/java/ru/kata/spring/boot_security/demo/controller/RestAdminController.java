package ru.kata.spring.boot_security.demo.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RestAdminController {

    private final UserServiceImpl userService;

    public RestAdminController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/allUser")
    public List<User> allUser() {
        return userService.listUsers();
    }

    @GetMapping("/restPrincipal")
    public User getPrincipal(Principal princ) {
        return userService.findByUsername(princ.getName());
        //User us = u.findByName(princ.getName());
    }

    @GetMapping("/oneUser/{id}")
    public User getOneUser(@PathVariable("id") Long id, Model model) {
        return userService.findById(id);
    }

    @PostMapping("/restCreat")
    public User creatRestUser(@RequestBody User user/*, @RequestParam(value = "sele") String sel*/) {
        if(user.getRoles()!=null) {
            List<String> lsr = user.getRoles().stream().map(r->r.getRole()).collect(Collectors.toList());
            List<Role> liRo = userService.listByRole(lsr);
            user.setRoles(liRo);
        }
        userService.add(user);
        return user;
    }

    @PatchMapping("/restUpdate")
    public User updateRestUser(@RequestBody User user) {System.out.println(user);
        if(user.getRoles()!=null) {
            List<String> lsr = user.getRoles().stream().map(r->r.getRole()).collect(Collectors.toList());
            List<Role> liRo = userService.listByRole(lsr);
            user.setRoles(liRo);
        }

        userService.update(user);
        return user;
    }

    @DeleteMapping("/restDelete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        //return userService.findById(id);
    }

    @GetMapping("rollist")
    public List<Role> getRole() {
        return userService.listRoles();
    }
}
