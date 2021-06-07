import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";

interface AppProps {
  color: string;
  testString?: string;
}

function App({ color, testString }: AppProps) {
  const { t } = useTranslation();

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
        <p>Test translation: {t("welcome", { name: testString })}</p>
      </header>
    </div>
  );
}

export default App;
