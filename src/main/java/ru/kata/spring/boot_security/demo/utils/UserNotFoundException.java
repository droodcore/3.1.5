package ru.kata.spring.boot_security.demo.utils;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
        super(message);
    }
}
