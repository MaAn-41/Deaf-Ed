const Section = require("../models/Section");

// Get all sections for a specific educator
exports.getSections = async (req, res) => {
  try {
    const { educatorEmail } = req.query;
    const sections = await Section.find({ educatorEmail });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const { educatorEmail, educatorUsername, section } = req.body;

    // Ensure section is a single capital letter
    if (!/^[A-Z]$/.test(section)) {
      return res
        .status(400)
        .json({ error: "Section must be a single capital letter" });
    }

    // Check if the section already exists for the given educator
    const existingSection = await Section.findOne({
      educatorEmail,
      educatorUsername,
      section,
    });

    if (existingSection) {
      return res
        .status(400)
        .json({ error: `Section ${section} already exists for this educator` });
    }

    // Create the new section if no existing section is found
    const newSection = new Section({
      educatorEmail,
      educatorUsername,
      section,
    });

    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ error: "Failed to create section" });
  }
};

// Delete a section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    await Section.findByIdAndDelete(id);
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete section" });
  }
};
