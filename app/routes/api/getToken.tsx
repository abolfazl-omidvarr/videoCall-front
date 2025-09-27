import {AccessToken} from 'livekit-server-sdk';
import {type ActionFunctionArgs} from "react-router";


export async function action({request}: ActionFunctionArgs) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({message: 'Method Not Allowed'}), {status: 405});
    }

    try {
        const data = await request.json();
        const {roomName, participantName} = data ?? {};

        const token = await createToken(roomName, participantName);

        return new Response(JSON.stringify({token}), {status: 201});
    } catch (e: any) {
        return new Response('', {status: 500});
    }
}


async function createToken(roomName: string, participantName: string) {
    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: participantName, // Token to expire after 10 minutes
        ttl: '10m',
    });
    at.addGrant({roomJoin: true, room: roomName});

    return await at.toJwt();
};

