import React from 'react'
import { useSearchParams } from 'react-router'

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('sessionId')
    const bookingId = searchParams.get('bookingId')
  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess