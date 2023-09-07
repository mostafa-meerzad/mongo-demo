// Embedded documents in mongoose

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: authorSchema, // for a single author document
    authors:[authorSchema] // for multiple authors documents
    // authors:{  // for multiple authors documents
      // type:[authorSchema],
      // required:true
    // } 
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseID) {
  //update the course author
  // const course = await Course.findById(courseID)
  // course.author.name = "Mosh Hamedani"
  // course.save()
  // ---------------------------------------------
  const course = await Course.updateOne(
    { _id: courseID },
    {
      $unset: {
        "author": "",
      },
    }
  );
}

async function addAuthor(courseId, author){
  // add new author to the course 
  const course =await Course.findById(courseId);
  course.authors.push(author);
  course.save()
  // console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId)
  author.deleteOne()
  // console.log(author);
  course.save()
}

// updateAuthor("64aa277c93dec677aebd48e4");

// createCourse("Node Course", [new Author({ name: "Mosh" }), new Author({ name: "Joe" }), new Author({ name: "John" })]);

// addAuthor("64aa34b0071b420a350d1e32", new Author({name:"mostafa"}));

removeAuthor("64aa34b0071b420a350d1e32", "64aa383f1e7f76dadfc07301");