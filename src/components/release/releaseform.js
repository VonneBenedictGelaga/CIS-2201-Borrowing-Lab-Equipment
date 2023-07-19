import { db } from '../../config/firebase';
import { doc, updateDoc } from "firebase/firestore";

export const generateReleaseFormID = (documentID, userType) => {
  const userTypes = {
    'student': 1,
    'faculty': 2,
    'cisco_officer': 3,
    'teacher': 4,
    'alumni': 5,
    'others': 6
  };

  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const date = String(currentDate.getDate()).padStart(2, '0');
  const userTypeCode = userTypes[userType];
  const randomString = Math.random().toString(36).substring(2, 10);

  const releaseFormID = `${month}-${date}-${userTypeCode}-${randomString}`;

  // Update the document in the 'Request' collection
  const requestDocRef = doc(db, 'Request', documentID);
  updateDoc(requestDocRef, { releaseformID: releaseFormID })
  .then(() => {
    console.log('Attribute added successfully');
  })
  .catch((error) => {
    console.error('Error adding attribute:', error);
  });
};
