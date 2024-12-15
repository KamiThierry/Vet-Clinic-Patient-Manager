package rw.veterinarian.veterinarian.services;

import rw.veterinarian.veterinarian.model.User;

import java.util.List;

public interface IUserService {
    User createUser(User user) throws Exception;
    boolean authenticateUser(String email, String password) throws Exception;
    List<User> getUsers();
    User getUser(String email);
    void deleteUser(String email);
}