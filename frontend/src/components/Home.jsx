import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from '../home/Devotional'
import Creators from '../home/Creators'
import Contact from '../pages/Contact'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Devotional/>
      <Creators/>
      <Contact/>
    </div>
  )
}

export default Home