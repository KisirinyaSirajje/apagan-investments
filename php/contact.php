<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Define variables and set to empty values
$name = $email = $phone = $company = $subject = $message = "";
$response = array('status' => 'error', 'message' => 'An unknown error occurred.');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize input
    $name = filter_var(trim($_POST["name"] ?? ''), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST["phone"] ?? ''), FILTER_SANITIZE_STRING);
    $company = filter_var(trim($_POST["company"] ?? ''), FILTER_SANITIZE_STRING);
    $subject_type = filter_var(trim($_POST["subject"] ?? ''), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"] ?? ''), FILTER_SANITIZE_STRING);

    // Validate
    if (empty($name) || empty($email) || empty($phone) || empty($subject_type) || empty($message)) {
        $response['success'] = false;
        $response['message'] = 'Please fill out all required fields.';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }

    // Set recipient email address (Apagan Investments)
    $recipient = "apagan.invest@gmail.com"; 

    // Email Subject
    $email_subject = "New Website Inquiry: " . $subject_type;

    // Email Content
    $email_content = "You have received a new message from the Apagan Investments website contact form.\n\n";
    $email_content .= "=================================\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Company: " . (!empty($company) ? $company : "Not provided") . "\n";
    $email_content .= "Inquiry Type: $subject_type\n";
    $email_content .= "=================================\n\n";
    $email_content .= "Message:\n$message\n";

    // Email Headers
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Send Email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        $response['success'] = true;
        $response['status'] = 'success';
        $response['message'] = 'Thank you! Your message has been sent. Our team will contact you shortly.';
    } else {
        http_response_code(500);
        $response['success'] = false;
        $response['status'] = 'error';
        $response['message'] = 'Oops! Something went wrong and we couldn\'t send your message. Please try calling us directly.';
    }

    echo json_encode($response);
} else {
    http_response_code(403);
    $response['success'] = false;
    $response['message'] = 'There was a problem with your submission, please try again.';
    echo json_encode($response);
}
?>
