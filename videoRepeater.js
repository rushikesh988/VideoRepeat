
function notify(message) {
  console.log("Displaying message");
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/icon48.png"),
    "title": "Video Repeater",
    "message": message
  });
}

function onSuccess(id) {
  console.log("Videos on this page will auto repeat from now");
  notify("Videos on this page will auto repeat from now");
  
}

function onFail(error) {
  console.log("Auto repeat failed please contact support with this page link");
  notify("Auto repeat failed please contact support with this page link");
}


console.log("Video Repeater Started");
browser.browserAction.onClicked.addListener(onButtonClickedFunction);
function onButtonClickedFunction(){ 
  var result=browser.tabs.executeScript({
      file: "repeatStart.js"
    });
    aray.then(onSuccess, onFail);
    return;
  }
  
  