import files from "files";
import { log } from "mercedlogger";
//////////////////////////////////////
// The Setup
//////////////////////////////////////
let task = () => {};
const [, , ...args] = process.argv;
const type = args[0];
const name = args[1];

//////////////////////////////////////
// Generate Controller
//////////////////////////////////////

if (type === "controller") {
  task = async () => {
    const path = `./controllers/${name}Controller.js`;
    const content = `
     //----------------------------------------
     //  Import Dependencies
     //----------------------------------------
     import { Router } from "express";
     
     //----------------------------------------
     //  Create Router
     //----------------------------------------
     const ${name}Router = Router();

     //----------------------------------------
     //  Router Middleware
     //----------------------------------------
     
     //----------------------------------------
     //  Routes
     //----------------------------------------
     ${name}Router.get("/",(req, res) => {
       res.json({ hello: "${name}" });
     });
     
     //----------------------------------------
     //  Export Router
     //----------------------------------------
     export default ${name}Router;
     `;
    await files.write(path, content);

    const Home = await files.read("./controllers/HomeController.js");
    const split = Home.split("//xxx");
    split[0] = split[0] + `import ${name}Controller from './${name}Controller.js'`;
    split[1] = split[1] + `HomeRouter.use('/${name.toLowerCase()}', ${name}Controller)`;
    const result = split.join("\n//xxx\n");
    await files.write("./controllers/HomeController.js", result);
    log.green(
      "DONE",
      "new file created in controllers folder, router registered in HomeController"
    );
  };
}

//////////////////////////////////////
// Generate Model
//////////////////////////////////////

if (type === "model") {
  task = async () => {
    const path = `./models/${name}.js`;
    const content = `
      //----------------------------------------
      //  Import Dependencies
      //----------------------------------------
      import mongoose from "../db/connection.js";
      const {Schema, model} = mongoose;
      
      //----------------------------------------
      //  New Schema
      //----------------------------------------
      
      const ${name}Schema = new Schema({}, { timestamps: true });
      
      //----------------------------------------
      //  Generate Model
      //----------------------------------------
      
      const ${name} = model("${name}", ${name}Schema)
      
      //----------------------------------------
      //  Export Module
      //----------------------------------------
      export default ${name}
       `;
    await files.write(path, content);
    log.green("DONE", "new file created in models folder");
  };
}

//////////////////////////////////////
// Generate routes
//////////////////////////////////////

if (type === "resource") {
  task = async () => {
    // Generate the Model
    let path = `./models/${name}.js`;
    let content = `
      //----------------------------------------
      //  Import Dependencies
      //----------------------------------------
      import mongoose from "../db/connection.js";
      const {Schema, model} = mongoose;
      
      //----------------------------------------
      //  New Schema
      //----------------------------------------
      
      const ${name}Schema = new Schema({}, { timestamps: true });
      
      //----------------------------------------
      //  Generate Model
      //----------------------------------------
      
      const ${name} = model("${name}", ${name}Schema)
      
      //----------------------------------------
      //  Export Module
      //----------------------------------------
      export default ${name}
       `;
    await files.write(path, content);

    // Generate the Controller
    path = `./controllers/${name}Controller.js`;
    content = `
     //----------------------------------------
     //  Import Dependencies
     //----------------------------------------
     import { Router } from "express";
     import ${name} from "../models/${name}.js";
     
     //----------------------------------------
     //  Create Router
     //----------------------------------------
     const ${name}Router = Router();

     //----------------------------------------
     //  Router Middleware
     //----------------------------------------
     
     //----------------------------------------
     //  Routes
     //----------------------------------------

     // INDEX ROUTE
     ${name}Router.get("/", async (req, res) => {
       try{
        const all = await ${name}.find({});
        res.json(all);
       } catch (error){
         console.log(error)
       }
       
     });

     // CREATE ROUTE
     ${name}Router.post("/", async (req, res) => {
       try{
        const one = await ${name}.create(req.body);
        res.json(one);
       }catch (error){
         console.log(error)
       }

     });

     // UPDATE ROUTE
     ${name}Router.put("/:id",async (req, res) => {
      try{
        const one = await ${name}.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(one);
      }catch (error){
        console.log(error)
      }

     });

     // DESTROY ROUTE
     ${name}Router.put("/:id",async (req, res) => {
      try{
        const one = await ${name}.findByIdAndRemove(req.params.id);
        res.json(one);
      }catch (error){
        console.log(error)
      }

     });

     // SHOW ROUTE
     ${name}Router.get("/:id",async (req, res) => {
      try{
        const one = await ${name}.findById(req.params.id);
        res.json(one);
      }catch (error){
        console.log(error)
      }

     });
     
     //----------------------------------------
     //  Export Router
     //----------------------------------------
     export default ${name}Router;
     `;
    await files.write(path, content);

    // Generate the Routes
    const Home = await files.read("./controllers/HomeController.js");
    const split = Home.split("//xxx");
    split[0] = split[0] + `import ${name}Controller from './${name}Controller.js'`;
    split[1] = split[1] + `HomeRouter.use('/${name.toLowerCase()}', ${name}Controller)`;
    const result = split.join("\n//xxx\n");
    await files.write("./controllers/HomeController.js", result);
    log.green(
      "DONE",
      "new files created in models and controllers, router registered in HomeController"
    );
  };
}

task();
