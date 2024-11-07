import BlinkClient from "./BlinkClient";

export const createBlinkClient = (url, options) => {
    const client = new BlinkClient(url, options);
    client.connect();
    return client;
};