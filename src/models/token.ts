import { model, Schema, models } from "mongoose";

export default models.token || model("token", new Schema({
    id: { type: String, required: true },
    jwt: { type: String, required: true },
}))