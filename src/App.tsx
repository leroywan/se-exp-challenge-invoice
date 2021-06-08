import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";

function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.App}>
      <div className={styles.SideBar}>
        <div className={styles.Logo} />
      </div>
      <div className={styles.Body}>
        <h1 className={styles.Heading}>{t("heading")}</h1>
      </div>
    </div>
  );
}

export default App;
