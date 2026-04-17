import { SOCKET_EVENTS } from "../constants/socket.events.js";
import { getUserSockets } from "./socket.manager.js";

export const registerSocketEvents = (io, socket) => {
  // 🔥 Typing event
  socket.on(SOCKET_EVENTS.TYPING, ({ to }) => {
    const receiverSockets = getUserSockets(to);

    receiverSockets.forEach((id) => {
      io.to(id).emit(SOCKET_EVENTS.TYPING, {
        from: socket.user._id,
      });
    });
  });

  // 🔥 Stop typing
  socket.on(SOCKET_EVENTS.STOP_TYPING, ({ to }) => {
    const receiverSockets = getUserSockets(to);

    receiverSockets.forEach((id) => {
      io.to(id).emit(SOCKET_EVENTS.STOP_TYPING, {
        from: socket.user._id,
      });
    });
  });
};
