import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { writeBatch } from 'firebase/firestore'; // Add this import statement

export const updateEquipmentQuantity = async (releasedEquipment) => {
  try {
    const db = getFirestore();
    const batch = writeBatch(db); // Use writeBatch instead of batch

    for (const equip of releasedEquipment) {
      const equipId = equip.equipmentId;
      const equipRef = doc(db, 'Equipments', equipId);

      // Get the current equipment data
      const equipSnapshot = await getDoc(equipRef);
      const equipData = equipSnapshot.data();

      // Calculate the new quantity values
      const updatedTotalBorrowed = equipData.total_borrowed + equip.quantity;

      // Update the equipment quantity in the document
      batch.update(equipRef, {
        total_borrowed: updatedTotalBorrowed
      });
    }

    // Commit the batched updates
    await batch.commit();
  } catch (error) {
    console.log('Error updating equipment quantity:', error);
  }
};

export const updateReturnedEquipmentQuantity = async (returnedEquipment) => {
    try {
      const db = getFirestore();
      const batch = writeBatch(db);
  
      for (const equip of returnedEquipment) {
        const equipId = equip.equipmentId;
        const equipRef = doc(db, 'Equipments', equipId);
  
        // Get the current equipment data
        const equipSnapshot = await getDoc(equipRef);
        const equipData = equipSnapshot.data();
  
        // Calculate the new quantity values
        const updatedTotalBorrowed = equipData.total_borrowed - equip.quantity;
  
        // Update the equipment quantity in the document
        batch.update(equipRef, {
          total_borrowed: updatedTotalBorrowed
        });
      }
  
      // Commit the batched updates
      await batch.commit();
    } catch (error) {
      console.log('Error updating equipment quantity:', error);
    }
  };