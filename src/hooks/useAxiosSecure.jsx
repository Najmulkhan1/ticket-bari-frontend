import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosSecure = axios.create({
  baseURL: 'https://ticket-bari-backend.onrender.com'
})

const useAxiosSecure = () => {

  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // intercept response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const statusCode = error.response.status
        if (statusCode === 401 || statusCode === 403) {
          logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [user?.accessToken, logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure