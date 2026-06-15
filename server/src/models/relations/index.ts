import ChatModel from "../Chat";
import ChatParticipants from "../ChatParticipants";
import MessageModel from "../Message";
import UserModel from "../User";

// Связи сообщений
MessageModel.belongsTo(UserModel, { foreignKey: "senderId", as: "sender" });
MessageModel.belongsTo(ChatModel, { foreignKey: "chatId", as: "chat" });
MessageModel.belongsTo(MessageModel, { foreignKey: "replyTo", as: "reply" });
MessageModel.hasMany(MessageModel, { foreignKey: "replyTo", as: "replies" });

// Связи чатов
ChatModel.belongsTo(UserModel, { foreignKey: "creatorId", as: "creator" });
ChatModel.hasMany(MessageModel, { foreignKey: "chatId", as: "messages" });
ChatModel.belongsToMany(UserModel, {
  through: ChatParticipants,
  foreignKey: "chatId",
  as: "participants",
});

// Связи пользователей
UserModel.hasMany(MessageModel, { foreignKey: "senderId", as: "sentMessages" });
UserModel.belongsToMany(ChatModel, {
  through: ChatParticipants,
  foreignKey: "userId",
  as: "chats",
});

ChatModel.hasMany(ChatParticipants, {
  foreignKey: "chatId",
  as: "participantsDirect", // уникальный алиас
});

ChatParticipants.belongsTo(ChatModel, {
  foreignKey: "chatId",
  as: "chat",
});

ChatParticipants.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
