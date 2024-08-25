import { useContext } from "react";
import Navbar from "./Navbar";
import AuthContext from "../context/AuthContext";
import Footer from "./Footer";

//layout functional component
const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  //Render layout component
  return (
    <>
      {user && (
        <div style={{ marginBottom: "100px" }}>
          <Navbar />
        </div>
      )}
      <div
        className="container "
        style={{ fontFamily: "poppins", marginBottom: "100px" }}
      >
        {children}
      </div>
      {user && (
        <div className="m-0">
          <Footer />
        </div>
      )}
    </>
  );
};
// Export the Layout component as the default export
export default Layout;
