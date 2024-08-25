import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  getCompanyNames,
  getComapanies,
} from "../controllers/company.js";

const router = express.Router();

router.post("/createCompany", createCompany);
router.get("/getCompany/:id", getCompany);
router.get("/getAllCompanies", getAllCompanies);
router.put("/updateCompany/:id", updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);
router.get("/getCompanyNames", getCompanyNames);
router.get("/getComapanies", getComapanies);
router.get("/getCompany/:id", getCompany);

export default router;
