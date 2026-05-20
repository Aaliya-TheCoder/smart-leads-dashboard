import express
from "express";

import protect
from "../middleware/authMiddleware";

import {

  createLead,
  getLeads,
  updateLead,
  deleteLead,

} from "../controllers/leadController";

const router =
  express.Router();

// GET ALL LEADS

router.get(
  "/",
  protect,
  getLeads
);

// CREATE LEAD

router.post(
  "/",
  protect,
  createLead
);

// UPDATE LEAD

router.put(
  "/:id",
  protect,
  updateLead
);

// DELETE LEAD

router.delete(
  "/:id",
  protect,
  deleteLead
);

export default router;