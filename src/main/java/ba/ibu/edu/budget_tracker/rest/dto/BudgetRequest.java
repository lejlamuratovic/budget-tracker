package ba.ibu.edu.budget_tracker.rest.dto;

public class BudgetRequest {
    private Double amount;
    private String month;
    private Long userId;

    public BudgetRequest() {}

    public BudgetRequest(Double amount, String month, Long userId) {
        this.amount = amount;
        this.month = month;
        this.userId = userId;
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
