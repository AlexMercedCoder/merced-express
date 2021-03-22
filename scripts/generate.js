import files from "files";
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
     ${name}Router.get((req, res) => {
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
    split[0] = split[0] + `import ${name}Controller from './${name}Controller'`;
    split[1] = split[1] + `HomeRouter.use('/${name}', ${name}Controller)`;
    const result = split.join("\n//xxx\n");
    await files.write("./controllers/HomeController.js", result);
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
      import { Schema, model } from "../db/connection.js";
      
      //----------------------------------------
      //  New Schema
      //----------------------------------------
      
      const ${name}Schema = new Schema({}, { timestamps: true });
      
      //----------------------------------------
      //  Generate Model
      //----------------------------------------
      
      const ${name} = model("${name}", TheSchema)
      
      //----------------------------------------
      //  Export Module
      //----------------------------------------
      export default ${name}
       `;
    await files.write(path, content);
  };
}

//////////////////////////////////////
// Generate routes
//////////////////////////////////////

if (type === "routes") {
  task = async () => {
    // Generate the Model
    let path = `./models/${name}.js`;
    let content = `
      //----------------------------------------
      //  Import Dependencies
      //----------------------------------------
      import { Schema, model } from "../db/connection.js";
      
      //----------------------------------------
      //  New Schema
      //----------------------------------------
      
      const ${name}Schema = new Schema({}, { timestamps: true });
      
      //----------------------------------------
      //  Generate Model
      //----------------------------------------
      
      const ${name} = model("${name}", TheSchema)
      
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
     ${name}Router.get((req, res) => {
       res.json({ hello: "${name}" });
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
    split[0] = split[0] + `import ${name}Controller from './${name}Controller'`;
    split[1] = split[1] + `HomeRouter.use('/${name}', ${name}Controller)`;
    const result = split.join("\n//xxx\n");
    await files.write("./controllers/HomeController.js", result);
  };
}

task();
