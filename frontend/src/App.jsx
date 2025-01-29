import Home from "./components/Home"
import Footer from "./components/Footer"
import Navbar from "./components/navbar"

function App() {

  return (
    <div className="relative bg-black w-full h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
