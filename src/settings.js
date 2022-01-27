import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "56fdf1a48e9e4f54b57e10ea5389629b";
const token =
  "00656fdf1a48e9e4f54b57e10ea5389629bIABkSYj6O0pAYihea5APtXGLX432dbggxzHA9zAlh2IpTWTNKL8AAAAAEADbqsx0yy/0YQEAAQDOL/Rh";

export const config = { mode: "rtc", codec: "vp8", appId, token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
