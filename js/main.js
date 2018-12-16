var audio;

// Hide pause button
$("#pause").hide();

//Initialize Audio
initAudio($("#playlist li:first-child"));

//Initializer Function
function initAudio(element) {
  var song = element.attr("song"); //get the attribute of song
  var title = element.text();
  var cover = element.attr("cover");
  var artist = element.attr("artist");

  //Create Audio object
  audio = new Audio("media/" + song);

  //if the song hasn't started yet
  if (!audio.currentTime) {
    $("#duration").html("0.00"); //if the song is not playing duration, it's gonna displays 0.00
  }
  $("#audio-info .title").text(title); //get the title name
  $("#audio-info .artist").text(artist); //get the artist name

  //Insert Cover
  $("img.cover").attr("src", "img/covers/" + cover);

  $("#playlist li").removeClass("active");
  element.addClass("active");
}

//Play Button
$("#play").click(function() {
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400); //fadeIn()gradually changes the opacity, for selected elements, from hidden to visible (fading effect).
  showDuration();
});

//Pause Button
$("#pause").click(function() {
  audio.pause();
  $("#pause").hide();
  $("#play").show();
});

//Stop Button
$("#stop").click(function() {
  audio.pause();
  audio.currentTime = 0;
  $("#pause").hide();
  $("#play").show();
  $("#duration").fadeOut(400);
});

//Next Button
$("#next").click(function() {
  audio.pause();
  var next = $("#playlist li.active").next();
  if (next.length == 0) {
    next = $("#playlist li:first-child");
  }
  initAudio(next);
  audio.play();
  showDuration();
});

//Prev Button
$("#prev").click(function() {
  audio.pause();
  var prev = $("#playlist li.active").prev();
  if (prev.length == 0) {
    prev = $("#playlist li:last-child");
  }
  initAudio(prev);
  audio.play();
  showDuration();
});

//Playlist Song Click
$("#playlist li").dblclick(function() {
  audio.pause();
  initAudio($(this));
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  audio.play();
  showDuration();
});

//Volume Control
$("#volume").change(function() {
  audio.volume = parseFloat(this.value / 10);
});

//Time Duration
function showDuration() {
  // bind() method attaches one or more event handlers for selected elements, and specifies a function to run when the event occurs.
  $(audio).bind("timeupdate", function() {
    // Get hours and minutes
    // The parseInt() function parses a string and returns an integer. Only the first number in string is returned
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime / 60) % 60);
    //Add 0 if seconds less than 10
    if (s < 10) {
      s = "0" + s;
    }
    $("#duration").html(m + ":" + s);
    var value = 0;
    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime); // rounds a number downwards to the nearest integer
    }
    $("#progress").css("width", value + "%"); //calculating the percentage of progress bar

    //After song ends play next song
    if (audio.currentTime >= audio.duration) $("#next").trigger("click");
  });
}
