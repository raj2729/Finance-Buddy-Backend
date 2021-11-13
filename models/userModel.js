const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    customerEmailId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    address: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241265/sjddbfkcij5tz8vokcmo.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    propertyArea: {
      type: String,
      required: true,
    },
    applicantIncome: {
      type: Number,
      required: true,
    },
    isSelfEmployed: {
      type: Boolean,
      required: true,
      default: false,
    },
    cibilScore: {
      type: String,
      required: true,
    },
    dependents: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

// Middleware for hashing password
// pre => before saving the user in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
