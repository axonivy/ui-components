import type { MessageReader, MessageWriter } from 'vscode-jsonrpc';
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter } from 'vscode-ws-jsonrpc';

export interface Connection {
  reader: MessageReader;
  writer: MessageWriter;
}

export async function createWebSocketConnection(url: string | URL): Promise<Connection> {
  return new Promise<Connection>((resolve, reject) => {
    const webSocket = new WebSocket(url);
    webSocket.onopen = async () => {
      const socket = toSocket(webSocket);
      const reader = new WebSocketMessageReader(socket);
      const writer = new WebSocketMessageWriter(socket);
      const connection: Connection = { reader, writer };
      resolve(connection);
    };
    webSocket.onerror = () => reject('Connection could not be established.');
  });
}
