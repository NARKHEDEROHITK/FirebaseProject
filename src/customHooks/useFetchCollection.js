import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/config"
import { toast } from "react-toastify"

const UseFetchCollection = (collectionName) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const getAllRecords = () => {
        setIsLoading(true)
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
        onSnapshot(
            q,
            (snapshot) => {
                const products = snapshot.docs.map((doc) => {
                    setIsLoading(false)
                    return { id: doc.id, ...doc.data() }
                })
                setData(products)
            },
            (error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    useEffect(() => {
        getAllRecords()
    }, [])


    return {data , isLoading}
}

export default UseFetchCollection
