import Database from "../Database/index.js";

function CourseRoutes(app) {

  // get all coourses & a single course
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.json(courses);  //res.send(courses);
  });

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((course) => course._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  });

  // delete w/ error handling
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.courses.findIndex((c) => c._id === id);
    if (index === -1) {
      res.status(404).send("Course not found");
      return;
    }
    Database.courses.splice(index, 1);
    res.json(204);
  });

  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses
  //     .filter((c) => c._id !== id);
  //   res.sendStatus(204);
  // });


  // create
  app.post("/api/courses", (req, res) => {
    const newCourse = {
      _id: new Date().getTime().toString(),
      ...req.body,
    };
    Database.courses.unshift(newCourse); // unshift -> put at the beginning, push -> end
    res.json(newCourse);
  });

  // update
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.courses.findIndex((course) => course._id === id);
    if (index === -1) {
      res.status(404).send("Course not found");
      return;
    }
    Database.courses[index] = {
      ...Database.courses[index],
      ...req.body,
    };
    res.json(200);
  });

}
export default CourseRoutes;
