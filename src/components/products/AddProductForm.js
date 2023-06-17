import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";

const AddProductForm = (props) => {
  const [price, setPrice] = useState(10);
  const { register, handleSubmit, formState } = useForm();
  const authContext = useContext(AuthContext);

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
      console.log("from AddProductForm.js");
      console.log(formData);

      const response = await fetch(
        "https://processly.azurewebsites.net/products",
        {
          method: "POST",
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
      console.log(data);

      toast.success("Product added successfully! 💪", {
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
      toast.error("Empty/Invalid Fields", {
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

          <TextInput
            label="Price"
            type="number"
            name="price"
            value={price}
            register={register}
            validation={{ required: true, onChange: onPChange }}
          />
          {formState.errors.price && (
            <FormInputError>Product price must be stated</FormInputError>
          )}

          <TextInput
            label="Product Sizes (separated by ', ')"
            name="sizes"
            register={register}
            required={false}
          />
        </div>

        <div className="form-right">
          <TextInput
            label="Product Image URL"
            name="imgUrl"
            register={register}
            required={true}
          />
        </div>
      </div>

      <div className="form-bottom">
        <button type="submit" className="form-button">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
