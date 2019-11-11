package com.taskmanager.reactiveservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Task {
    @Id
    private String id;
    @Indexed(unique = true)
    @NotNull @NotEmpty
    private String title;
    @NotNull @NotEmpty
    private String description;
    private LocalDate deadline;
    private LocalDate creationDate;
    private Integer priority;
    private Status status;
    private String orderedBy;
    private String assignedUser;
}