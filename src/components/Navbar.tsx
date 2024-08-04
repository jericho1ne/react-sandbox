import Image from "next/image"
import Link from "next/link"

import './Navbar.scss'

const Navbar = () => {
  const navLinks = [
    { href: "/form-demo", label: "Form Demo" },
    { href: "/log-parser", label: "Log Parsing Demo" },
    { href: "/about", label: "About" },
  ]
  
  return (
    <nav className="navbar shadow shadow-lg shadow-inner px-4 sm:px-10 md:px-8 lg:px-12">
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
        {navLinks.map((item, idx) => (
          <Link
            className="nav-link rounded-md text-sky-700"
            key={idx}
            href={item.href}
          >
            <li>
              {item.label}
            </li>
          </Link>
        ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar