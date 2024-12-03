import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export class SQSAdapter {
  private client: SQSClient;
  private queueUrl: string;

  constructor(queueUrl: string) {
    this.client = new SQSClient({});
    this.queueUrl = queueUrl;
  }

  async sendMessage(payload: object): Promise<void> {
    const message = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(payload),
    });

    try {
      await this.client.send(message);
      console.log('Message sent to SQS:', payload);
    } catch (error) {
      console.error('Failed to send message to SQS:', error);
      throw new Error('Failed to send message to SQS');
    }
  }
}
