// Referenced documents in mongoose

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,

    // author prop holds an objectID that references to an author document
    author: {
      // we need to use mongoose schema type
      type: mongoose.Schema.Types.ObjectId, // type of this prop will be objectID
      ref: "Author", // the name of collection
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  // const courses = await Course.find().select("name");
  const courses = await Course.find()
  .populate("author", "name -_id")// first prop is the target prop to be populated and second one is the include/exclude 
  .select("name author");
  console.log(courses);
}

// createAuthor("Mosh", "bio", "My Website")

// createCourse("Node Course", "64a987b88eb3d47e615211db")

listCourses();
