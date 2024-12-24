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

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto(user.getId(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(user.getId(), user.getEmail()));
    }

    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public UserDto createUser(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        User savedUser = userRepository.save(user);
        return new UserDto(savedUser.getId(), savedUser.getEmail());
    }

    public UserDto updateUser(Long id, UserRequest request) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setEmail(request.getEmail());
                    User updatedUser = userRepository.save(user);
                    return new UserDto(updatedUser.getId(), updatedUser.getEmail());
                })
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
