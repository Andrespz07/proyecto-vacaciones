package com.vacaciones.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vacaciones.models.User;
import com.vacaciones.payLoads.CreateUserPayload;
import com.vacaciones.services.ProfileRegisterService;

@RestController
@RequestMapping(path = "/api")
public class CreateUserController {

    private ProfileRegisterService service;

    public CreateUserController(ProfileRegisterService service) {
        this.service = service;
    }

    @PostMapping(value = "/createUser")
    public ResponseEntity<Map<String, String>> createUserAndProfile(@RequestBody CreateUserPayload payload) {
        try {
            User userDB = service.createUserAndProfile(payload);

            Map<String, String> json = new HashMap<>();

            json.put("message", "successfully registered user");
            json.put("role", userDB.getRoles().toString());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(json);

        } catch (Exception e) {
            Map<String, String> json = new HashMap<>();

            json.put("Error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.CONFLICT).body(json);
        }
    }
}
