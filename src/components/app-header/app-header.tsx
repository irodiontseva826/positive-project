import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__brand}>
        <div className={styles.logo}></div>
        <h2>Practice app</h2>
      </div>
      <nav className={styles.menu}>
        <NavLink to="/projects">
          <p>Projects</p>
        </NavLink>
        <NavLink to="/templates">
          <p>Templates</p>
        </NavLink>
        <NavLink to="/other">
          <p>Other</p>
        </NavLink>
      </nav>
    </header>
  );
};
