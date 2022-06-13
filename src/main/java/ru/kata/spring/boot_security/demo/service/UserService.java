package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
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

    private final RoleDao roleDao;
    private final UserDao userDao;

    @Autowired
    public UserService(RoleDao roleDao, UserDao userDao) {
        this.roleDao = roleDao;
        this.userDao = userDao;
    }

    @Transactional
    public boolean addRole(Role role) {
        roleDao.add(role);
        return true;
    }

    @Transactional
    public Role findByNameRole(String name) { return roleDao.findByName(name); }

    @Transactional
    public List<Role> listRoles() { return roleDao.listRoles(); }

    @Transactional
    public Role findByIdRole(Long id) {
        return roleDao.findByIdRole(id);
    }

    @Transactional
    public List<Role> listByRole(List<String> name) {
        return roleDao.listByName(name);
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
    public void update(Long id, String userName, String password, String email, List<Role> roles) {
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
        return userBas;
    }

    private Collection<? extends GrantedAuthority> aug(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole()))
                .collect(Collectors.toList());
    }
}
