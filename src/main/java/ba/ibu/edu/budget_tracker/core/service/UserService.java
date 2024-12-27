package ba.ibu.edu.budget_tracker.core.service;

import ba.ibu.edu.budget_tracker.core.model.User;
import ba.ibu.edu.budget_tracker.core.repository.UserRepository;
import ba.ibu.edu.budget_tracker.rest.dto.UserDto;
import ba.ibu.edu.budget_tracker.rest.dto.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(user.getId(), user.getEmail()));
    }

    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public Optional<UserDto> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(user -> new UserDto(user.getId(), user.getEmail()));
    }

    public UserDto createUser(String email) {
        User newUser = new User(email);
        userRepository.save(newUser);
        return new UserDto(newUser.getId(), newUser.getEmail());
    }
}
