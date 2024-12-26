package ba.ibu.edu.budget_tracker;

import ba.ibu.edu.budget_tracker.core.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BudgetTrackerApplicationTests {

	@Autowired
	private EmailService emailService;

	@Test
	void testSendUserReportEmail() {
		// Arguments for the email
		String recipientEmail = "lejlamuratovic6@gmail.com"; // Replace with a valid email
		Long userId = 1L; // Replace with a valid user ID in your database
		int month = 12; // Month for the report
		int year = 2024; // Year for the report

		System.out.println("Sending user report email...");
		emailService.sendUserReportEmail(recipientEmail, userId, month, year);
		System.out.println("User report email sent successfully!");
	}
}
