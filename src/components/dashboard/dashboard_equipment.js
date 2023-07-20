import { db } from '../../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import the necessary Firestore functions

async function getEquipmentInfo(equipment_type) {
  try {
    const equipCollectionRef = collection(db, 'Equipments');
    let q;

    if (equipment_type !== 'all') {
      q = query(equipCollectionRef, where('equipType', '==', equipment_type));
    } else {
      q = equipCollectionRef; 
    }

    const snapshot = await getDocs(q);
    let totalQuantity = 0;
    let totalBorrowed = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      totalQuantity += data.total_quantity;
      totalBorrowed += data.total_borrowed;
    });

    const availableEquipment = totalQuantity - totalBorrowed;

    return {
      total_quantity: totalQuantity,
      total_borrowed: totalBorrowed,
      available_equipment: availableEquipment,
    };
  } catch (error) {
    console.error('Error fetching equipment information:', error);
    return null;
  }
}

async function exampleUsage() {
  const equipmentType = 'networking-equipment'; // Replace with the desired equipment_type or use 'all' for all equipment types
  const equipmentInfo = await getEquipmentInfo(equipmentType);

  if (equipmentInfo) {
    console.log('Equipment Information:');
    console.log('Total Quantity:', equipmentInfo.total_quantity);
    console.log('Total Borrowed:', equipmentInfo.total_borrowed);
    console.log('Available Equipment:', equipmentInfo.available_equipment);
  } else {
    console.log('Failed to fetch equipment information.');
  }
}

export default getEquipmentInfo;
