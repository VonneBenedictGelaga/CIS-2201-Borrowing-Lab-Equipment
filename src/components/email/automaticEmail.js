import { db } from '../../config/firebase.js';
import { noticeReturn, noticeMissing } from './notice.js';

export const checkRequestStatus = async () => {
  const currentDate = new Date();
  const oneDayAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  
  if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
    try {
      const snapshot = await db.collection('Requests').where('dateReturned', '>=', oneDayAgo).get();

      snapshot.forEach((doc) => {
        const request = doc.data();
        const borrowerEmail = request.borrowerEmail;
        const status = request.status;

        if (request.dateReturned.toDate() <= currentDate && status === 'returned') {
          noticeReturn(borrowerEmail);
        } else if (request.dateReturned.toDate() <= oneDayAgo && status !== 'returned') {
          noticeMissing(borrowerEmail);
        }
      });
    } catch (error) {
      console.error('Error querying requests:', error);
    }
  }
};

const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
const millisecondsUntilMidnight = midnight.getTime() - now.getTime();

setInterval(checkRequestStatus, millisecondsUntilMidnight);
