import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";
import logo from "../assets/Logo2.png";

//Register functional component
const Register = () => {

  // Access toast and registerUser function from respective contexts
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

    // State to manage form input values
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

    // Handler function to update input values in state
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate input fields
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

        // Validate email format
    if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

        // Validate password length
    if (credentials.password.length <= 6) {
      toast.error("Password should be more than 6 characters!");
      return;
    }

    //check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match");
      return;
    }
    // Prepare user data for registration
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  // Export the Register component as the default export
  return (
    <div className="container p-4">
      <form
        className="mx-auto p-5 m-5 border border-light-subtle rounded shadow w-50"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <img
            className="mb-4"
            src={logo}
            alt="Logo"
            style={{ maxWidth: "150px" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label">
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
        <div className="form-group">
          <label htmlFor="confirmPasswordInput" className="form-label mt-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPasswordInput"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn mt-4 text-white w-25"
            style={{ backgroundColor: "#0455bf" }}
          >
            Register
          </button>
        </div>
        <p className="text-center mt-3">
          Already have an account ?{" "}
          <Link to="/login" style={{ color: "#0455bf" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

// Export the Register component as the default export
export default Register;
