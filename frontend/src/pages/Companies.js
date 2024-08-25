import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CommonContext from "../context/CommonContext";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const { setSelectedCompanyId } = useContext(CommonContext);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/company/getComapanies",
        {
          headers: {
            //Bearer token
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log("🚀 ~ getCompanies ~ data:", data);

      setCompanies(data.companies);
    } catch (error) {
      console.error(error);
    }
  };
  const onclickCompany = (company) => {
    console.log(company);
    setSelectedCompanyId(company);
    localStorage.setItem("selectedCompanyId", company);
    navigate("/updateCompany");
  };
  return (
    <div className="container ">
      <Row>
        {companies ? (
          companies.map((company) => (
            <Col xs={12} sm={6} md={4} lg={3} key={company._id}>
              <Card
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={() => onclickCompany(company._id)}
              >
                <Card.Img
                  variant="top"
                  src={company.logo}
                  style={{ height: 250 }}
                />
                <Card.Body>
                  <Card.Title>{company.name}</Card.Title>
                  {/* <Card.Text>{company.description}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h1>No companies found</h1>
        )}
      </Row>
    </div>
  );
};

export default Companies;
