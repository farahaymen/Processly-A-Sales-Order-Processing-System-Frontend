import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../store/authContext";
import TextAreaInput from "../../UI/form/TextAreaInput";
import GetDate from "./../utils/GetDate";
import GetTime from "./../utils/GetTime";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrderDetailsForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useForm();
  const authContext = useContext(AuthContext);
  console.log(authContext);
  let order;
  if (props.order) {
    // passed from OrderDetailsPage.js
    order = props.order;
  } else {
    order = location.state; // getting the order object from OrderSummary.js
  }
  const [dn, setDn] = useState(
    "deliveryNote" in order ? order.deliveryNote : ""
  );

  const onDnChange = (e) => {
    let dnTmp = e.target.value;
    setDn(dnTmp);
  };

  const onOrderChange = async (task) => {
    // updates order based on delivery note or cancellation
    try {
      let statusTmp = "";
      let dnTmp = dn;
      if (task !== "update") {
        // then either p.o.v of st, or client that chose to cancel order
        statusTmp = task;
      } else {
        // then p.o.v of client that chose to update order
        statusTmp = order.status;
      }
      const response = await fetch(
        `https://processly.azurewebsites.net/orders?orderId=${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
          body: JSON.stringify({ deliveryNote: dnTmp, status: statusTmp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log("from OrderDetailsForm.js:");
      console.log(data);
      toast.success("Order updated successfully! 💪", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (location.pathname.includes("st/")) {
        navigate("/st");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
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

  const restOfBottomContent = () => {
    if (order.status !== "delivered" && order.status !== "cancelled") {
      if (location.pathname.includes("st/")) {
        // we're accessing the order details from a sales team p.o.v
        return (
          <>
            <label className="form-sublabel center-label">
              Delivery Note: {dn}
            </label>
            <div className="order-details-buttons">
              <button
                type="submit"
                className="form-button"
                onClick={() =>
                  onOrderChange(
                    order.status !== "en route" ? "en route" : "pending"
                  )
                }
              >
                {order.status !== "en route" ? "en route" : "pending"}
              </button>

              <button
                type="submit"
                className="form-button"
                onClick={() => onOrderChange("delivered")}
              >
                delivered
              </button>

              <button
                type="submit"
                className="form-button"
                onClick={() => onOrderChange("cancelled")}
              >
                cancelled
              </button>
            </div>
          </>
        );
      }
      return (
        // we're accessing the order details from a client p.o.v
        <>
          <TextAreaInput
            label="Delivery Note"
            name="deliveryNote"
            centerLabel={false}
            value={dn}
            onChange={onDnChange}
            register={register}
          />

          <div className="order-details-buttons">
            {"deliveryNote" in order && order.deliveryNote !== dn && (
              <button
                type="submit"
                className="form-button"
                onClick={() => onOrderChange("update")}
              >
                Update Order
              </button>
            )}

            <button
              type="submit"
              className="form-button"
              onClick={() => onOrderChange("cancelled")}
            >
              Cancel Order
            </button>
          </div>
        </>
      );
    } // create a static delivery note field (label) if order is delivered
    return (
      <>
        <label className="form-sublabel center-label">
          Delivery Note: {dn}
        </label>
      </>
    );
  };

  return (
    <form className="form">
      <div className="form-top">
        <div className="form-left">
          <div className="form-label-and-sublabel-col">
            <label className="form-label center-label">Product Name</label>
            <label className="form-sublabel center-label">
              {order.productId.name}
            </label>
          </div>

          <div className="form-label-and-sublabel-col">
            <label className="form-label center-label"> Quantity</label>
            <label className="form-sublabel center-label">
              {order.quantity}
            </label>
          </div>

          {"size" in order && (
            <div className="form-label-and-sublabel-col">
              <label className="form-label center-label">Chosen Size</label>
              <label className="form-sublabel center-label">{order.size}</label>
            </div>
          )}
        </div>
        <div className="form-right">
          <img
            src={order.productId.imgUrl}
            alt={order.productId.name}
            width="300"
            className="product-img"
          />
        </div>
      </div>
      <div className="form-bottom">
        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Order ID:</label>
          <label className="form-sublabel center-label">{order._id}</label>
        </div>

        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Creation Date:</label>
          <label className="form-sublabel center-label">
            {GetDate(order.createdAt)},{GetTime(order.createdAt).toLowerCase()}
          </label>
        </div>

        <label
          name="totalPrice"
          className="form-label center-label"
        >{`Total Price: ${order.totalPrice} EGP`}</label>

        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Status:</label>
          <label
            className="form-sublabel center-label"
            style={{
              color:
                order.status === "delivered"
                  ? "#15E915"
                  : order.status === "cancelled"
                  ? "#F81D1D"
                  : "white",
              fontWeight: "700",
            }}
          >
            {order.status}
          </label>
        </div>

        {restOfBottomContent()}
      </div>
    </form>
  );
};

export default OrderDetailsForm;
