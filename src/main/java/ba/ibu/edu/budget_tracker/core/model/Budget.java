package ba.ibu.edu.budget_tracker.core.model;
import jakarta.persistence.*;

import java.util.List;

@Entity(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String month;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Budget() {
    }

    public Budget(Long id, Double amount, String month, User user) {
        this.id = id;
        this.amount = amount;
        this.month = month;
        this.user = user;
    }

    public Budget(Double amount, String month, User user) {
        this.amount = amount;
        this.month = month;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
