package com.taskmanager.reactiveservice.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Email;
import java.util.Set;

@Document
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @JsonIgnore
    private String id;
    @Indexed(unique = true)
    @Email
    @JsonProperty("email")
    private String username;
    private String firstName;
    private String lastName;
    @JsonIgnore
    private String password;
    private Boolean firstLogin;
    private Boolean locked;
    @JsonIgnore
    private Set<Role> authorities;

    @Override @JsonIgnore
    public boolean isAccountNonExpired() { return true; }
    @Override @JsonIgnore
    public boolean isAccountNonLocked() { return true; }
    @Override @JsonIgnore
    public boolean isCredentialsNonExpired() { return true; }
    @Override @JsonIgnore
    public boolean isEnabled() { return true; }
}
