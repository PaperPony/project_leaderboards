export function Message({coins}) {
  if (typeof window !== "undefined") {
    window.addEventListener("message", function(){
      sendMessage("**Connection Establish**");
      sendMessage({coins:coins});
  }, false);
  }
  return null;
}

export function sendMessage(msg) {
  console.log("msg sent!");
  document.getElementById('app-frame').contentWindow.postMessage(msg);
}