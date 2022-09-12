import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { db } from '../../configs/firebaseConfig';
import { collection, doc, getDocs, query, runTransaction, where, updateDoc, deleteDoc } from 'firebase/firestore';
// components
import Container from "../../components/Container/Container";
import UpdateForm from "../../components/Forms/UpdateForm";
import Logo from "../../components/Logo";
import SuccessModal from "../../components/Modal/SuccessModal";
import Navbar from "../../components/Navbar";
import { useRouter } from 'next/router';

export default function Edit(props) {
  const userInfo = props.userInfo
  const [ open, setOpen ] = useState(false)
  const [ modalContent, setModalContent ] = useState({
    title: "",
    subtitle: "",
    result: true,
    plateNumber: "",
    errorMessage: ""
  })
  const router = useRouter()
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      owner: userInfo.owner,
      division: userInfo.division,
      position: userInfo.position,
      plateFront: userInfo.plateFront,
      plateNumber: userInfo.plateNumber,
      phoneNumber: userInfo.phoneNumber,
    }
  })

  const onSubmit = async (data) => {
    const fullPlateNumber = data.plateFront + " " + data.plateNumber

    const submitData = {
      ...data,
      fullPlateNumber
    }

    try {
      let docId = ""
      const updateQuery = query(collection(db, "vehicles"), where("fullPlateNumber", "==", submitData.fullPlateNumber));
      const docSnap = await getDocs(updateQuery);
      const temp = []
      docSnap.forEach(doc => {
        temp.push(doc.id)
      })
      docId = temp[0]
      const updateRef = doc(db, "vehicles", docId)
      await updateDoc(updateRef, submitData)

      if (userInfo.division !== submitData.division) {
        await runTransaction(db, async (transaction) => {
          const oldRef = doc(db, "numOfVehicle", userInfo.division);
          const oldDoc = await transaction.get(oldRef);
          if (!oldDoc.exists()) {
            throw "Total number of vehicle document does not exist!";
          }
  
          const newRef = doc(db, "numOfVehicle", submitData.division);
          const newDoc = await transaction.get(newRef);
          if (!newDoc.exists()) {
            throw "Division Document does not exist!";
          }
      
  
          const newTotalNumber = oldDoc.data().totalNumber - 1;
          transaction.update(oldRef, { totalNumber: newTotalNumber });
  
          const newDivisionNumber = newDoc.data().totalNumber + 1;
          transaction.update(newRef, { totalNumber: newDivisionNumber });
        });
      }

      
      setModalContent({
        result: true,
        title: "업데이트 성공",
        subtitle: "성공적으로 업데이트 하였습니다",
        plateNumber: submitData.fullPlateNumber 
      })
    } catch (e) {
      console.log("Transaction failed: ", e);
      setModalContent({
        result: false,
        title: "업데이트 실패",
        subtitle: "업데이트 하는데 실패하였습니다",
        plateNumber: submitData.fullPlateNumber,
        errorMessage: "실패이유 : 서버에서 업데이트하지 못했습니다."
      })
    }

    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const onDelete = async (fullPlateNumber) => {
    try {
      let docId = ""
      const updateQuery = query(collection(db, "vehicles"), where("fullPlateNumber", "==", fullPlateNumber));
      const docSnap = await getDocs(updateQuery);
      const temp = []
      docSnap.forEach(doc => {
        temp.push(doc.id)
      })
      docId = temp[0]
      const updateRef = doc(db, "vehicles", docId)
      await deleteDoc(updateRef)

      await runTransaction(db, async (transaction) => {
        const totalRef = doc(db, "numOfVehicle", "전체");
        const totalDoc = await transaction.get(totalRef);
        if (!totalDoc.exists()) {
          throw "Total number of vehicle document does not exist!";
        }

        const numberRef = doc(db, "numOfVehicle", userInfo.division);
        const numberDoc = await transaction.get(numberRef);
        if (!numberDoc.exists()) {
          throw "Division Document does not exist!";
        }
    

        const newTotalNumber = totalDoc.data().totalNumber - 1;
        transaction.update(totalRef, { totalNumber: newTotalNumber });

        const newDivisionNumber = numberDoc.data().totalNumber - 1;
        transaction.update(numberRef, { totalNumber: newDivisionNumber });
      });

      setModalContent({
        result: true,
        title: "등록삭제 성공",
        subtitle: "성공적으로 삭제 하였습니다",
        plateNumber: fullPlateNumber 
      })

      reset({
        owner: "",
        position: "",
        division: "none",
        plateFront: "",
        plateNumber: "",
        phoneNumber: ""
      })
      router.push('vehicle-list')
    } catch (e) {
      console.log("Transaction failed: ", e);
      setModalContent({
        result: false,
        title: "등록삭제 실패",
        subtitle: "삭제 하는데 실패하였습니다",
        plateNumber: fullPlateNumber,
        errorMessage: "실패이유 : 서버에서 업데이트하지 못했습니다."
      })
    }
    setOpen(true)
  }

  return (
    <Container>
      <Navbar />
      <Logo />
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdateForm register={register} errors={errors} onDelete={onDelete} fullPlateNumber={userInfo.plateFront + " " + userInfo.plateNumber}/>
      </form>
      {open && <SuccessModal closeModal={closeModal} content={modalContent}/>}
    </Container>
  )
}

export const getServerSideProps= (context)=> {
  if (context.query.userInfo && typeof context.query.userInfo === 'string') {
    return {
      props: { 
         userInfo: JSON.parse(context.query.userInfo)
      }
    }
  }

  return {
    props: {}
  }
  
}