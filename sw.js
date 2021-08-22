self.addEventListener("activate", (e) => {
  console.log("activate el servicio");
});

/* self.addEventListener("message", (event) => {
  // Select who we want to respond to
  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients
        // array is ordered by last focused
        clients[0].postMessage(event.data);
      }
    });
}); */

self.addEventListener("message", function (event) {
  send_message_to_all_clients(event.data);
});

function send_message_to_client(client, msg) {
  client.postMessage(msg);
}

function send_message_to_all_clients(msg) {
  clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      clients.forEach((client) => {
        send_message_to_client(client, msg);
      });
    });
}
