package com.taskmanager.reactiveservice.service;

import com.taskmanager.reactiveservice.event.TaskEvent;
import com.taskmanager.reactiveservice.model.Comment;
import com.taskmanager.reactiveservice.model.Status;
import com.taskmanager.reactiveservice.model.Task;
import com.taskmanager.reactiveservice.repository.CommentRepository;
import com.taskmanager.reactiveservice.repository.TaskRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CommentRepository commentRepository;
    private final ApplicationEventPublisher publisher;


    public TaskService(TaskRepository taskRepository, CommentRepository commentRepository, ApplicationEventPublisher publisher) {
        this.taskRepository = taskRepository;
        this.commentRepository = commentRepository;
        this.publisher = publisher;
    }

    public Mono<Task> getOne(String taskId){
        return taskRepository.findById(taskId);
    }

    public Mono<Task> saveTask(Task newTask){
        newTask.setStatus(Status.NEW);
        newTask.setCreationDate(LocalDate.now());
        return taskRepository.save(newTask)
                .doOnSuccess(task -> this.publisher.publishEvent(new TaskEvent(task)));
    }

    public Mono<Task> updateTask(String taskId,Task updatedTask){
        return taskRepository.findById(taskId)
                .map(task -> {
                            task.setStatus(updatedTask.getStatus());
                            task.setAssignedUser(updatedTask.getAssignedUser());
                            return task;
                        })
                .flatMap(taskRepository::save)
                .doOnSuccess(task -> this.publisher.publishEvent(new TaskEvent(task)));
    }

    public Mono<Comment> saveComment(String taskId, Comment newComment){
        return taskRepository.findById(taskId)
                .map(task -> Comment.builder()
                        .task(task)
                        .creationDateTime(LocalDateTime.now())
                        .description(newComment.getDescription())
                        .creator(newComment.getCreator())
                        .build())
                .flatMap(commentRepository::save)
                .doOnSuccess(task -> this.publisher.publishEvent(new TaskEvent(task)));
    }

    public Flux<Task> getAll(){
        return taskRepository.findAll();
    }

    public Flux<Comment> getTaskComments(String taskId){
        return commentRepository.findAllByTaskId(taskId);
    }

    public List<String> getAllStatuses(){
        return Stream.of(Status.values())
                .map(Status::getName)
                .collect(Collectors.toList());
    }

}
