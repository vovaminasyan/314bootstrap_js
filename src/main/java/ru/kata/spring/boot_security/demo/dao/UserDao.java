package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Set;

@Repository
public class UserDao {

    @PersistenceContext
    private EntityManager sessionFactory;

    public User findByName(String username) {
      //  List<User> users = sessionFactory.createQuery("select u FROM User u WHERe u.username = :id", User.class)
         //       .setParameter("id", username).getResultList();
        //User us = users.get(1);
      //  User user = users.stream()/*.filter(use -> use.getUsername() == us.getUsername())*/.findAny().orElse(null);
        //User user =
       // User use2 = users.stream().filter(use -> use.getFirstName() == user.getFirstName()).findAny().orElse(null);
      // System.out.println(user);
       // return user;
        return sessionFactory.createQuery("select u FROM User u JOIn fETCH u.roles WHERe u.username = :id", User.class)
                .setParameter("id", username)
                .getResultList().stream().findAny().orElse(null);
    }

    public  void delete(Long id) {
        User us = sessionFactory.find(User.class, id);
        sessionFactory.remove(us);
    }

    public void update(Long id, String userName, String password, String email, List<Role> roles) {
        User us = sessionFactory.find(User.class, id);
        us.setId(id);
        us.setUsername(userName);
        us.setPassword(password);
        us.setEmail(email);
        us.setRoles(roles);
        sessionFactory.merge(us);
    }

    public boolean add(User user) {
//        User userBas = findByName(user.getUsername());
//        if(userBas != null) return false;
        sessionFactory.persist(user);
        return true;
    }

    public List<User> listUsers() {
        return sessionFactory.createQuery("select s from User s", User.class).getResultList();
    }

    public User findById(Long id) {
        return sessionFactory.find(User.class, id);//listUsers().stream().filter(user -> user.getId() == id).findAny().orElse(null);
    }
}

