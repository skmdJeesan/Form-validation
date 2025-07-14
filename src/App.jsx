import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import UserCard from "./Components/UserCard";

const App = () => {

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");

  const [formData, setFormData] = useState({
    name: '', email: '', pass: '', confirmPass: '',
  })

  const handleChange = (e) => {
    const {name,value} = e.target 
    setFormData((prevData) => ({...prevData,[name]:value}))
  }

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.pass.length < 8) {
      setError("password must contain 8 characters");
      return;
    }
    if (formData.pass != formData.confirmPass) {
      setError("confirm password is not matched!");
      return;
    }
    if (!/[A-Z]/.test(formData.pass)) {
      setError("password must contain a capital letter");
      return;
    }
    if (!/[!@#$%^&*]/.test(formData.pass)) {
      setError("password must contain a special character");
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,{
        name: formData.name,
        email: formData.email,
        pass: formData.pass
      }
    ])
    
    setError("");
    setFormData({name: '', email: '', pass: '', confirmPass: '',})
    toast.success("Login successful ✅", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>

      <div className="main flex items-center justify-center h-screen w-full">
        <div className="form-container bg-white h-[60vh] w-96 rounded-lg flex flex-col justify-center gap-2 px-8">
          <h1 className="text-2xl font-bold text-center mb-4">
            Create an Account
          </h1>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-2"
          >
            <input
              required
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-md border-1 rounded-full text-black"
            />
            <input
              required
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-md border-1 rounded-full text-black"
            />
            <input
              required
              type="password"
              placeholder="Enter Password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="w-full p-2 text-md border-1 rounded-full text-black"
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleChange}
              className="w-full p-2 text-md border-1 rounded-full text-black"
            />
            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}
            <button className="w-full text-white p-2 rounded-xl mt-3 cursor-pointer">
              Submit
            </button>
            <ToastContainer />
          </form>
          <p className="text-md text-center mt-4 leading-[1.1]">
            By registering, you agree to our <span>terms & condition</span> and{" "}
            <span>privacy policy</span>
          </p>
        </div>
      </div>

      <div className="w-full flex gap-5 flex-wrap p-5">
        {users.map((user,i) => {
          return <UserCard user={user} key={i}/>
        })}
      </div>

    </>
  );
};

export default App;
