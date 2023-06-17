import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/authContext";
import FormInputError from "../../UI/form/FormInputError";
import TextInput from "../../UI/form/TextInput";
import SelectInput from "../../UI/form/SelectInput";

const SignupForm = () => {
  const { register, handleSubmit, setError, formState } = useForm();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const whLocs = ["Cairo", "Giza", "Alexandria", "Luxor", "Aswan"];

  const isValidEmail = (email) => {
    return email.match(/\S+@\S+\.\S+/);
  };
  const onEmailChange = (event) => {
    let emailTmp = event.target.value;
    setEmail(emailTmp); // even though "email" state is not used", "it is written as setEmail() will cause a re-render
    if (!isValidEmail(emailTmp)) {
      setError("email", {
        type: "custom",
        message: "Please enter a valid email.",
      });
    } else {
      setError("email", null);
    }
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };
  const onPasswordChange = (event) => {
    let passwordTmp = event.target.value;
    setPassword(passwordTmp);
    if (!isValidPassword(password)) {
      setError("password", {
        type: "custom",
        message: "Please enter at least 8 characters.",
      });
    } else {
      setError("password", null);
    }
  };

  const submitHandler = async (formData) => {
    try {
      if (location.pathname.includes("st/")) {
        formData["role"] = "st";
      } else if (location.pathname.includes("wh/")) {
        formData["role"] = "wh";
      } else {
        formData["role"] = "client";
      }

      const response = await fetch(
        "https://processly.azurewebsites.net/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.error);
      }

      console.log(data);
      toast.success("Signed up successfully! 💪", {
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

      // invoke the login function in our auth context
      authContext.login(
        data.userId,
        data.name,
        data.email,
        data.role,
        data.token
      );

      navigate("/");
    } catch (err) {
      console.log(err);
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
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <TextInput
        label="Name"
        type="text"
        name="name"
        register={register}
        validation={{ required: true }}
      />
      {formState.errors.name && (
        <FormInputError>Name must not be empty</FormInputError>
      )}

      <TextInput
        label="Address"
        name="address"
        register={register}
        required={true}
      />

      <TextInput
        label="Email"
        type="text"
        name="email"
        register={register}
        validation={{ required: true, onChange: onEmailChange }}
      />
      {formState.errors.email?.message && (
        <FormInputError>{formState.errors.email?.message}</FormInputError>
      )}

      <TextInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validation={{ required: true, onChange: onPasswordChange }}
      />
      {formState.errors.password?.message && (
        <FormInputError>{formState.errors.password?.message}</FormInputError>
      )}

      <button type="submit" className="form-button">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
