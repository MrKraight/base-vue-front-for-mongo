import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import mitt from 'mitt';

import chalk from 'chalk';

import { useLoadingStore } from '@/stores/loadingStore.js';

const socket_host = process.env.SOCKET_HOST;
const socket_port = process.env.SOCKET_PORT;

export const useSocketStore = defineStore('socketio', {
  state: () => ({
    host: `https://${socket_host}/${socket_port}`,
    socket: null,
    isConnected: false,
    socketEvents: mitt()
  }),
  actions: {
    connect(token) {
      this.socket = io(this.host, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnect: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000, // milliseconds
        reconnectionDelayMax: 5000, // milliseconds
      });

      this.socket.onAny((eventName, ...args) => {
        console.log(`SocketIO ${chalk.cyan('Response')}: ${eventName}`);
        args.forEach((arg)=>
          console.log(arg)
        )
      });

      const emit = this.socket.emit;
      let sock = this.socket;
      
      this.socket.emit = function (eventName, ...args) {
        console.log(`SocketIO ${chalk.green('Request')}: ${eventName}`);
        args.forEach((arg)=>
          console.log(arg)
        )
        emit.call(sock, eventName, ...args);
      }; 

      this.socket.on('connect', () => {
        this.isConnected = true;
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
      });

    },
    disconnect() {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    },
  },
});