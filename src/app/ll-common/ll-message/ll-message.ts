export class LlMessage {
  key: string;
  payload: any = null;

  constructor(key: string) {
    this.key = key;
  }
}
