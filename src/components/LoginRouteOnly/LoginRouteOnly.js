import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LoginRouteOnly = ({children}) => {
    const {isLoggedIn} = useSelector(state=>state.auth)
        if(isLoggedIn){
            return children
        }
        return <><h1>You are not logged in user , Please login  </h1>
                <h3>Permission is denied</h3>
                <hr />
               <button>
               <Link to={"/login"}>Go back to login</Link>
               </button>
        </>
}

export default LoginRouteOnly
