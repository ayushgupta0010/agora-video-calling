import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import {
  channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "./settings";
import Videos from "./Videos";
import Controls from "./Controls";

const VideoCall = ({ setInCall }) => {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((original) => [...original, user]);
        }
        if (mediaType === "audio") user.audioTrack.play();
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") user.audioTrack && user.audioTrack.stop();
        if (mediaType === "video") {
          setUsers((original) =>
            original.filter((User) => User.uid !== user.uid)
          );
        }
      });

      client.on("user-left", (user) => {
        setUsers((original) =>
          original.filter((User) => User.uid !== user.uid)
        );
      });

      await client
        .join(config.appId, name, config.token, null)
        .catch((err) => console.log(err));

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks)
      try {
        init(channelName);
      } catch (err) {
        console.log(err);
      }
  }, [client, ready, tracks]);

  return (
    <Grid container direction='column' style={{ height: "100%" }}>
      <Grid item style={{ height: "5%" }}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </Grid>
      <Grid item style={{ height: "95%" }}>
        {start && tracks && <Videos tracks={tracks} users={users} />}
      </Grid>
    </Grid>
  );
};

export default VideoCall;
