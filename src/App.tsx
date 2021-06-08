import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data: any) => {
    console.log(data);
    closeModal();
  };
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
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            minWidth: "460px",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Edit Customer Modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.ModalTitle}>{t("editCustomerModalTitle")}</h2>
          <div className={styles.FormGroup}>
            <div className={styles.InputItem}>
              <label htmlFor="name">{t("editCustomerModalName")}</label>
              <input id="name" {...register("name", { required: true })} />
              {errors.name && <span>{t("requiredFieldError")}</span>}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="email">{t("editCustomerModalEmail")}</label>
              <input id="email" {...register("email", { required: true })} />
              {errors.email && <span>{t("requiredFieldError")}</span>}
            </div>
          </div>
          <div className={styles.FormGroup}>
            <div className={styles.InputItem}>
              <label htmlFor="channel">{t("editCustomerModalChannel")}</label>
              <input
                id="channel"
                {...register("channel", { required: true })}
              />
              {errors.channel && <span>{t("requiredFieldError")}</span>}
            </div>
          </div>
          <div className={styles.FormGroup}>
            <div className={styles.InputItem}>
              <label htmlFor="address">{t("editCustomerModalAddress")}</label>
              <input
                id="address"
                {...register("address", { required: true })}
              />
              {errors.address && <span>{t("requiredFieldError")}</span>}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="postal">{t("editCustomerModalPostal")}</label>
              <input id="postal" {...register("postal", { required: true })} />
              {errors.postal && <span>{t("requiredFieldError")}</span>}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="city">{t("editCustomerModalCity")}</label>
              <input id="city" {...register("city", { required: true })} />
              {errors.city && <span>{t("requiredFieldError")}</span>}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="province">{t("editCustomerModalProvince")}</label>
              <input
                id="province"
                {...register("province", { required: true })}
              />
              {errors.province && <span>{t("requiredFieldError")}</span>}
            </div>
          </div>
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
}

export default App;
