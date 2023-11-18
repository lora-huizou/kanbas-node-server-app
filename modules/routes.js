import db from "../Database/index.js";

function ModuleRoutes(app) {
  // get all modules
  app.get("/api/modules", (req, res) => {
    const modules = db.modules;
    res.json(modules);
  });

  // get module by id
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });

  //create a module
  app.post("/api/courses/:cid/modules", (req, res) => {
    const newModule = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.unshift(newModule);
    res.send(newModule);
  });

  //delete a module
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const index = db.modules.findIndex((m) => m._id === mid);
    if (index === -1) {
      return res.status(404).send("Module not found");
    }
    db.modules.splice(index, 1);
    return res.sendStatus(204);
  });

  // app.delete("/api/modules/:mid", (req, res) => {
  //   const { mid } = req.params;
  //   db.modules = db.modules.filter((m) => m._id !== mid);
  //   res.sendStatus(200);
  // });

  // update a module

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const index = db.modules.findIndex((m) => m._id === mid);
    if (index === -1) {
      return res.status(404).send("Module not found");
    }
    db.modules[index] = {
      ...db.modules[index],
      ...req.body,
    };
    return res.json(200);
  });
}

export default ModuleRoutes;
