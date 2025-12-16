import React from 'react'
import Hero from '../../components/Home/Hero'
import AdvertisementSection from '../../components/Home/AdvertisementSection'
import LatestTickets from '../../components/Home/LatestTicketsSection'
import PopularRoutes from '../../components/Home/PopularRoutes'
import WhyChooseUs from '../../components/Home/WhyChooseUs'

function Home() {
  return (
    <div>
      <Hero />
      <AdvertisementSection />
      <LatestTickets />
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  )
}

export default Home