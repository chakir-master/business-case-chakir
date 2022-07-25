import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Message {
  source: string,
  content: {},
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;
  private wsUrl = environment.wsUrl; 

  constructor() {
    this.messages = <Subject<Message>>this.connect(this.wsUrl).pipe(
      map(
          (response: MessageEvent): Message => {
              console.log('response.data when connected');
              console.log(response.data);
              let data = JSON.parse(response.data)
              return data;
          }
      )
    );
  }

  public connect(url): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
        this.subject = this.create(url);
        console.log("xxxxxxx Successfully connected xxxxxxx ::: " + url);
    }
    return this.subject;
  }

  private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
    });
    let observer = {
        error: null,
        complete: null,
        next: (data: Object) => {
            console.log('xxxxxxxxxx Message sent to websocket xxxxxx ::: ', data);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }

}
