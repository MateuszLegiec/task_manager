package com.taskmanager.reactiveservice.util;

import lombok.Data;

@Data
public class NewPasswordDTO {
    private String password;
    private String confirmedPassword;
}
