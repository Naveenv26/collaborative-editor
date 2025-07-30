export const connectSocket = (docId) => {
  const socket = new WebSocket(`ws://localhost:8000/ws/editor/${docId}/`);
  return socket;
};
