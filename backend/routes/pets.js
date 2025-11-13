const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.PetID,
        p.Name,
        p.Species,
        p.Breed,
        p.Age,
        p.Size,
        p.AdoptionStatus,
        s.ShelterName
      FROM Pet p
      JOIN Shelter s ON p.ShelterID = s.ShelterID
      WHERE p.AdoptionStatus = 'Available'
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

module.exports = router;
