import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private static HOST_URL: string = 'http://localhost:8081';
  private _socket!: Socket;

  constructor() {}

  public get socket(): Socket {
    return this._socket;
  }

  initSocketConnection(authToken: string): void {
    this._socket = io(SocketService.HOST_URL, {
      extraHeaders: {
        Authorization: authToken,
      },
    });
  }
}
