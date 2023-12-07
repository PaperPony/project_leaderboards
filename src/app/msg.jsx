export function Message({ coins }) {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "message",
      function (evt) {
        sendMessage("**Connection Established**");
        sendMessage({ coins: coins });
        console.log(evt.data);
      },
      false
    );
  }
  return null;
}

export function sendMessage(msg) {
  console.log("msg sent!");
  document.getElementById("app-frame").contentWindow.postMessage(msg);
}
