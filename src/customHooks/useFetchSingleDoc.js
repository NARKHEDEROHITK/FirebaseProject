import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import { db } from '../firebase/config'

const useFetchSingleDoc = (id , collectionName) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getSingleDoc = async () => {
        try {
          setIsLoading(true)
          const docRef = doc(db, collectionName , id);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData({...docSnap.data() , id: docSnap.id})
            setIsLoading(false)
          } else {
            toast.error("There is no document avaialable")
            setIsLoading(true)
          }
        } catch (error) {
          setIsError(false)
          setIsLoading(false)
          toast.error(error.message)
        }
      }

      useEffect(() => {
        getSingleDoc()
      }, [])

  return{isError,isLoading,data}
}

export default useFetchSingleDoc