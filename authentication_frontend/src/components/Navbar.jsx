import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  return (
    <div>
      {token ? (
        <>
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"}>Login page</Link>{" "}
          <Link to={"/register"}>Register</Link>{" "}
        </>
      )}
    </div>
  );
};

export default Navbar;
