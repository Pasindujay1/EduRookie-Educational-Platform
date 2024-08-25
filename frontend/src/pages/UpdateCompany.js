import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import ToastContext from "../context/ToastContext";
import Loading from "../components/Loading";
import UploadWidget from "../components/UploadWidget";
import Delete from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const UpdateCompany = () => {
  const { selectedCompanyId } = useContext(CommonContext);
  const { toast } = useContext(ToastContext);
  const [company, setCompany] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCompany();
  }, [selectedCompanyId]);

  const getCompany = async () => {
    try {
      const companyId = localStorage.getItem("selectedCompanyId");
      const response = await fetch(
        `http://localhost:8001/company/getCompany/${companyId}`
      );
      const data = await response.json();
      console.log("🚀 ~ getCompany ~ data:", data);
      setCompany(data.company);
      setImage(data.company.logo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!company.name || !company.description || !company.status || !image) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8001/company/updateCompany/${selectedCompanyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: company.name,
            description: company.description,
            status: company.status,
            logo: image,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        toast("Company updated successfully", "success");
        setLoading(false);
        navigate("/companies");
      }
    } catch (error) {
      console.error("Error updating company", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleDeleteCompany = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/company/deleteCompany/${selectedCompanyId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        toast("Company deleted successfully", "success");
        setLoading(false);
        navigate("/companies");
      }
    } catch (error) {
      console.error("Error deleting company", error);
    }
  };

  return (
    <div className="container w-50 shadow p-4 my-3">
      <h1 className="mb-2 d-flex justify-content-center">Update Company</h1>
      <div className="w-100 d-flex justify-content-end ">
        <Tooltip title="Click to delete the course">
          <IconButton aria-label="delete" onClick={handleDeleteCompany}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <Loading />}
      {company && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="title" className="form-label w-25 ">
              Course Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter course title"
              name="name"
              onChange={(e) => handleChange(e)}
              value={company.name}
            />
          </div>
          {/* <label>
            Description:
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
            />
          </label> */}
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="description" className="form-label w-25">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter course description"
              name="description"
              onChange={(e) => handleChange(e)}
              value={company.description}
            />
          </div>
          <div className="mb-3 d-flex align-items-center ">
            <label htmlFor="image" className="form-label me-0 w-25">
              Image
            </label>
            <UploadWidget onUpload={setImage} />
          </div>
          <img src={image} alt="company logo" className="w-25 mb-3" />

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="status" className="form-label w-25">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Course category select"
              name="status"
              onChange={(e) => handleChange(e)}
              value={company.status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              style={{ borderColor: "#0455bf", color: "#0455bf" }}
              onClick={handleUpdate}
            >
              Update Company
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCompany;
