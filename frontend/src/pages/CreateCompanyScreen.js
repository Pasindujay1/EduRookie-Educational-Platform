import React, { useContext, useState } from "react";
import { createCompany } from "../api/company";
import Loading from "../components/Loading";
import UploadWidget from "../components/UploadWidget";
import ToastContext from "../context/ToastContext";

const CreateCompanyScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useContext(ToastContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !logo || !status || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // setLoading(true);

    const result = await createCompany({
      name,
      description,
      logo,
      status,
      email,
      password,
    });

    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    } else {
      toast.success("Company created successfully!");
      handleClear();
    }

    setLoading(false);
  };

  const handleClear = () => {
    setName("");
    setDescription("");
    setLogo(null);
    setStatus("");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-50 shadow p-4 my-3">
      <h1 className="mb-4 d-flex justify-content-center">Create Company</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="companyDescription"
            rows="3"
            placeholder="Enter company description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="companyLogo" className="form-label me-3">
            Company Logo
          </label>
          <UploadWidget onUpload={setLogo} />
        </div>
        {logo && (
          <img
            src={logo}
            alt="Company Logo"
            className="img-fluid w-50 h-50"
            style={{ maxWidth: "100px" }}
          />
        )}

        <div className="mb-3">
          <label htmlFor="companyStatus" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="companyStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="companyEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="companyEmail"
            placeholder="Enter company email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="companyPassword"
            placeholder="Enter company password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn  "
            style={{ borderColor: "#0455bf", color: "#0455bf" }}
            onClick={(e) => handleSubmit(e)}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyScreen;
