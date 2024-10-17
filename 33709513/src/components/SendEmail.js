import axios from "axios"; 
export const sendEmail = async () => {
    try {
      const response = await axios.post(
        "https://sendemail-3eohwb7mca-uc.a.run.app",
        {}, 
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
  
      if (response.status === 200) {
        console.log(response.data);  
      } else {
        console.error(response.data);  
      }
    } catch (error) {
      console.error("Error sending email:", error);  
    }
  };
  


