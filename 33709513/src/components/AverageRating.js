import axios from 'axios';

export const AverageRating = async(newsId,type) => {  
    try {
        const response = await axios.get(`https://averagerating-3eohwb7mca-uc.a.run.app`, {
            params: {
                newsId: newsId,
                type: type
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting average rating:', error); 
    }
}
