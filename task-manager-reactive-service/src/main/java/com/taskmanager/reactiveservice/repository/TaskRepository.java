package com.taskmanager.reactiveservice.repository;

import com.taskmanager.reactiveservice.model.Task;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TaskRepository extends ReactiveMongoRepository<Task, String> {
}
