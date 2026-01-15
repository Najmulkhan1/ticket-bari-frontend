import axios from 'axios'
import React from 'react'

const axiosInstance = axios.create({
    // baseURL: 'https://ticket-bari-backend.onrender.com'
    baseURL: 'http://localhost:3000/'
})

const useAxios = () => {
  return axiosInstance
}

export default useAxios