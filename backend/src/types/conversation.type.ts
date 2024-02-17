import { Document, Types } from "mongoose";

import { IMessage } from "./message.type";
import { IUser } from "./user.type";

export interface IConversation extends Document {
  participants: [_userId: Types.ObjectId | IUser];
  messages: [_messageId: Types.ObjectId | IMessage];
}
