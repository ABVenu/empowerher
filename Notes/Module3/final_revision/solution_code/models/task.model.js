const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    deadline: Date,
    status: {
      type: String,
      enum: ["Pending", "Progress", "Completed"],
      default: "Pending",
    },
    isPublic: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // should come from Auth MW
    collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
