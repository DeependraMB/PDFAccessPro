const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileURL: { type: String, required: true },
  isLocked: { type: Boolean, default: true }, // Default to locked
  openCount: { type: Number, default: 0 },
  closeCount: { type: Number, default: 0 },
});

const PDF = mongoose.model("PDF", pdfSchema);

module.exports = PDF;
