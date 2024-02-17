import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { JWTPayload } from "../types/user.type";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const userPayload = req.user as JWTPayload;
    const senderId: string = userPayload.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id.toString());
    }
    // await conversation.save();
    // await newMessage.save();

    await Promise.all([await conversation.save(), await newMessage.save()]); // will run in parallel

    res.status(201).json(newMessage);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userToChatId } = req.params;
    const sender = req.user as JWTPayload;
    const { userId: senderId } = sender;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
