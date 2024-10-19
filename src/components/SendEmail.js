import axios from "axios";
export const sendEmail = async ({ toEmail, name, date, consultants }) => {
  try {
    const response = await axios.post(
      "https://sendemail-3eohwb7mca-uc.a.run.app",
      {
        toEmail: toEmail,  
        name: name,     
        date: date,     
        consultants: consultants, 
      }, 
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    if (response.status === 200) {
      console.log("Email sent successfully:", response.data);  
    } else {
      console.error("Failed to send email:", response.data);  
    }
  } catch (error) {
    console.error("Error sending email:", error);  
};};
export const sendMultipleEmails = async (recipients) => {
  try {
    const response = await axios.post(
      'https://sendmultipleemails-3eohwb7mca-uc.a.run.app', 
      { recipients },  
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Emails sent successfully:', response.data);
      alert('Emails with PDFs sent successfully!');
    } else {
      console.error('Failed to send emails:', response.data);
      alert('Failed to send some emails.');
    }
  } catch (error) {
    console.error('Error sending multiple emails:', error);
    alert('Error sending emails.');
  }
};