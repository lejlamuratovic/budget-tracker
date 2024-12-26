package ba.ibu.edu.budget_tracker.api.impl.sendgridclient;

import ba.ibu.edu.budget_tracker.core.api.EmailClient;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SendGridClient implements EmailClient {

    private final String apiKey;

    public SendGridClient(@Value("${sendgrid.api-key}") String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public void sendEmail(String to, String body) {
        String fromEmail = "lejla.muratovic@stu.ibu.edu.ba"; // Replace with your verified sender email
        String subject = "Test Email from Budget Tracker";

        Email from = new Email(fromEmail);
        Email toEmail = new Email(to);
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subject, toEmail, content);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            System.out.println("Email sent! Status Code: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());
            System.out.println("Response Headers: " + response.getHeaders());
        } catch (IOException ex) {
            System.err.println("Failed to send email: " + ex.getMessage());
        }
    }

    @Override
    public boolean validateEmail(String to) {
        return to != null && to.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$");
    }
}
