(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

console.log("Running Code for the video repeater");
var myVideo=document.getElementsByTagName("video");
var i=0;
while(++i<myVideo.length){
  
  if (typeof myVideo[0].loop == 'boolean') { // loop supported
    myVideo[0].loop = true;
    console.log("Enabled loop");
  } else { // loop property not supported
    console.log("Enabled Manual loop");
    myVideo[0].addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }




 }




 return true;
})();



