import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminRouteOnly = ({children}) => {
    const {email} = useSelector(state=>state.auth)
        if(email === 'rohit@gmail.com'){
            return children
        }
        return <><h1>You are not admin user </h1>
                <h3>Permission is denied</h3>
                <hr />
               <button>
               <Link to={"/home"}>Go back to Home</Link>
               </button>
        </>
}

export const AdminRouteLink = ({children}) => {
    const {email} = useSelector(state=>state.auth)
        if(email === 'rohit@gmail.com'){
            return children
        }
        return null
}

export default AdminRouteOnly
