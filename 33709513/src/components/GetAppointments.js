import axios from 'axios';

export const fetchAppointments = async () => {
  try {
    const response = await axios.get('https://getallappointments-3eohwb7mca-uc.a.run.app');
    console.log("Appointments:", response.data.data);
    return response.data.data; 

    
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};