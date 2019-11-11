package com.taskmanager.reactiveservice.config;

import com.taskmanager.reactiveservice.util.UserDTO;
import com.taskmanager.reactiveservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class Init implements ApplicationListener<ApplicationReadyEvent> {

    private final UserService userService;

    public Init(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        userService.deleteAllUsers();
        UserDTO initAdmin = UserDTO.builder()
                .email("admin@gmail.com")
                .firstName("firstAdminName")
                .lastName("lastAdminName")
                .admin(true)
                .build();

        UserDTO initUser = UserDTO.builder()
                .email("user@gmail.com")
                .firstName("firstUserName")
                .lastName("lastUserName")
                .admin(false)
                .build();

        String adminPassword = userService.addUser(initAdmin);
        String userPassword = userService.addUser(initUser);
        log.info("login: admin@gmail.com password: " + adminPassword);
        log.info("login: user@gmail.com password: " + userPassword);
    }
}
