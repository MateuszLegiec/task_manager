package com.taskmanager.reactiveservice.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @Email
    private String email;
    @NotNull @NotEmpty @Size(min = 3)
    private String firstName;
    @NotNull @NotEmpty @Size(min = 3)
    private String lastName;
    private Boolean firstLogin;
    private Boolean admin;
}
