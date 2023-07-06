import { useEffect, useContext } from "react";
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
    <Navbar expand="lg" className="custom-nav bg-dark border border-light border-2 rounded">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/mass-coop.png"
            width="250"
            height="150"
            className="d-inline-block align-top animated bounce slow"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/games">Games</Nav.Link>
            <Nav.Link href="/games/create">Add Game</Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
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
