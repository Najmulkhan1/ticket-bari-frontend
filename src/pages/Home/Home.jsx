import React from 'react'
import Hero from '../../components/Home/Hero'
import AdvertisementSection from '../../components/Home/AdvertisementSection'
import LatestTickets from '../../components/Home/LatestTicketsSection'
import PopularRoutes from '../../components/Home/PopularRoutes'
import WhyChooseUs from '../../components/Home/WhyChooseUs'
import Statistics from '../../components/Home/Statistics'
import Testimonials from '../../components/Home/Testimonials'
import Blogs from '../../components/Home/Blogs'

function Home() {
  return (
    <div>
      <Hero />
      <AdvertisementSection />
      <LatestTickets />
      <PopularRoutes />
      <Statistics />
      <WhyChooseUs />
      <Testimonials />
      <Blogs />
    </div>
  )
}

export default Home