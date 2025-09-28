import {AccessToken} from 'livekit-server-sdk';
import {type ActionFunctionArgs, type LoaderFunctionArgs} from 'react-router';

// // Handle GET requests gracefully so the server doesn't throw when someone hits the endpoint directly
// export async function loader({ request }: LoaderFunctionArgs) {
//   if (request.method !== 'GET') {
//     return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
//       status: 405,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
//   // Informational response to avoid 400s in logs when this URL is probed via GET
//   return new Response(
//     JSON.stringify({ message: 'Use POST to retrieve a token at this endpoint.' }),
//     { status: 200, headers: { 'Content-Type': 'application/json' } }
//   );
// }

export async function action({request}: ActionFunctionArgs) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({message: 'Method Not Allowed'}), {
            status: 405,
            headers: {'Content-Type': 'application/json'},
        });
    }

    try {
        const data = await request.json();
        const {roomName, participantName} = data ?? {};

        const token = await createToken(roomName, participantName);

        return new Response(
            JSON.stringify({token, roomName, participantName}),
            {status: 201, headers: {'Content-Type': 'application/json'}}
        );
    } catch (e: any) {
        return new Response(
            JSON.stringify({message: 'Unexpected Server Error', error: e}),
            {status: 500, headers: {'Content-Type': 'application/json'}}
        );
    }
}

async function createToken(roomName: string, participantName: string) {
    console.log(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
    )
    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
            identity: participantName,
            ttl: '10m',
        }
    );

    at.addGrant({roomJoin: true, room: roomName});

    return await at.toJwt();
}

