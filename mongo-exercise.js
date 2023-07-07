const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongodb-exercise")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  price: Number,
  isPublished: Boolean,
});

const Course = mongoose.model("courses", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Mongodb",
    author: "John",
    tags: ["database", "backend", "mongodb"],
    price: 120,
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

// createCourse()

async function getCourses() {
  const backendPublishedCourses = await Course.find({
    $and: [{ tags: "backend" }, { isPublished: true }],
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1, _id: 0 });

  console.log(backendPublishedCourses);
}

getCourses()