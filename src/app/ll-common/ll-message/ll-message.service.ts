import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {LlMessage} from './ll-message';

type MessageCallback = (payload: any) => void;

@Injectable({providedIn: 'root'})
export class LlMessageService {
  private handler = new Subject<LlMessage>();

  broadcast(message: LlMessage): void {
    this.handler.next({key: message.key, payload: message.payload});
  }

  subscribe(key: string, callback: MessageCallback): Subscription {
    return this.handler.pipe(
        filter(message => message.key === key),
        map(message => message.payload))
        .subscribe(callback);
  }
}
