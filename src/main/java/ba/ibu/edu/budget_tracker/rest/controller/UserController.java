package ba.ibu.edu.budget_tracker.rest.controller;

import ba.ibu.edu.budget_tracker.core.service.UserService;
import ba.ibu.edu.budget_tracker.rest.dto.UserDto;
import ba.ibu.edu.budget_tracker.rest.dto.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public ResponseEntity<UserDto> getLoginUser(@RequestParam String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> postLoginUser(@RequestBody String email) {
        UserDto user = userService.createUser(email);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
