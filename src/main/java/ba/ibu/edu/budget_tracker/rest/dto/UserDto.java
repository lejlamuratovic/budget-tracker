package ba.ibu.edu.budget_tracker.rest.dto;

public class UserDto {
    private Long id;
    private String email;

    public UserDto() {}

    public UserDto(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

