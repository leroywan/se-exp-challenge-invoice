import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  email: string;
  channel: string;
  address: string;
  postal: string;
  city: string;
  province: string;
  country: string;
}

interface GetCustomerResponse {
  customers: Customer[];
}

function App() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [customers, setCustomers] = React.useState<Customer[]>([]);

  React.useEffect(() => {
    const getCustomers = async () => {
      const response = await axios.get<GetCustomerResponse>(
        "https://rawgit.com/wvchallenges/se-exp-challenge-invoice/master/settings.json"
      );

      setCustomers(response.data.customers);
      setIsLoading(false);
    };
    getCustomers();
  }, []);

  const customersMarkup = !isLoading ? (
    customers.map((customer) => <li key={customer.id}>{customer.name}</li>)
  ) : (
    <p>loading...</p>
  );

  return (
    <div className={styles.App}>
      <div className={styles.SideBar}>
        <div className={styles.Logo} />
      </div>
      <div className={styles.Body}>
        <h1 className={styles.Heading}>{t("heading")}</h1>
        {customersMarkup}
      </div>
    </div>
  );
}

export default App;
