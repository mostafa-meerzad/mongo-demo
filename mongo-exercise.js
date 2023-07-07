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

function getBackendCourses() {
  return Course.find({
    $and: [{ tags: "backend" }, { isPublished: true }],
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1, _id: 0 });
}

function getFrontendBackendCourses() {
  return Course.find({
    isPublished: true,
    // $or: [{ tags: "frontend" }, { tags: "backend" }],// this is one way to get courses thar are frontend and backend
    tags:{$in:["frontend", "backend"]}
  })
    .sort( "-price" ) // we can use -1 or -price (-propertyName) to represent descending order same thing goes for ascending order
    // .select({ name: 1, author: 1 }); // one way of selecting properties
    .select([ "name", "author", "price", "-_id"]); // other way of selecting properties
}

async function getPublishedCourses(){

  return Course.find({isPublished:true}).or([{price:{$gte: 15}}, {name:/.*by.*/i}])
}
async function run() {
  // const result = await getBackendCourses()
  // const result = await getFrontendBackendCourses();
  const result = await getPublishedCourses();
  console.log(result);
}

run();
