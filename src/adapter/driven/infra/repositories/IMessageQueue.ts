export interface IMessageQueue {
    sendMessage(payload: object): Promise<void>;
  }
  