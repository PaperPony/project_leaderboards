export function Message({ coins }) {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "message",
      function (evt) {
        sendMessage("**Connection Established**");
        sendMessage({ coins: coins });
      },
      false
    );
  }
  return null;
}

export function sendMessage(msg) {
  document.getElementById("app-frame").contentWindow.postMessage(msg);
}
