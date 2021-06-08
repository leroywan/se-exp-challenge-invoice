import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";

interface Customers {
  id: string;
  name: string;
}

function App() {
  const { t } = useTranslation();
  const [customers, setCustomers] = React.useState<Customers[]>();

  React.useEffect(() => {
    const getCustomers = async () => {
      const { data } = await axios.get(
        "https://rawgit.com/wvchallenges/se-exp-challenge-invoice/master/settings.json"
      );

      setCustomers(data.customers);
    };
    getCustomers();
  }, []);

  if (!customers) {
    return null;
  }

  return (
    <div className={styles.App}>
      <div className={styles.SideBar}>
        <div className={styles.Logo} />
      </div>
      <div className={styles.Body}>
        <h1 className={styles.Heading}>{t("heading")}</h1>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </div>
    </div>
  );
}

export default App;
