package com.taskmanager.reactiveservice.service;

import com.taskmanager.reactiveservice.event.UserEvent;
import com.taskmanager.reactiveservice.model.Role;
import com.taskmanager.reactiveservice.util.UserDTO;
import com.taskmanager.reactiveservice.model.User;
import com.taskmanager.reactiveservice.repository.UserRepository;
import com.taskmanager.reactiveservice.util.PasswordGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.*;

import java.security.Principal;
import java.util.Set;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ApplicationEventPublisher publisher;
    private final FluxProcessor processor;
    private final FluxSink<User> sink;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ApplicationEventPublisher publisher) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.publisher = publisher;
        this.processor = DirectProcessor.create().serialize();
        this.sink = this.processor.sink();
    }

    public String addUser(UserDTO dto){

        String password = PasswordGenerator.generate();
        User newUser = User.builder()
                .username(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .locked(false)
                .firstLogin(true)
                .password(bCryptPasswordEncoder.encode(password))
                .authorities(dto.getAdmin() ? Set.of(Role.ROLE_USER,Role.ROLE_ADMIN) : Set.of(Role.ROLE_USER))
                .build();

        try {

            userRepository
                    .save(newUser)
//                    .doOnSuccess(user -> this.publisher.publishEvent(new UserEvent(user)))
                    .subscribe();

            return password;

        } catch (Exception e){
            return e.getMessage();
        }
    }

    public Mono<User> setUserLock(String username){
        return userRepository
                .findByUsername(username)
                .map(user -> {
                    user.setLocked(!user.getLocked());
                    log.info("User: " + username + " is " + user.getLocked() + " now");
                    return user;
                })
                .flatMap(userRepository::save)
                .doOnSuccess(sink::next);
    }

    public Mono<User> resetUserPassword(String username) {
        return userRepository
                .findByUsername(username)
                .map(user -> {
                    user.setFirstLogin(false);
                    log.info("Refreshing user: " + username +" password");
                    return user;
                })
                .flatMap(userRepository::save);
    }

    public Mono<User> changeUserPassword(Mono<Principal> principalMono, String password){
        return principalMono.map(Principal::getName)
                .flatMap(userRepository::findByUsername)
                .map(user -> {
                    user.setPassword(bCryptPasswordEncoder.encode(password));
                    user.setFirstLogin(false);
                    return user;
                })
                .flatMap(userRepository::save);

    }

    public Flux<User> getAll(){
        return userRepository.findAll();
    }

    public Mono<UserDTO> getMe(Mono<Principal> principalMono) {
        return principalMono.map(Principal::getName)
                .flatMap(userRepository::findByUsername)
                .map(user -> UserDTO.builder()
                                    .email(user.getUsername())
                                    .firstName(user.getFirstName())
                                    .lastName(user.getLastName())
                                    .admin(user.getAuthorities().contains(Role.ROLE_ADMIN))
                                    .firstLogin(user.getFirstLogin())
                                    .build()
                );
    }

    public void deleteAllUsers(){
        userRepository.deleteAll().subscribe();
    }

}
