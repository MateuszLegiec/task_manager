package com.taskmanager.reactiveservice.controller;

import com.taskmanager.reactiveservice.util.NewPasswordDTO;
import com.taskmanager.reactiveservice.util.UserDTO;
import com.taskmanager.reactiveservice.model.User;
import com.taskmanager.reactiveservice.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.security.Principal;
import java.time.Duration;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public Mono<UserDTO> getUser(Mono<Principal> principal){
        return userService.getMe(principal);
    }

    @PostMapping("/change-password")
    public Mono<Void> changePassword(Mono<Principal> principal, @RequestBody @Valid NewPasswordDTO newPasswordDTO){
        return userService.changeUserPassword(principal,newPasswordDTO.getPassword()).then();
    }

    @GetMapping(value = "/all",produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Flux<User> getAll(){
        return userService.getAll();
    }

    @PostMapping("/add-user")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String addUser(@RequestBody @Valid UserDTO dto){
        return userService.addUser(dto);
    }

    @PutMapping("/{username}/lock")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<Void> changeLock(@PathVariable("username") String username){
        return userService.setUserLock(username).then();
    }

    @PutMapping("/{username}/reset-password")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<Void> resetUserPassword(@PathVariable("username") String username){
        return userService.resetUserPassword(username).then();
    }
}
