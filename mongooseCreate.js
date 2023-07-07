const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => {
    console.log("Could not connect to mongodb... ", err);
  });

// A schema defines the shape of the documents that we are going to store in our collection
// Data-types available in mongoose (String, Number, Array, Boolean, Date, Buffer, ObjectID)
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String], // an array of values with the type of String
  date: { type: Date, default: Date.now }, // if you want a field to have default value, type for DataType, default for defaultValue
  isPublished: Boolean,
});

// Classes , object
// Course, nodeCourse

// to create a course instance we need to compile our schema into a model
// model takes to arguments first is the singular name of the collection that this model is for
// the second one is the schema

const Course = mongoose.model("Course", courseSchema); // returns a Class

async function createCourse() {
  const course = new Course({
    name: "python",
    author: "John",
    tags: ["programming","python", "fullstack"],
    isPublished: false,
  });
  // now that we created our course-object we need to save it
  // const result = course1.save().then(() => {
  // console.log("user saved");
  // })

  // const result = await course1.save()
  course.save(); // to save the object into the database

  console.log(course);
}

createCourse();
