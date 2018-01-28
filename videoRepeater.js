console.log("Video Repeater Started");
browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96disabled.png")});
var LooperTabIds=new Array();
var contentScriptInjectTabs=new Array();


browser.browserAction.onClicked.addListener(onButtonClickedFunction);
browser.tabs.onActivated.addListener(handleActivated);
browser.tabs.onUpdated.addListener(handleUpdated);


function notify(message,title="Video Repeater", iconUrl= browser.extension.getURL("icons/icon96.png")) {
  browser.notifications.create("temp-notification",{
    "type": "basic",
    "iconUrl": iconUrl,
    "title": title,
    "message": message
  });
  setTimeout(function(){ browser.notifications.clear("temp-notification");}, 4000);
}

function onError(error) { //Generic On error Function
  console.log(`Error: ${error}`);
}

function handleUpdated(tabId, changeInfo, tabInfo) {

      if(contentScriptInjectTabs.includes(tabId)){
        contentScriptInjectTabs=contentScriptInjectTabs.filter(item => ![tabId].includes(item));
        if(LooperTabIds.includes(tabId)){
          LooperTabIds = LooperTabIds.filter(item => ![tabId].includes(item));
          notify("Due to refresh on " + tabInfo.title + " videos will not repeat, click video looper icon again to start repeating ");
          browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96disabled.png")}); 
        }
      }
}


function handleActivated(activeInfo) {
  console.log("Tab " + activeInfo.title +" was activated");
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
   // console.info(tab);
    if(contentScriptInjectTabs.includes(tab.id)){
      if(LooperTabIds.includes(tab.id)){
        browser.tabs.sendMessage(tab.id, {
          command: "turnoff",
        }).then(response => {
        console.log("Video Repeat Turned OFF:"+ response.response);
        LooperTabIds = LooperTabIds.filter(item => ![tab.id].includes(item))
        //console.log(LooperTabIds);
        notify("Videos on" +tab.title + " will not repeat ");
        browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96disabled.png")}); 
      }).catch(onError);
      
    }
    else{
      browser.tabs.sendMessage(tab.id, {
        command: "turnon",
      }).then(response => {
      console.log("Video Repeat Turned ON:"+ response.response);
      LooperTabIds[LooperTabIds.length]=tab.id;
      //console.log(LooperTabIds);
      notify("Videos on" +tab.title + " will auto repeat from now");
      browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96.png")}); 
    }).catch(onError);
    }
    }
    else{
    

    var result=browser.tabs.executeScript({
      file: "repeatStart.js"
    });
    result.then(function(id){  
      contentScriptInjectTabs[contentScriptInjectTabs.length]=tab.id;
      contentScriptInjectTabs=GetUniqueArray(contentScriptInjectTabs);
      browser.tabs.sendMessage(tab.id, {
        command: "turnon",
      }).then(response => {
      console.log("Video Repeat Turned ON:"+ response.response);
      LooperTabIds[LooperTabIds.length]=tab.id;
      //console.log(LooperTabIds);
      notify("Videos on" +tab.title + " will auto repeat from now");
      browser.browserAction.setIcon({path: browser.extension.getURL("icons/icon96.png")}); 
    }).catch(onError);
},function(error){
  notify("Auto repeat failed please contact support with this page link");
  onError(error);
});
    }

  });
  return;
}

 
  

  
  