import Alert from "./components/alert.js";
export default class View {
  constructor() {
    this.inputName = document.getElementById("inputName");
    this.inputStart = document.getElementById("inputStart");
    this.formProfile = document.getElementById("formProfile");
    this.formChats = document.getElementById("formChats");
    this.inputSendChat = document.getElementById("inputSendChat");
    this.inputMessage = document.getElementById("inputMessage");
    this.inputSend = document.getElementById("inputSend");
    this.containerGlobal = document.getElementById("container__global");
    this.alert = new Alert("alert");
    this.alertChat = new Alert("alert-chat");
    this.fullName = null;
    this.model = null;
  }

  render() {
    this.inputStart.addEventListener("click", () => {
      this.userProfileForm();
    });

    this.containerGlobal.addEventListener("keypress", (e) => {
      const keyCode = e.key;
      const hidden = formProfile.classList.contains("hidden");
      if (keyCode == "Enter") {
        if (hidden == false) {
          this.userProfileForm();
        } else {
          this.formChat();
        }
      }
    });

    this.inputSend.addEventListener("click", () => {
      this.formChat();
    });
  }

  setModel(model) {
    this.model = model;
  }

  userProfileForm() {
    if (inputName.value === "") {
      this.alert.show("The name field is required");
    } else {
      this.fullName = this.inputName.value;
      this.viewChat();
    }
  }

  viewChat() {
    this.formProfile.classList.add("hidden");
    this.formChats.classList.remove("hidden");
    this.inputSendChat.classList.remove("hidden");
    this.model.webWorker();
  }

  async htmlChat() {
    const data = await this.model.data();
    const fragment = this.createChatHTML(data);
    formChats.appendChild(fragment);
  }

  createChatHTML(res) {
    let frament = document.createDocumentFragment();
    if (res.received == false) {
      let chat = document.createElement("div");
      chat.classList.add("container__chat-sender");
      chat.innerHTML = `
      <div class="container__flex-sender">
        <span class="profile-span">${res.name}</span>
        <div class="chat-message">
        ${res.message}
        </div>
      </div>
      `;
      frament.appendChild(chat);
    } else {
      let chat = document.createElement("div");
      chat.classList.add("container__chat-transmitter");
      chat.innerHTML = `
      div class="container__flex-transmitter">
          <span class="profile-span-transmitter">${res.name}</span>
          <div class="chat-message">
           ${res.message}
          </div>
        </div>
      `;
      frament.appendChild(chat);
    }

    return frament;
  }

  formChat() {
    if (inputMessage.value.length < 4 || inputMessage.value === "") {
      this.alertChat.show("The message field is required and length must be 4");
    } else {
      const obj = this.createChat(inputMessage.value);
      const message = this.model.formatData(obj);
      this.model.getChat(message);
      this.htmlChat();
      this.inputMessage.value = "";
    }
  }

  createChat(message) {
    let obj = {
      name: this.fullName,
      message: message,
    };
    return obj;
  }
}
