

browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96disabled.png")});
var LooperTabIds=new Array();

function notify(message,iconUrl= browser.extension.getURL("icons/icon96.png")) {
  console.log("Displaying message");
  browser.notifications.create("temp-notification",{
    "type": "basic",
    "iconUrl": iconUrl,
    "title": "Video Repeater",
    "message": message
  });
  setTimeout(function(){ browser.notifications.clear("temp-notification");}, 4000);
}

function onSuccess(id) {
  console.log("Videos on this page will auto repeat from now");
  notify("Videos on this page will auto repeat from now");
  browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96.png")});
}

function onFail(error) {
  console.log("Auto repeat failed please contact support with this page link");
  notify("Auto repeat failed please contact support with this page link");
}

function onError(error) { //Generic On error Function
  console.log(`Error: ${error}`);
}

console.log("Video Repeater Started");
browser.browserAction.onClicked.addListener(onButtonClickedFunction);

browser.tabs.onActivated.addListener(handleActivated);
function handleActivated(activeInfo) {
  console.log("Tab " + activeInfo.tabId +" was activated");
  if( LooperTabIds.includes(activeInfo.tabId)  ){
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96.png")});
  } 
  else{
    browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96disabled.png")});
  }      
}


function GetUniqueArray(inputArray){
  return inputArray.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
}



function onButtonClickedFunction(){ 
  browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
  .then(tabs => browser.tabs.get(tabs[0].id))
  .then(tab => {
    console.info(tab);
    var result=browser.tabs.executeScript({
      file: "repeatStart.js"
    });
    result.then(function(id){
      LooperTabIds[LooperTabIds.length]=tab.id;
      console.log("Added Tab id to looperIds"+tab.id );
      console.log(LooperTabIds);
      LooperTabIds=GetUniqueArray(LooperTabIds)
      console.log(LooperTabIds);
      notify("Videos on this" +tab.title + " will auto repeat from now");
      browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96.png")});
},onFail);

  });
  return;
  
}
  
  