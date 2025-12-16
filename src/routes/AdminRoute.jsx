import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'

const AdminRoute = ({children}) => {

    const {loading, user} = useAuth()
    const {role, roleLoading} = useRole()

    if(loading || !user || roleLoading){
        return <h1>Loading...</h1>
    }

    if(role !== 'admin'){
        return <h1>You are not authorized to access this page</h1>
    }

  return children
}

export default AdminRoute