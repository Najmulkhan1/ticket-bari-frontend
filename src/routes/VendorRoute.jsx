import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'

const VendorRoute = ({children}) => {

    const {loading, user} = useAuth()
    const {role, roleLoading} = useRole()

    if(loading || !user || roleLoading){
        return <h1>Loading...</h1>
    }

    if(role !== 'vendor'){
        return <h1>You are not authorized to access this page</h1>
    }

  return children
}

export default VendorRoute