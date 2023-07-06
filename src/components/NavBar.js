import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()

function NavBar({ currentUser }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
    <Navbar.Brand href="#home"> <img
              alt=""
              src="/mass-coop-logo.png"
              width="150"
              height="74"
              className="d-inline-block align-top"
            />{' '}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
    <Nav.Link href="/">
        Home
        </Nav.Link>

        <Nav.Link href="/games"> 
        Games
        </Nav.Link>

        <Nav.Link href="/games/create"> 
        Add Game
        </Nav.Link>

      {!isLoggedIn && (
        <>
         <Nav.Link href="/signup">
            {" "}
            Sign Up{" "}
            </Nav.Link>
          <Nav.Link href="/login">
            {" "}
            Login{" "}
            </Nav.Link>
          <span>{user && user.name}</span>
        </>
      )}

      {isLoggedIn && <button onClick={logOutUser}>Logout</button>}

      <div className="dropdown" data-bs-theme="light">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonLight" data-bs-toggle="dropdown" aria-expanded="false">
    🔅/🌙
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
    <li><a className="dropdown-item active" href="#">Dark mode</a></li>
    <li><a className="dropdown-item" href="#">Light mode</a></li>
  
  </ul>
</div>
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
