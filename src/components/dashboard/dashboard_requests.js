import { db } from '../../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getRequestStatistics(period) {
  try {
    const today = new Date();
    let startDate;
    
    // Calculate the start date based on the period
    switch (period) {
      case "week":
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case "year":
        startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        break;
      case "all":
        startDate = null; // No start date, get all requests
        break;
      case "upcoming":
        startDate = today.toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format
        break;
      default:
        throw new Error("Invalid period value. Accepted values are 'week', 'month', 'year', 'all', or 'upcoming'.");
    }
    
    const requestCollectionRef = collection(db, "Request");

    // If the period is not 'all' or 'upcoming', add a filter for the startDate
    if (startDate && period !== "upcoming") {
      const q = query(requestCollectionRef, where("dateBorrowed", ">=", startDate));
      const snapshot = await getDocs(q);
      return processData(snapshot);
    } else if (period === "upcoming") {
      const q = query(requestCollectionRef, where("dateBorrowed", ">", startDate));
      const snapshot = await getDocs(q);
      return processData(snapshot);
    } else {
      const snapshot = await getDocs(requestCollectionRef);
      return processData(snapshot);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function processData(snapshot) {
  let totalRequests = 0;
  const statusCounts = {
    verified: 0,
    initial_approval: 0,
    fully_approved: 0,
    rejected: 0,
    released: 0,
    returned: 0,
    missing: 0
  };

  snapshot.forEach((doc) => {
    totalRequests++;
    const status = doc.data().status;
    statusCounts[status]++;
  });

  return { totalRequests, statusCounts };
}

export default getRequestStatistics;
