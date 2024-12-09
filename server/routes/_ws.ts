import {serverUtils} from "~~/utilities/ServerUtils";

export default defineWebSocketHandler({
    open(peer) {
        const resultQueries = serverUtils.parseWebsocketQueries(peer.url.split('?')[1])

        console.log(resultQueries)
        peer.send('Secure Connection Stablished');

    },
    message(peer, message) {
        if (message.text().includes("ping")) {
            peer.send({user: "server", message: "pong"});
        } else {
            const msg = {
                user: peer.toString(),
                message: message.toString(),
            };
            peer.send(msg); // echo
            peer.publish("chat", msg);
        }
    },

    close(peer) {
        peer.unsubscribe("chat");
        peer.publish("chat", {user: "server", message: `${peer} left!`});
    },
});

