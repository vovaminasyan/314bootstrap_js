package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.Role;
//import org.springframework.security.core.userdetails.User;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public boolean add(User user) {
        User userBas = userDao.findByName(user.getUsername());
        if(userBas != null) {return false;}
        userDao.add(user);
        return true;
    }

    @Transactional
    public List<User> listUsers() {
        return userDao.listUsers();
    }

    @Transactional
    public void delete(Long id) {
        userDao.delete(id);
    }

    @Transactional
    public void update(Long id, String userName, String password, String email, Set<Role> roles) {
        userDao.update(id, userName, password, email, roles);
    }

    @Transactional
    public User findById(Long id) {
        return userDao.findById(id);
    }

    @Transactional
    public User findByUsername(String userName) {
        return userDao.findByName(userName);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userBas = findByUsername(username);
        if (userBas == null) {
            throw new UsernameNotFoundException(username + " not found");
        }
        UserDetails user = new org.springframework.security.core.userdetails.User(userBas.getUsername(), userBas.getPassword(), aug(userBas.getRoles()));

//        UserDetails user = org.springframework.security.core.userdetails.*/User.builder().username(userBas.getUsername())
//                .password(userBas.getPassword())
//                .roles(userBas.getRoles().toArray(String[]::new))
//                .build();
        return user;
    }

    private Collection<? extends GrantedAuthority> aug(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole()))
                .collect(Collectors.toList());
    }
}
