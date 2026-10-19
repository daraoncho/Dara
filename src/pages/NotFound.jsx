import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import app from "../styles/Navbar.module.css";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Dara";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar enableGame={false} />
      <main className={`${app.content_wrapper} ${styles.main}`}>
        <div className={styles.inner}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.message}>
            maybe it was never built, or it wandered off.
          </p>
          <Link to="/" className={styles.homeLink}>
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
