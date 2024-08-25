import { createContext, useContext, useEffect, useState } from "react";
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CommonContext = createContext();

export const CommonContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  return (
    <CommonContext.Provider
      value={{
        selectedCourseId,
        setSelectedCourseId,
        isEnrolled,
        setIsEnrolled,
        selectedCompanyId,
        setSelectedCompanyId,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
