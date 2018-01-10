(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  console.log("Running Code for the video repeater");
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
})();



