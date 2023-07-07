import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar({ currentUser }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    const getStoredTheme = () => localStorage.getItem("theme");
    const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
    const getPreferredTheme = () =>
      getStoredTheme() ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const setTheme = (theme) => {
      if (theme === "auto") {
        const preferredTheme = getPreferredTheme();
        document.documentElement.setAttribute(
          "data-bs-theme",
          preferredTheme
        );
        setStoredTheme(preferredTheme);
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
        setStoredTheme(theme);
      }
    };
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector(
        "#dropdownMenuButtonLight"
      );

      if (!themeSwitcher) {
        return;
      }

      const activeThemeOption = document.querySelector(
        `[data-bs-theme-value="${theme}"]`
      );

      if (!activeThemeOption) {
        return;
      }

      document
        .querySelectorAll("[data-bs-theme-value]")
        .forEach((element) => {
          element.classList.remove("active");
          element.setAttribute("aria-pressed", "false");
        });

      activeThemeOption.classList.add("active");
      activeThemeOption.setAttribute("aria-pressed", "true");

      const themeSwitcherLabel = `${activeThemeOption.textContent} mode`;
      themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

      if (focus) {
        themeSwitcher.focus();
      }
    };

    const handleThemeToggle = () => {
      const currentTheme = document.documentElement.getAttribute(
        "data-bs-theme"
      );
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      showActiveTheme(newTheme, true);
    };

    setTheme(getPreferredTheme());
    showActiveTheme(getPreferredTheme());

    document
      .querySelectorAll('[data-bs-theme-value]')
      .forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const theme = toggle.getAttribute("data-bs-theme-value");
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      });
  }, []);

  return (
     
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              alt=""
              src="/mass-coop-logo.png"
              width="150"
              height="75"
              className="d-inline-block align-top animated bounce slow"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/games">
                  Games
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/games/create">
                  Add Game
                </a>
              </li>
              {!isLoggedIn && (
                <React.Fragment>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">
                      Sign Up
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </React.Fragment>
              )}
              {isLoggedIn && <button onClick={logOutUser}>Logout</button>}
    
              <div className="dropdown" data-bs-theme="light">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButtonLight"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  🔅/🌙
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
                  <li>
                    <a className="dropdown-item active" href="#">
                      Dark mode
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Light mode
                    </a>
                  </li>
                </ul>
              </div>
    
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavBar;
