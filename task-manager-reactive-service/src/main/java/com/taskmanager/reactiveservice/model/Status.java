package com.taskmanager.reactiveservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Status {
    NEW("New"),
    IN_PROGRESS("In progress"),
    TESTING("Testing"),
    DONE("Done");

    String name;
}
