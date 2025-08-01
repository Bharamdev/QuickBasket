import Topbar from "../Layout/Topbar"
import Navbar from "./navbar"

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* TopBar */}
      <Topbar/>
      {/* navbar */}
      <Navbar/>
      {/* Cart Drawer  */}
    </header>
  )
}

export default Header
