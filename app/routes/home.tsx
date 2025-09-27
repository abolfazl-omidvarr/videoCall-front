import type {Route} from "./+types/home";
import HomePage from "~/pages/home/home";
import {redirect} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PSN Video Call"}
    ];
}

export const loader = async ({ request,params }: Route.LoaderArgs) => {
    const searchParams = new URL(request.url).searchParams;


    const roomName = searchParams.get("roomName");
    const participantName = searchParams.get("participantName");

    if(!roomName || !participantName){
        return redirect('/invalid-entry');
    }

    const res = await fetch(new URL('/api/getToken', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, participantName }),
    });

    return await res.json();
}

export default function Home() {
    return <HomePage/>;
}
