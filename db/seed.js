//----------------------------------------
//  Import Dependencies
//----------------------------------------
import mongoose from "./connection";
import { log } from "mercedlogger";

//----------------------------------------
//  Import Models Here
//----------------------------------------

//----------------------------------------
//  Seed, write seed code in function
//----------------------------------------

const seed = async () => {
  log.green("START", "Seeding has Begun");
  //+++++++WRITE SEED CODE BELOW++++++++++++

  //+++++++WRITE SEED CODE ABOVE++++++++++++
  log.red("END", "Seeding has completed");
};

seed();
