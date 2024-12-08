const Section = require("../models/Section");
const EducatorStudent = require("../models/Educator_Student");
exports.getSections = async (req, res) => {
  try {
    const { educatorEmail } = req.query;
    const sections = await Section.find({ educatorEmail });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sections" });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { educatorEmail, educatorUsername, section } = req.body;

    if (!/^[A-Z]$/.test(section)) {
      return res
        .status(400)
        .json({ error: "Section must be a single capital letter" });
    }

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

exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { educatorEmail, section } = req.body;

    const deletedSection = await Section.findOneAndDelete({
      section: section,
      educatorEmail: educatorEmail,
    });

    if (!deletedSection) {
      return res
        .status(404)
        .json({ error: "Section not found or unauthorized" });
    }

    await EducatorStudent.deleteMany({
      educatorEmail: educatorEmail,
      section: section,
    });

    res
      .status(200)
      .json({ message: "Section and related students deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete section and related students" });
  }
};
