package com.taskmanager.reactiveservice.repository;

import com.taskmanager.reactiveservice.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;


import javax.validation.constraints.Email;

public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUsername(@Email String username);
}
