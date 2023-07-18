

async function getDocumentsWithStatus(status) {
  try {
    const querySnapshot = await db.collection('Request').where('status', '==', status).get();
    const documents = [];

    querySnapshot.forEach((documentSnapshot) => {
      documents.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data()
      });
    });

    return documents;
  } catch (error) {
    console.error('Error retrieving documents:', error);
    throw error;
  }
}