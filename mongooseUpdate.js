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

async function getCourses() {
  // const courses = await Course.find()// find method is async and return a list of all documents

  // we can pass a filter (key-value pairs) to find method and it will return those fields only
  // const courses = await Course.find({name:"Node"})
  // const courses =  await Course.find({author:"John Doe"})
  // .limit(10)// the number of returned documents
  // .sort({name:1}) // takes an object with properties that you want to sort the returned documents, 1 for ascending, -1 for descending order
  // .select({name:1, isPublished:1}) // takes an object of fields tha you want to have (1 to include, 0 to exclude)

  // comparison operators in mongodb are also available in mongoose
  // eq => equal
  // neq => not equal
  // gt => greater than
  // gte => greater than or equal to
  // lt => lease than
  // lte => lease than or equal to
  // in => to check if a value is in an operable
  // nin => not in

  // find the courses that are exactly 10$
  // const courses = await Course.find({price:10})

  // find the courses that are greater than 10$ and lease than 20$
  // const courses = await Course.find({price:{$gte: 10, lte:20}})

  // find the courses that are greater than 10$
  // const courses = await Course.find({price:{$gte: 10}})

  // find the courses that are either 10, 15 or 20
  // const courses = await Course.find({price:{$in:[10, 15, 20]}})

  // ------------------------------------------------------------

  // logical operators
  // or
  // and

  // const courses = await Course.find({$or:([{name:"angular"}, {name:"Node"}, {isPublished:true}])})
  // const courses = await Course.find().or([{name:"angular"}, {name:"Node"}, {isPublished:true}])
  // const courses = await Course.find({name:"Node"})

  // by passing a object in to find method we are basically performing logical and operation
  // or you can use the and method
  // const courses = await Course.find({name:"Node", isPublished:false});
  // const courses = await Course.find().and([{name:"Node"}, {isPublished: true}]);
  // console.log(typeof Course)

  //   ---------------------------------- ----------------------------
  // regular expressions
  // /pattern/ the general form
  // const courses = await Course.find({author:/^John/}) // author begins with word "John"
  // const courses = await Course.find({author:/John$/}) // author ends with word "John"
  // const courses = await Course.find({author:/.*John.*/}) // author contains word "John"
  // const courses = await Course.find({author:/^John/}) // author begins with word "John"

  // ---------------------------------------------------------------
  // if you want to get the number of documents stored in the collection you are working with
  // use the "count" method
  const courses = await Course.find({ author: "John Doe" })
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

// getCourses();

async function updateCourses(id) {
  // Approach: Query first
  // findById()
  // modify properties
  // save()

  // Approach: Update first
  // update directly
  // optionally get the updated document

  const course = await Course.findById(id); // find the document
  if(!course) return; // check for existence of the document

  // one way
//   course.author = "Another Author"
//   course.name = "Angular"

// the other way 

course.set({
    author:"Another Author",
    name: "Angular",
})

  course.save() // save the changes
}

updateCourses("64a569bf7c56fcf2092b6af6");
