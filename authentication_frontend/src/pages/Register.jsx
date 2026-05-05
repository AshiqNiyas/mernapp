import { useState } from "react";
import { registerUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formdata));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onInput={handleInput}
          name="username"
          value={formdata.username}
          type="text"
          placeholder="username"
        />
        <input
          onInput={handleInput}
          name="email"
          value={formdata.email}
          type="email"
          placeholder="email"
        />
        <input
          onInput={handleInput}
          name="password"
          value={formdata.password}
          type="password"
          placeholder="password"
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
