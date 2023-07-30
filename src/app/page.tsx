// COMPONENTS
import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TopCryptos from '@/components/TopCryptos'

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />

      <div className="w-full h-[225px]  bg-[url('/images/wave.svg')]" />

      <About />

      <TopCryptos />

      <Footer />
    </div>
  )
}
