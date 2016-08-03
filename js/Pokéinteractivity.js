

$("#Instructions").hide();
$("#Me").hide();
$("#drawScore").hide();


jQuery("#scoreBoard").on("click", function() {
    $("#content").empty();
    $("#Instructions").hide(100);
    $("#Me").hide(100);
  if ($("#drawScore").is(":hidden")) {
      $("#drawScore").show(100);
  }  else {
    $("#drawScore").hide(100);
  }
});



      jQuery("#Howto").on("click", function() {
          $("#content").empty();
          $("#drawScore").hide(100);
          $("#Me").hide(100);
        if ($("#Instructions").is(":hidden")) {
            $("#Instructions").show(100);
        }  else {
          $("#Instructions").hide(100);
        }
      });

      jQuery("#creator").on("click", function() {
        $("#content").empty();
        $("#Instructions").hide(100);
        $("#drawScore").hide(100);
        if ($("#Me").is(":hidden")) {
            $("#Me").show(100);
        } else {
          $("#Me").hide(100);
        }

});

function registerScore(score){

  var playerName = prompt("What's your name?");
  var scoreEntry = "<p>" + playerName + ":" + score.toString() + "</p>";

  $("#drawScore").append(scoreEntry);

  score = 0;

}
