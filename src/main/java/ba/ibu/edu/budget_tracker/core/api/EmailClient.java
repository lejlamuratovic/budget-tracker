package ba.ibu.edu.budget_tracker.core.api;

public interface EmailClient {
    void sendEmail(String to, String body);
    boolean validateEmail(String to);
}
