import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

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

type Channels = "website" | "email" | "phone" | "word-of-mouth" | "other";
interface Customer {
  id: number;
  name: string;
  email: string;
  channel: Channels;
  address: string;
  postal: string;
  city: string;
  province: string;
  country: string;
}

interface GetCustomerResponse {
  customers: Customer[];
}

interface CustomerRowProps {
  name: Customer["name"];
  email: Customer["email"];
  editCustomer?: () => void;
}

interface FormInputs {
  name: string;
  email: string;
  channel: Channels;
  address: string;
  postal: string;
  city: string;
  province: string;
}

const CustomerRow = ({ name, email, editCustomer }: CustomerRowProps) => (
  <div className={styles.CustomerRow}>
    <div className={styles.CustomerRowItem}>{name}</div>
    <div className={styles.CustomerRowItem}>{email}</div>
    <div className={styles.CustomerRowItem}>
      <button onClick={editCustomer}>edit</button>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

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

  const onSubmit = (data: any) => console.log(data);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEditCustomer = ({
    name,
    email,
    channel,
    address,
    postal,
    city,
    province,
  }: Customer) => {
    function callback() {
      reset({ name, email, channel, address, postal, city, province });
      openModal();
    }
    return callback;
  };

  const customersMarkup = !isLoading ? (
    customers.map((customer) => (
      <CustomerRow
        key={customer.id}
        name={customer.name}
        email={customer.email}
        editCustomer={handleEditCustomer({ ...customer })}
      />
    ))
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
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Test Modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name", { required: true })} />
          <input {...register("email", { required: true })} />
          <input {...register("channel", { required: true })} />
          <input {...register("address", { required: true })} />
          <input {...register("postal", { required: true })} />
          <input {...register("city", { required: true })} />
          <input {...register("province", { required: true })} />
          {errors.name && <span>This field is required</span>}
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
}

export default App;
