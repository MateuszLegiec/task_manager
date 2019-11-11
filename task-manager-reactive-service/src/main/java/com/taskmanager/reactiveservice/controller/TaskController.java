package com.taskmanager.reactiveservice.controller;

import com.taskmanager.reactiveservice.model.Comment;
import com.taskmanager.reactiveservice.model.Task;
import com.taskmanager.reactiveservice.service.TaskService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/task",produces = MediaType.APPLICATION_JSON_VALUE)
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public Mono<Task> getOne(@PathVariable String id){ return taskService.getOne(id); }

    @GetMapping(value = "/all" , produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<Task> getAll(){ return taskService.getAll(); }

    @GetMapping("/statuses")
    public List<String> getAllStatuses(){
        return taskService.getAllStatuses();
    }

    @PostMapping("/save")
    public Mono<Void> saveTask(@RequestBody @Valid Task dto){
        return taskService.saveTask(dto).then();
    }

    @PutMapping("/{task-id}/update")
    public Mono<Void> updateTask(@PathVariable("task-id") String taskId,@RequestBody Task update) {return taskService.updateTask(taskId,update).then();}

    @GetMapping(value = "/{task-id}/comments", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<Comment> getComments(@PathVariable("task-id") String taskId){ return taskService.getTaskComments(taskId); }

    @PostMapping("/{task-id}/add-comment")
    public Mono<Void> saveComment(@PathVariable("task-id") String taskId, @RequestBody @Valid Comment comment){
        return taskService.saveComment(taskId,comment).then();
    }
}