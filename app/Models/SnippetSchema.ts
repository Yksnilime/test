import mongoose, { Document, Schema } from "mongoose";

// Define the SingleTagType schema
const SingleTagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      default: "demo-user",
    },
  },
  { _id: false }
);

const SingleSnippetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: "demo-user",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  isFavorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  tags: {
    type: [SingleTagSchema],
    required: false,
    default: [],
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  code: {
    type: String,
    required: false,
    default: "",
  },
  language: {
    type: String,
    required: false,
    default: "",
  },
  creationDate: {
    type: String,
    required: true,
    default: "",
  },
  isTrash: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const SnippetM =
  mongoose.models.SnippetM || mongoose.model("SnippetM", SingleSnippetSchema);

export default SnippetM;
