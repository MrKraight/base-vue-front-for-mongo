import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import mitt from 'mitt';

import { useLoadingStore } from '@/stores/loadingStore.js';

import chalk from 'chalk';

const api_url = process.env.API_URL;

export const useSocketStore = defineStore('socketio', {
  state: () => ({
    host: `${api_url}`,
    socket: null,
    isConnected: false,
    socketEvents: mitt()
  }),
  actions: {
    connect(token){
      this.socket = io(`${this.host}`, {
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

      this.socket.on('notification', (data) => {
        const loadingStore = useLoadingStore();
        this.socketEvents.emit('notification', data);
        loadingStore.setLoading(false);
      })
    },
    disconnect() {
      if(this.socket){
        this.socket.disconnect(); 
      }
      this.socket = null;
      this.isConnected = false;
    },
  },
});