/*developed by Codegena
ALL RIGHTS RESERVED
*/
// https://developers.google.com/youtube/player_parameters?hl=en#Parameters

var pMODE = "";
var filler = "";
var player = "";

swal.setDefaults({
  confirmButtonColor: '#FF5F6E'
});

//%%%%%%%%%%%%%%%%%%% ASYNC PLAYER CHECK %%%%%%%%%%%%%%%%%%%%%%%%

async.onchange = function() {
  var val = (async.checked == true) ? 1 : 0;
  if (val == 1) {
    responsive.checked = true;
    thumbnail.disabled = false;
    playerType.disabled = autoplay.checked = true;
  } else if (val == 0) {
    thumbnail.disabled = true;
    playerType.disabled = autoplay.checked = false;
  }
}
autoplay.onchange = function() {
  if (async.checked == true && autoplay.checked == false) {
    swal("Autoplay=Disabled", "Disabling autoplay for ASYNC player would cause 'double click to play' behaviour", "warning");
  }
}

//$$$$$$$$$$$$$ HEIGHT & WIDTH FUNCTION $$$$$$$$$$$$$$$$$$
var timer;

function calcSize() {
  var height = document.getElementById("height").value;
  var width = document.getElementById("width").value;
  if (height != "") {
    document.getElementById("width").placeholder = "Autocalculate in 1.5s";
  } else if (width != "") {
    document.getElementById("height").placeholder = "Autocalculate in 1.5s";
  } else if (height == "" && width == "") {
    document.getElementById("width").placeholder = "Width (px)";
    document.getElementById("height").placeholder = "Height (px)";
  }
  clearTimeout(timer);
  timer = setTimeout(function validate() {
    if (height == "" && width != "") {
      clearTimeout(timer);
      document.getElementById("height").value = Math.round(width / 1.7);
    } else if (height != "" && width == "") {
      clearTimeout(timer);
      document.getElementById("width").value = Math.round(height * 1.7);
    }
  }, 1500);

} //$$$$$$$$$$$$$ HEIGHT & WIDTH FUNCTION END $$$$$$$$$$$$$$$$$$

//############ MAIN FUNCTION START ##########################
function youtubeEmbedCode() {

  var videoID = document.getElementById("videoID").value;
  var height = document.getElementById("height").value;
  var width = document.getElementById("width").value;
  var responsive = document.getElementById("responsive");
  var playerType = document.getElementById("playerType").value;
  var theme = "&theme=" + document.getElementById("theme").value;
  var barColor = document.getElementById("color");
  var autoplay = document.getElementById("autoplay");
  var keyboard = document.getElementById("disablekb");
  var autohide = "&autohide=" + document.getElementById("autohide").value;
  var captions = document.getElementById("showcc");
  var logo = document.getElementById("logo");
  var fullscreen = document.getElementById("fullscreen");
  var playlist = document.getElementById("playlist");
  var showinfo = document.getElementById("showinfo");
  var related = document.getElementById("relatedvideo");
  var start = document.getElementById("start");
  var stop = document.getElementById("stop");
  var annotation = document.getElementById("annotation");
  var thumbnail = document.getElementById("thumbnail");
  var border = document.getElementById("border");
  var preview = document.getElementById('preview');
  var txtOutput = document.getElementById('txtOutput');
  var responsiveCode, divClose, code, params;

  videoID = extractVideoID(videoID);

  if (height == "" && width == "") {
    height = 294;
    width = 500;
  }

  //Responsive Code 
  if (responsive.checked != true) {
    responsiveCode = divClose = "";
  } else {
    responsiveCode = "<style>.codegena{position:relative;width:100%;height:0;padding-bottom:56.27198%;}.codegena iframe{position:absolute;top:0;left:0;width:100%;height:100%;}/*Youtube Embed Code : Created with Love */</style><div class=\"codegena\">";
    divClose = "</div>";
  }
  //Condtional Assignments   
  autoplay = (autoplay.checked == true) ? "&autoplay=1" : "";
  keyboard = (keyboard.checked == true) ? "&keyboard=1" : "";
  captions = (captions.checked == true) ? "&cc_load_policy=1" : "";
  logo = (logo.checked == true) ? "&modestbranding=1" : "";
  border = (border.checked == true) ? "frameborder=\"1\"" : "frameborder=\"0\"";
  fullscreen = (fullscreen.checked == true) ? "&fs=0" : "";
  showinfo = (showinfo.checked == true) ? "&showinfo=0" : "";
  related = (related.checked == true) ? "&rel=0" : "";
  playlist = (playlist.value != "") ? "&playlist=" + playlist.value : "";
  barColor = (barColor.value != "red") ? "&color=white" : "";
  start = (start.value != "") ? "&start=" + timeInS(start.value) : "";
  stop = (stop.value != "") ? "&end=" + timeInS(stop.value) : "";
  annotation = (annotation.value != 1) ? "&iv_load_policy=" + annotation.value : "";
  thumbnail = (thumbnail.value != "") ? " src='" + thumbnail.value + "'" : getThumb(videoID);
  params = "data-params='" + filler + theme + autoplay + barColor + autohide + keyboard + captions + logo + fullscreen + showinfo + related + playlist + start + stop + annotation + "'";

  var async = document.getElementById('async');
  if (async.checked == true) {
    code = "<div class='youtube_codegena' id='" + pMODE + videoID + "' " + params + thumbnail + "style='width:" + width + "px; height:" + height + "px;'></div>" + "<script src='https://arg6063.github.io/Youtube-ToolKit/async_youtube_player.js'></script" + ">";
  } else {
    code = responsiveCode + "<iframe width='" + width + "' height='" + height + "' src=\"https://www.youtube.com/" + playerType + "/" + pMODE + videoID + filler + theme + barColor + autoplay + keyboard + autohide + captions + logo + fullscreen + playlist + showinfo + related + start + stop + annotation + "\"" + border + "></iframe>" + divClose;
  }
  //Backlink Code  
  code += "<div style='font-size: 0.8em'><a href='https://www.nocodingguru.com/'>Created with Love</a></div>";

  //Prints "no preview " message for ajax and flash players
  if (playerType == 'v' || async.checked == true) {
    preview.innerHTML = "<p>Preview may not work with flash player & Async Player!</p><br/>";
    preview.innerHTML += code;
  } else {
    preview.innerHTML = code;
  }
  txtOutput.value = code;

} // Main Function Close

//############ EXTRACT VIDEO/PLAYLIST ID ################

function extractVideoID(vidID) {
  if (vidID == "" || vidID.length < 11) {
    sweetAlert("Error", "No video ID detected.Please enter a video/playlist URL. Placeholder video is used.", "error");
    pMODE = "";
    return "ffiJNSy8CBA?";
  }
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = vidID.match(regExp);
  var list = vidID.match("list=([a-zA-Z0-9\-\_]+)&?");
  list = list ? list[1] : "";
  if (match && match[7].length == 11) {
    pMODE = "";
    filler = "?";
    return (match[7]);
  } else if (list != "") {
    pMODE = "videoseries?list=";
    filler = "";
    return list;
  } else {
    swal("Oops..", "Could not extract video/playlist ID", "error");
    return "VIDEO_ID";
  }
}

function getThumb(vidID) {
  if (vidID.length == 11 || vidID.length < 14) {
    return " src='http://i.ytimg.com/vi/" + vidID + "/hqdefault.jpg'";
  } else {
    return " src='https://blogger.googleusercontent.com/img/a/AVvXsEjtijRTNC6M5CrsFL5_L10xZPeaQ7tVsVLR1zQSxiOH-H4xqd67PXkfMBOfe9PaxvJMtxMZ8tmrIKh4QwOq4dHr27-gqqIHjJp8tmzA6DH67KVWdLYPfJE4QbpEfhtG3llcRqIMKuUuHRgbNWuNrIlVaDfAS_qQcfqRkarX34BHlSAXRsOTGTQM7h5XkA=s16000'";
  }
}

function timeInS(str) {
  var p = str.split(':'),
    s = 0,
    m = 1;
  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }
  return s;
}

//############SELECT ALLt#########################
function SelectAll(txtOutput) {
  document.getElementById(txtOutput).focus();
  document.getElementById(txtOutput).select();
}

//############ RESET ##########################
function refresh() {
  var allChildNodes = document.getElementById("optionals").getElementsByTagName('*');
  for (var i = 0; i < allChildNodes.length; i++) {
    allChildNodes[i].disabled = false;
  }
  document.getElementsByTagName("form")[0].reset();
  document.getElementById("preview").innerHTML = "You will see preview here";

};
