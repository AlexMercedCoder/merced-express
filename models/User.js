
    //----------------------------------------
    //  Import Dependencies
    //----------------------------------------
    import mongoose from "../db/connection.js";
    const {Schema, model} = mongoose;
    
    //----------------------------------------
    //  New Schema
    //----------------------------------------
    
    const UserSchema = new Schema({
          username: {type: String, required: true, unique: true},
          password: {type: String, required: true}
    }, { timestamps: true });
    
    //----------------------------------------
    //  Generate Model
    //----------------------------------------
    
    const User = model("User", UserSchema)
    
    //----------------------------------------
    //  Export Module
    //----------------------------------------
    export default User
       