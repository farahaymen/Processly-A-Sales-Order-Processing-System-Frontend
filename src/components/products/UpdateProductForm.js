import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";
import SelectInput from "./../../UI/form/SelectInput";

const UpdateProductForm = (props) => {
  const [price, setPrice] = useState(10);
  const { register, handleSubmit, formState } = useForm();
  const authContext = useContext(AuthContext);
  const [changeType, setChangeType] = useState("Update");

  const onCtChange = (e) => {
    let idx = e.target.selectedIndex;
    let ctTmp = e.target.options[idx].text;
    setChangeType(ctTmp);
  };

  const onPChange = (e) => {
    let p = parseInt(e.target.value);
    if (isNaN(p) || p < 10) {
      p = 10;
    } else if (p > 2000) {
      p = 2000;
    }
    setPrice(p);
    return;
  };

  const submitHandler = async (formData) => {
    try {
      console.log("from UpdateProductForm.js");
      console.log(formData);
      let methodTmp = changeType === "Update" ? "PUT" : "DELETE";
      const response = await fetch(
        "https://processly.azurewebsites.net/products",
        {
          method: methodTmp,
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.error);
      }
      console.log("From UpdateProductForm:", data);

      toast.success("Product updated successfully! 💪", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
      toast.error("Empty/Invalid Fields or Product does not exist", {
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
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-top">
        <div className="form-left" style={{ rowGap: "20px" }}>
          <TextInput
            label="Product Name"
            name="name"
            register={register}
            required={true}
          />
          {formState.errors.name && (
            <FormInputError>Product name must not be empty.</FormInputError>
          )}

          {changeType === "Update" && (
            <TextInput
              label="Price"
              type="number"
              name="price"
              value={price}
              register={register}
              validation={{ required: true, onChange: onPChange }}
            />
          )}
          {formState.errors.price && (
            <FormInputError>Product price must be stated</FormInputError>
          )}

          {changeType === "Update" && (
            <TextInput
              label="Product Sizes (separated by ', ')"
              name="sizes"
              register={register}
              required={false}
            />
          )}
        </div>

        <div className="form-right">
          {changeType === "Update" && (
            <TextInput
              label="Product Image URL"
              name="imgUrl"
              register={register}
              required={true}
            />
          )}
        </div>
      </div>

      <div className="form-bottom">
        <SelectInput
          label="Type of Modification"
          name="changeType"
          register={register}
          required={true}
          options={["Update", "Delete"]}
          onChange={onCtChange}
        />

        <button type="submit" className="form-button">
          {changeType} Product
        </button>
      </div>
    </form>
  );
};

export default UpdateProductForm;
