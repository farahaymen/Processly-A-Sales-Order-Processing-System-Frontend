import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../store/authContext";
import TextInput from "../../UI/form/TextInput";
import OrdersList from "../../components/orders/OrdersList";

const StUpdateOrderStatus = () => {
  const authContext = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [orders, setOrders] = useState([]);

  const submitHandler = async (formData) => {
    try {
      if (formData["email"] === "") {
        formData["email"] = "all";
      }
      const response = await fetch(
        `https://processly.azurewebsites.net/orders?email=${formData["email"]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.error);
      }
      console.log(data);
      setOrders(data.orders);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
        // shows toast which is housed by the container ToastContainer in App.js
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="view-all-orders">
      <div className="row-center-content">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          <TextInput
            label="Email"
            type="text"
            name="email"
            register={register}
            validation={{ required: false }}
          />

          <button type="submit" className="form-button">
            View Orders
          </button>
        </form>
      </div>
      <div className="bottom">
        <div>
          <OrdersList className="grid" orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default StUpdateOrderStatus;
