import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getDocumentsWithReleaseFormID() {
  try {
    const q = query(collection(db, 'Request'), where('releaseformID', '!=', null));
    const querySnapshot = await getDocs(q);
    const documents = [];

    querySnapshot.forEach((documentSnapshot) => {
      documents.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data()
      });
    });
    console.log(documents);
    return documents;
  } catch (error) {
    console.error('Error retrieving documents:', error);
    throw error;
  }
}
