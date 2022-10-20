package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UseDaoInterf {

    @PersistenceContext
    private EntityManager em;

    public User findByName(String username) {
        return em.createQuery("select u FROM User u  WHERe u.username = :id", User.class)
        //return em.createQuery("select u FROM User u JOIn fETCH u.roles WHERe u.username = :id", User.class)
                .setParameter("id", username)
                .getResultList().stream().findAny().orElse(null);
    }

    public  void delete(Long id) {
        User us = em.find(User.class, id);
        em.remove(us);
    }

    public void update(User us) {
        em.merge(us);
    }

    public boolean add(User user) {
        em.persist(user);
        return true;
    }

    public List<User> listUsers() {
        return em.createQuery("select s from User s", User.class).getResultList();
    }

    public User findById(Long id) {
        return em.find(User.class, id);
    }
}

