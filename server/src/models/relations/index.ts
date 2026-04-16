import ChatModel from "../Chat";
import MessageModel from "../Message";
import UserModel from "../User";

MessageModel.belongsTo(UserModel, { foreignKey: "senderId", as: "sender" });
MessageModel.belongsTo(ChatModel, { foreignKey: "chatId", as: "chat" });
MessageModel.belongsTo(MessageModel, { foreignKey: "replyTo", as: "reply" });

ChatModel.belongsTo(UserModel, { foreignKey: "creatorId", as: "creator" });
ChatModel.belongsToMany(UserModel, { through: "ChatParticipants" });


UserModel.belongsToMany(ChatModel, {
  through: "ChatParticipants",
  as: "chats",
});
UserModel.hasMany(MessageModel, { foreignKey: "senderId", as: "sentMessages" });
ChatModel.hasMany(MessageModel, { foreignKey: "chatId", as: "messages" });

export { ChatModel, MessageModel, UserModel };
