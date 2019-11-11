package com.taskmanager.reactiveservice.event;

import org.springframework.context.ApplicationEvent;

public class TaskEvent extends ApplicationEvent {
    public TaskEvent(Object source) {
        super(source);
    }
}
