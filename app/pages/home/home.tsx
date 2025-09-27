import {useRouteLoaderData} from "react-router";
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import '@livekit/components-styles/index.css';


export default function HomePage(){
    const token = useRouteLoaderData('home-route')
    return     <div>
        <div data-lk-theme="default" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
            <LiveKitRoom style={{ height: '100vh' }} serverUrl='ws://call.psndev.ir:7880/' screen={false}
                         token={token} >
                <VideoConference />
            </LiveKitRoom>
        </div>
    </div>
}