import { model, Schema } from "mongoose";
import mongoose from "mongoose";

interface ISettings {
    ownerId: String
    businessName : string
    supportEmail: string
    knowledge : string
}

const settingsSchema = new Schema<ISettings>({
    ownerId : {
        type: String,
        required :  true,
        unique:true
    },
      businessName : {
        type: String,
    
    },
      supportEmail : {
        type: String,
        
    },
      knowledge : {
        type: String,
        
    },
},{timestamps:true})

const Settings = mongoose.models.Settings || model("Settings", settingsSchema)
export default Settings