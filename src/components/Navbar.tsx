import Image from "next/image"
import Link from "next/link"

import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar shadow shadow-lg shadow-inner">
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
      <div className="navbar-right">
        <ul className="nav-links font-semibold">
          <li>
            <Link href="/form-demo">Form Demo</Link>
          </li>
          <li>
            <Link href="/log-parser">Log Parsing Demo</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar