# Whisbi event manager
Simple event manager application where some users can create and post their events and other users can subscribe to them
to receive notifications.

## Services

- REST API server on port:  **8080**
- WebSocket server on port: **8081**
- MySQL database on port:   **3306**
- Swagger on port:          **3000**
- Angular client on port:   **4200**

## Architecture
The application has been developed by using a simple "micro"-service architecture, composed of:

- a NodeJS service exporting RESTful APIs a WebSocket server for real time data
- a MySQl database to store user data and events
- a Swagger to easily test the application APIs
- an Angular client application

## Authentication
To authentication logic has been developed using **JWT tokens**, for better scalability and ease of use.
A basic version of JWT has been implemented, without using the concept of Refresh Token
to get a new access token when the old one expires.

## Event notifications
Event notifications are sent to the client using the WebSocket connection.
Each event has a **hasBeenNotified** flag inside the database to prevent sending the same notification over time.


To determine when to send the notification and to whom, the system uses an interval timer.

This interval timer searches for events that are going to take place in the next 24 hours and
sends the notification to the users currently connected that are subscribed to that event.

## Denial of Service protection
The Denial of Service protection is managed inside the backend service by using an Express middleware.
The middleware can be configured to define the maximum number of requests per second after which the server will respond
with an error.

## Real time data
To implement the WebSocket server [Socket.io](https://socket.io/) has been used.
This library creates an abstraction that helps to improve compatibility with browsers not supporting the protocol.

In case a browser doesn't support the WebSocket protocol, the server will fall back to a "long polling" approach.

**This aspect is crucial because it limits scalability**

To be able to scale, the system would need a reverse-proxy with stateful routing to prevent the possibility
of a client connecting to the wrong NodeJS process.

# UI for backend testing
To test backend APIs a swagger service is available that contains the APIs definition with data samples.
To test the event notifications using WebSocket the Angular client can be used.

Once the page is loaded, there will be an input bar at the top where to pur the JWT token to authenticate the socket connection.

By leaving the page open, it will receive the notifications related to the authenticated user.
