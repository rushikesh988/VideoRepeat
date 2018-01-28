(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  function SetVideoOnRepeat(){
      console.log("Running Code for the video repeater");
      try{
        var myVideo=document.getElementsByTagName("video");
        var i=0;
        while(i<myVideo.length){
          if (typeof myVideo[i].loop == 'boolean') { // loop supported
            myVideo[i].loop = true;
            console.log("Enabled loop");
          } else { // loop property not supported
            console.log("Enabled Manual loop");
            myVideo[i].addEventListener('ended', function () {
              this.currentTime = 0;
              this.play();
                  }, false);
          }
        i++;
        }
         return true;
    }
    catch(error) {
      console.log("Error in SetVideoOnRepeat "+ error);
      return false;
      }
  }

  function SetVideoOffRepeat(){
    console.log("Running Code for turning off video repeater");
    try{
    var myVideo=document.getElementsByTagName("video");
    var i=0;
    while(i<myVideo.length){
      if (typeof myVideo[i].loop == 'boolean') { // loop supported
        myVideo[i].loop = false;
        console.log("Enabled loop");
      } else { // loop property not supported
        console.log("Enabled Manual loop");
        myVideo[i].addEventListener('ended', function () {
          
              }, false);
      }
    i++;
    }
    return true;
  }
  catch(error) {
    console.log("Error in SetVideoOffRepeat "+ error);
    return false;
    }
  }


function getFavicon(){
  console.log("Message from the background script:");
  var favicon = undefined;
  var nodeList = document.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++)
  {
      if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
      {
          favicon = nodeList[i].getAttribute("href");
      }
  }
  return favicon;
}


  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "turnon") {
      var returnValue= SetVideoOnRepeat();
      return Promise.resolve({response: returnValue});
    } else if (message.command === "turnoff") {
      var returnValue=SetVideoOffRepeat();
      return Promise.resolve({response: returnValue});
    }
    else if (message.command === "favicon") {
      var favicon=  getFavicon();
      return Promise.resolve({response: favicon});
    }
});



})();



