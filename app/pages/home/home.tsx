import {useRouteLoaderData} from "react-router";
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import '@livekit/components-styles/index.css';
import {useEffect, useRef} from "react";


export default function HomePage() {
    const data = useRouteLoaderData('home-route')

    const parentOrigin = useRef<string | undefined>(undefined)

    const postMessage = (type: string, data?: any) => {
        window.parent.postMessage({type, data}, parentOrigin.current || "*");
    }

    const onMessage = (event:any) => {
        switch (event.data.type) {
            case "RESPONSE_PARENT_URL":
                parentOrigin.current = event.data.url;
                break;
        }
    }

    const handleDisconnect = () => {
        postMessage('CALL_DISCONNECTION')
    }

    useEffect(() => {
        postMessage("REQUEST_PARENT_URL");

        window.addEventListener("message", onMessage);

        return () => {
            window.removeEventListener("message", onMessage);
        }
    }, [])

    return <div>
        <h1 style={{position: 'fixed', zIndex: 999, color: 'white'}}>v3</h1>
        <div data-lk-theme="default" style={{height: '100vh', backgroundColor: '#f0f0f0'}}>
            <LiveKitRoom style={{height: '100vh'}} serverUrl='wss://call.psndev.ir/' screen={false}
                         onDisconnected={handleDisconnect}
                         token={data.token}>
                <VideoConference/>
            </LiveKitRoom>
        </div>
    </div>
}