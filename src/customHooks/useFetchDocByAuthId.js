import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchDocByAuthId = (authId, collectionName) => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [isError , setisError ] = useState(false)
    
    const getDocById = async () => {
        setisLoading(true)
       try {
        console.log(authId , collectionName)
        const q = query(collection(db, collectionName), where("userId", "==", authId));
        const querySnapshot = await getDocs(q);
        let alldocs = []
        querySnapshot.forEach((doc) => {
            alldocs.push({ Id: doc.id, ...doc.data() })
        });
        setData(alldocs)
        setisLoading(false)
       
       } catch (error) {
            toast.error(error.message)
            setisLoading(false)
            setisError(true)
       }
    }

    useEffect(() => {
        getDocById()
    }, [])

    return {data , isLoading , isError}


}

export default useFetchDocByAuthId
