import * as dao from "./dao.js";

//let currentUser = null;

function UserRoutes(app) {

  // const signin = async (req, res) => {
  //   const { username, password } = req.body;
  // const currentUser = await dao.findUserByCredentials(username, password);
  // req.session['currentUser'] = currentUser;
  // res.json(currentUser);
  // };

  // const account = async (req, res) => {
  //   try{
  //     const currentUser = req.session['currentUser'];
  //     if(!currentUser){
  //       res.status(403).json({ error: 'Please sign in.' });
  //     }
  //     res.json(currentUser);
  //   } catch(error){
  //     res.status(500).json({ error: 'An error occurred while getting account.' });
  //   }
  // };
  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(403);
      return;
    }
    res.json(currentUser);
  };


  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const status = await dao.updateUser(userId, req.body);
      const currentUser = await dao.findUserById(userId);
      req.session['currentUser'] = currentUser;  
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findAllUsers = async (req, res) => {
    try {
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while find all users.' });
    }
  };

  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while find the user by ID.' });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser)
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const signout = (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json({ message: 'Successfully signed out.' });
    } catch (error) {
      console.error('Sign out error:', error);
      res.status(500).json({ error: 'An error occurred during sign out.' });
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}

export default UserRoutes;
