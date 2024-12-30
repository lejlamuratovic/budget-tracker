package ba.edu.ibu.budgettracker.rest.dto;

public class CategoryChartDto {
    private String categoryName;
    private Long expenseCount;

    public CategoryChartDto(String categoryName, Long expenseCount) {
        this.categoryName = categoryName;
        this.expenseCount = expenseCount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(Long expenseCount) {
        this.expenseCount = expenseCount;
    }
}
