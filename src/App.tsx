import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";
import Modal from "react-modal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

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

interface CustomerListProps {
  customers: Customer[];
}

interface CustomerRowProps {
  name: Customer["name"];
  email: Customer["email"];
  edit?: React.ReactElement;
  isHeader?: Boolean;
}

const CustomerRow = ({ name, email, edit, isHeader }: CustomerRowProps) => (
  <div
    className={`${styles.CustomerRow} ${isHeader && styles.CustomerRowBold}`}
  >
    <div className={styles.CustomerRowItem}>{name}</div>
    <div className={styles.CustomerRowItem}>{email}</div>
    <div className={styles.CustomerRowItem}>{edit}</div>
  </div>
);

const CustomerList = ({ customers }: CustomerListProps) => (
  <div className={styles.CustomerList}>
    <CustomerRow name="Name" email="Email" isHeader />
    {customers.map((customer) => (
      <CustomerRow
        key={customer.id}
        name={customer.name}
        email={customer.email}
        edit={(() => (
          <button>Edit</button>
        ))()}
      />
    ))}
  </div>
);

function App() {
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { t } = useTranslation();

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
    <CustomerList customers={customers} />
  ) : (
    <p>loading...</p>
  );

  return (
    <>
      <div className={styles.App}>
        <div className={styles.SideBar}>
          <div className={styles.Logo} />
        </div>
        <div className={styles.Body}>
          <h1 className={styles.Heading}>{t("heading")}</h1>
          {customersMarkup}
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            test modal
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        style={modalStyles}
        contentLabel="Test Modal"
      >
        <form>
          <input />
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("customer info goes here...");
            }}
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}

export default App;
