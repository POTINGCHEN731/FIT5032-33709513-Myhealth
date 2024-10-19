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