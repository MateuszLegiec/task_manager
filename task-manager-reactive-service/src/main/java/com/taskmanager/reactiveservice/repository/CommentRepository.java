package com.taskmanager.reactiveservice.repository;

import com.taskmanager.reactiveservice.model.Comment;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface CommentRepository extends ReactiveMongoRepository<Comment,String> {
    Flux<Comment> findAllByTaskId(String task_id);
}
