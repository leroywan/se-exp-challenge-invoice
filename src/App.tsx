import React from "react";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import "./locales/i18n";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import i18n from "i18next";

import { classNames } from "./utils/classNames";

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
  bolded?: Boolean;
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

const CustomerRow = ({
  name,
  email,
  bolded,
  editCustomer,
}: CustomerRowProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        styles.CustomerRow,
        bolded && styles.CustomerRowBolded
      )}
    >
      <div className={styles.CustomerRowItem}>{name}</div>
      <div className={styles.CustomerRowItem}>{email}</div>
      <div className={styles.CustomerRowItem}>
        {editCustomer && (
          <button onClick={editCustomer}>{t("editButtonLabel")}</button>
        )}
      </div>
    </div>
  );
};

const MissingFieldError = () => {
  const { t } = useTranslation();
  return <span style={{ color: "red" }}>{t("requiredFieldError")}</span>;
};

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
      const customersApi =
        "https://rawgit.com/wvchallenges/se-exp-challenge-invoice/master/settings.json";
      const response = await axios.get<GetCustomerResponse>(customersApi);

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

  const languageButtons = (
    <div className={styles.LanguageButtons}>
      <button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        En
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage("fr");
        }}
      >
        Fr
      </button>
    </div>
  );

  return (
    <div>
      <div className={styles.App}>
        <div className={styles.SideBar}>
          <div className={styles.Logo} />
        </div>
        <div className={styles.Body}>
          <h1 className={styles.Heading}>{t("heading")}</h1>
          <CustomerRow
            name={t("editCustomerModalName")}
            email={t("editCustomerModalEmail")}
            bolded
          />
          {customersMarkup}
          {languageButtons}
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
              {errors.name && <MissingFieldError />}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="email">{t("editCustomerModalEmail")}</label>
              <input id="email" {...register("email", { required: true })} />
              {errors.email && <MissingFieldError />}
            </div>
          </div>
          <div className={styles.FormGroup}>
            <div className={styles.InputItem}>
              <label htmlFor="channel">{t("editCustomerModalChannel")}</label>
              <select id="channel" {...register("channel", { required: true })}>
                {["website", "email", "phone", "word-of-mouth", "other"].map(
                  (item) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </select>
              {errors.channel && <MissingFieldError />}
            </div>
          </div>
          <div className={styles.FormGroup}>
            <div className={styles.InputItem}>
              <label htmlFor="address">{t("editCustomerModalAddress")}</label>
              <input
                id="address"
                {...register("address", { required: true })}
              />
              {errors.address && <MissingFieldError />}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="postal">{t("editCustomerModalPostal")}</label>
              <input id="postal" {...register("postal", { required: true })} />
              {errors.postal && <MissingFieldError />}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="city">{t("editCustomerModalCity")}</label>
              <input id="city" {...register("city", { required: true })} />
              {errors.city && <MissingFieldError />}
            </div>
            <div className={styles.InputItem}>
              <label htmlFor="province">{t("editCustomerModalProvince")}</label>
              <input
                id="province"
                {...register("province", { required: true })}
              />
              {errors.province && <MissingFieldError />}
            </div>
          </div>
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default App;
