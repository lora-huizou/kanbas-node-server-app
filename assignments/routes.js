import db from "../Database/index.js";

function AssignmentRoutes(app) {
  // get assignments by assignment id
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignments = db.assignments.find((a) => a._id === id);
    if (!assignments) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.json(assignments);
  });

  // get assignments by course id
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  // get all assignments 
  app.get("/api/assignments", (req, res) => {
    const assignments = db.assignments;
    res.json(assignments);
  });

  //create 
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.unshift(newAssignment);
    res.send(newAssignment);
  });

  //delete 
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = db.assignments.findIndex((a) => a._id === id);
    if (index === -1) {
      return res.status(404).send("Assignment not found");
    }
    db.assignments.splice(index, 1);
    return res.sendStatus(204);
  });


  // update 
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = db.assignments.findIndex((a) => a._id === id);
    if (index === -1) {
      return res.status(404).send("Assignment not found");
    }
    db.assignments[index] = {
      ...db.assignments[index],
      ...req.body,
    };
    return res.json(200);
  });
}

export default AssignmentRoutes;
