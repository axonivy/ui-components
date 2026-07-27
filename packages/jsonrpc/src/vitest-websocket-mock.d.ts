import 'vitest';

interface CustomMatchers<R = unknown> {
  toReceiveMessage<TMessage = object>(message: DeserializedMessage<TMessage>, options?: ReceiveMessageOptions): Promise<R>;
  toHaveReceivedMessages<TMessage = object>(messages: Array<DeserializedMessage<TMessage>>): R;
}
declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
