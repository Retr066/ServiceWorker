export default class Model {
  constructor() {
    this.view = null;
    this.idUser = uuid.v4();
  }
  webWorker() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register("sw.js", { scope: "./" });
      navigator.serviceWorker.ready
        .then((res) => console.log(res.active.state))
        .catch(function (err) {
          console.error("SW registration failed with error " + err);
        });
    }
  }

  getChat(message) {
    if ("serviceWorker" in navigator) {
      this.send_message_to_sw(message);
    }
  }

  setChat() {
    return new Promise(function (resolve, reject) {
      navigator.serviceWorker.onmessage = function (event) {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
          console.log(event.data);
        }
      };
    });
  }

  setView(view) {
    this.view = view;
  }

  formatData(obj) {
    let message = { id: this.idUser, ...obj };
    return message;
  }

  data() {
    const id = this.idUser;
    const promesa = this.setChat()
      .then(function (response) {
        let chat = { ...response, received: response.id != id };
        return chat;
      })
      .catch(function (err) {
        console.log(err);
      });
    return promesa;
  }

  chat(response) {
    let chat = { ...response, received: response.id != this.idUser };
    return chat;
  }

  send_message_to_sw(msg) {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}
