import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

  const {user, logOut} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {

  },[])

  return axiosSecure
}

export default useAxiosSecure