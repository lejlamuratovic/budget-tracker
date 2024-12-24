package ba.ibu.edu.budget_tracker.rest.dto;

public class BudgetDto {
    private Long id;
    private Double amount;
    private String month;
    private Long userId;

    public BudgetDto() {}

    public BudgetDto(Long id, Double amount, String month, Long userId) {
        this.id = id;
        this.amount = amount;
        this.month = month;
        this.userId = userId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
