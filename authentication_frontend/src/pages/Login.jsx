import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);

  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formdata));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
