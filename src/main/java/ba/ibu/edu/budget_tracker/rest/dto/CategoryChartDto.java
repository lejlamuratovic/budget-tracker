package ba.ibu.edu.budget_tracker.rest.dto;

public class CategoryChartDto {
    private Long categoryId;
    private Long expenseCount;

    public CategoryChartDto(Long categoryId, Long expenseCount) {
        this.categoryId = categoryId;
        this.expenseCount = expenseCount;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(Long expenseCount) {
        this.expenseCount = expenseCount;
    }
}
