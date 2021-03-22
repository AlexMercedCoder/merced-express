//----------------------------------------
//  Import Dependencies
//----------------------------------------
import { Schema, model } from "mongoose";

//----------------------------------------
//  New Schema
//----------------------------------------

const TheSchema = new Schema({}, { timestamps: true });

//----------------------------------------
//  Generate Model
//----------------------------------------

const The = model("The", TheSchema)

//----------------------------------------
//  Export Module
//----------------------------------------
export default The