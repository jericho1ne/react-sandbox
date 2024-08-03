import Image from "next/image"

import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left shrink-0">
        <a href="/" className="logo">
          <Image
            className="relative"
            src="/toolbox.svg"
            alt="Toolbox Logo"
            width={60}
            height={60}
            priority
          />
        </a>
      </div>
      <div className="navbar-right  shadow shadow-md shadow-inner">
        <ul className="nav-links">
          <li>
            <a href="/form-demo">Form Demo</a>
          </li>
          <li>
            <a href="/log-parser">Log Parsing Demo</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar