import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import styles from "./styles.module.css";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.navbar} data-menu-open={isMenuOpen ? "true" : "false"}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoText}>Hano.</span>
      </Link>
      <button
        type="button"
        className={styles.menuToggle}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div className={styles.menu}>
        <a href="/#work" className={styles.link} onClick={closeMenu}>Work</a>
        <a href="/#approach" className={styles.link} onClick={closeMenu}>Approach</a>
        <Link href="/cv" className={styles.link} onClick={closeMenu}>CV</Link>
        <a href="/#contact" className={styles.link} onClick={closeMenu}>Contact</a>
      </div>
    </nav>
  );
}
