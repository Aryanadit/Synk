const userSocketMap = new Map(); // userId -> Set(socketIds)

export const addUserSocket = (userId, socketId) => {
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }
  userSocketMap.get(userId).add(socketId);
};

export const removeUserSocket = (userId, socketId) => {
  if (!userSocketMap.has(userId)) return;

  const sockets = userSocketMap.get(userId);
  sockets.delete(socketId);

  if (sockets.size === 0) {
    userSocketMap.delete(userId);
  }
};

export const getUserSockets = (userId) => {
  return Array.from(userSocketMap.get(userId) || []);
};

export const getOnlineUsers = () => {
  return Array.from(userSocketMap.keys());
};
