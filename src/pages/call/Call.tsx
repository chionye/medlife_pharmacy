
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
  Call,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { getCookie } from "@/services/storage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";


export default function VideoCall() {
  const apiKey = "mmhfdzb5evj2";
  const navigate = useNavigate();
  const userData = JSON.parse(getCookie("@user") || "{}");
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const userId = userData.username;
  const { callId } = useParams();

  const tokenProvider = async () => {
    const { token } = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: userId,
        })
    ).then((res) => res.json());
    return token as string;
  };

  const user: User = {
    id: userId,
    name: userData.fullname || userData.username,
    image: `https://getstream.io/random_svg/?id=${userId}&name=${
      userData.fullname || userData.username
    }`,
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

  if (!client || !call){
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <p>Call Ended...</p>
        <Button
          className='bg-[#D20606] text-white w-full py-7'
          onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`bg-[url('/images/video_bg.jpeg')] bg-cover h-screen`}>
      <StreamVideo client={client}>
        <StreamTheme className='my-theme-overrides'>
          <StreamCall call={call}>
            <MyUILayout />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    </div>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } =
    useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ReloadIcon className='mr-2 h-20 w-20 animate-spin' />
      </div>
    );
  }

  return (
    <>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </>
  );
};
