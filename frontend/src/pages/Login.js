import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import logo from "../assets/Logo2.png";

//Login functional component
const Login = () => {
    // Access loginUser function and toast from respective contexts
  const { loginUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

    // State to manage form input values
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

    // Handler function to submit login form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all the required fields!");
      return;
    }

        // Call loginUser function from AuthContext to authenticate user
    loginUser(credentials);
  };

//render login component
  return (
    <div className="container  p-4">
      <form
        className="mx-auto p-5 m-5  border border-light-subtle rounded shadow w-50 "
        onSubmit={handleSubmit}
      >
        <div className="text-center  ">
          <img
            className="mb-4"
            src={logo}
            alt="Logo"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label ">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center ">
          <button
            type="submit"
            className="btn  mt-5 text-white w-25"
            style={{ backgroundColor: "#0455bf" }}
          >
            Login
          </button>
        </div>
        <p>
          Don't have an account ?{" "}
          <Link to="/register" style={{ textDecoration: "#0455bf" }}>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};
// Export the Login component as the default export
export default Login;
