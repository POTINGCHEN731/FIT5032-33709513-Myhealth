import { collection, addDoc } from 'firebase/firestore';
import db from '../Firebase/init.js';
import { getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

export const newsRate = async (type,newsId, newsTitle, rating,username) => {
  try {
    await addDoc(collection(db, type), {
        newsId: newsId,
        newsTitle: newsTitle,
        rating: rating,
        username: username,
    });

  } catch (error) {
    console.error('Error adding Rate: ', error);
  }
}

export const submitScore = async (type, newsId, newsTitle, rating, username) => {
    if (!username) {
      alert('Please login first');
      return;
    }
  
    try {
      const q = query(
        collection(db, type),
        where('newsId', '==', newsId),
        where('username', '==', username)
      );
      
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(db, type, docSnapshot.id));
        });
        alert('Your previous score has been removed, and your new rating will be added.');
      }
  
      await newsRate(type, newsId, newsTitle, rating, username);
      alert('Your score has been added successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };
