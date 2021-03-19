import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'socket-client';
  notifications: string[];

  constructor(public socketService: SocketService) {
    this.notifications = [];
  }

  ngOnInit() {
    this.socketService.initSocketConnection();
    this.socketService.socket.on('eventNotification', (message: string) => {
      this.notifications.push(message);
    });
  }
}
