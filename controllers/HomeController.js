//----------------------------------------
//  Import Dependencies
//----------------------------------------
import { Router } from "express";
//xxx


//----------------------------------------
//  Create Router
//----------------------------------------
const HomeRouter = Router();

//----------------------------------------
//  Router Middleware
//----------------------------------------
//xxx


//----------------------------------------
//  Routes
//----------------------------------------
HomeRouter.get("/", (req, res) => {
  res.json({ hello: "world" });
});

//----------------------------------------
//  Export Router
//----------------------------------------
export default HomeRouter;
