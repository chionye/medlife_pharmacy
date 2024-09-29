/** @format */

import { useEffect, useState } from "react";
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useParams } from "react-router-dom";
import { getCookie } from "@/services/storage";

export default function VideoCall() {
  const { callId } = useParams();
  const userData = JSON.parse(getCookie("@user") || "{}");
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  
  const user_id = `${userData.username}`;
  const user = { id: user_id };

  const apiKey = "mmhfdzb5evj2";
  const tokenProvider = async () => {
    const { token } = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: user_id,
        })
    ).then((res) => res.json());
    return token as string;
  };

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, []);

  useEffect(() => {
    if (!client || !callId) return;
    const myCall = client.call("default", callId);
    myCall.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
    };
  }, [client, callId]);

  if (!client || !call) return null;

  return (
    <div className={`bg-[url('/images/video_bg.jpeg')] bg-cover h-screen`}>
      <StreamVideo client={client}>
        <StreamTheme className='my-theme-overrides'>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    </div>
  );
}
