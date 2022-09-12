import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { db } from "../configs/firebaseConfig"

export const searchPlate = async (plateNumber) => {
  let temp = []
  try {
    const plateQuery = query(collection(db, "vehicles"), where("plateNumber", "==", plateNumber.toString()), orderBy("owner"));
    const querySnapshot = await getDocs(plateQuery);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
    });
    return temp
  } catch (error) {
    console.log(error)
  }
}

export const searchVehicle = async (queryKey, pageParam) => {
  const {searchOption, pageSize} = queryKey[1]
  let temp = []
  let vehicleQuery
  try {
    if (searchOption === "전체") {
      if (pageParam) {
        vehicleQuery = query(collection(db, "vehicles"), orderBy("owner"), startAfter(pageParam), limit(pageSize));
      } else {
        vehicleQuery = query(collection(db, "vehicles"), orderBy("owner"), limit(pageSize));
      }
    } else {
      if (pageParam) {
        vehicleQuery = query(collection(db, "vehicles"), where("division", "==", searchOption), orderBy("owner"), startAfter(pageParam), limit(pageSize));
      } else {
        vehicleQuery = query(collection(db, "vehicles"), where("division", "==", searchOption), orderBy("owner"), limit(pageSize));
      }
    }
    const querySnapshot = await getDocs(vehicleQuery);
    return querySnapshot

  } catch (error) {
    console.log(error)
  }
}

export const getNumbers = async () => {
  let temp = []
  try {
    const numberQuery = query(collection(db, 'numOfVehicle'), orderBy("index"))
    const querySnapshot = await getDocs(numberQuery);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
    });
    return temp
  } catch (error) {
    console.log(error)
  }
}

export const getTotalVehicleList = async () => {
  let temp = []
  try {
    let vehicleQuery = query(collection(db, "vehicles"), orderBy("owner"));
    const querySnapshot = await getDocs(vehicleQuery);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
    });
    return temp

  } catch (error) {
    console.log(error)
  }
}