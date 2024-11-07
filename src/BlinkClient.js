import { io } from "socket.io-client";

class BlinkClient {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.socket = null;
    }

    /**
     * Initialize Socket.IO connection with specified options.
     */
    connect() {
        if (!this.socket) {
            this.socket = io(this.url, {
                withCredentials: true,
                transports: ["websocket"],
                ...this.options
            });

            this.socket.on("connect", () => console.log("Connected to Blink server"));
            this.socket.on("disconnect", () => console.log("Disconnected from Blink server"));
        }
    }

    /**
     * Subscribe to a specific event.
     * @param {string} event - The event name.
     * @param {function} callback - Callback function for handling the event data.
     */
    subscribe(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    /**
     * Unsubscribe from a specific event.
     * @param {string} event - The event name.
     */
    unsubscribe(event) {
        if (this.socket) {
            this.socket.off(event);
        }
    }

    /**
     * Emit a message to a specific group.
     * @param {string} groupId - The group ID.
     * @param {string} event - The event name.
     * @param {object} data - The data to send.
     */
    sendMessage(groupId, event, data) {
        if (this.socket) {
            this.socket.emit("message", { groupId, event, data });
        }
    }

    /**
     * Disconnect from the server.
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default BlinkClient;
