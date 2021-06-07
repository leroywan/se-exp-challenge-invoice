import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";

interface AppProps {
  color: string;
  testString?: string;
}

function App({ color, testString }: AppProps) {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p style={{ color: color }}>Hello {testString}!</p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn react
        </a>
      </header>
    </div>
  );
}

export default App;
