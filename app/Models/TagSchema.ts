import mongoose, { Document, Schema } from "mongoose";

// Define the SingleTagType schema
const SingleTagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    default: "demo-user",
  },
});

// Delete the model if it exists to force a refresh
if (mongoose.models.Tag) {
  delete mongoose.models.Tag;
}

const Tag = mongoose.model("Tag", SingleTagSchema);

export default Tag;
