$(function () {
  localStorage.clear();
  localStorage.setItem("new", true);
  var userName = localStorage.getItem("userName");
  $("#welcome_text").append(`Choose your battle field ${userName}`);
  // Wake up required APIs
  pingAPI("https://supervillain.herokuapp.com/v1/user");
  gqlFlow();

  $("#worrior_username").keyup(function () {
    if ($("#worrior_username").val().length > 5) {
      document.getElementById("login_popup").style.display = "inline-block";
      $("#login_popup").fadeIn();
      $("#login_popup").html("Only use 10 characters");
    } else {
      $("#login_popup").fadeOut();
    }
  });
});

// Check the button text matches the correct answer
$("#warrior").on("click", function () {
  let uname = document.getElementById("worrior_username").value || "guest";
  createUser(uname);
  gqluserStage(uname);

  console.log("user '" + uname + "' has been created");
  localStorage.setItem("userName", uname);
  localStorage.setItem("score", 0);

  // Handles obsolete elements
  document.getElementById("warrior").style.display = "none";
  document.getElementById("worrior_username").style.display = "none";
  document.getElementById("popup").style.display = "none";

  // Show new elements
  document.getElementById("start").innerHTML = `Start your journey ${uname}`;
  document.getElementById("start").style.display = "inline-block";
});

$("#rego").on("click", function () {
  // Show new elements
  document.getElementById("regomodal").style.display = "inline-block";
});

$("#close").on("click", function () {
  // Show new elements
  document.getElementById("regomodal").style.display = "none";
  document.getElementById("loginmodal").style.display = "none";
});

$("#login").on("click", function () {
  // Show new elements
  document.getElementById("loginmodal").style.display = "inline-block";
});

//WIP

$("#pwd").on("click", function () {
  let uname = document.getElementById("uname").value;
  if (uname.length > 10 || uname.length < 1) {
    document.getElementById("popup").style.display = "inline-block";
    document.getElementById("popup").innerHTML = "Username must be between 1 and 10 characters";
  }
});

$("#signupbtn").on("click", function () {
  // Show new elements
  let uname = document.getElementById("uname").value;
  let pwd = document.getElementById("pwd").value;
  let rePwd = document.getElementById("psw-repeat").value;

  if (pwd === rePwd) {
    bffRegister(uname, pwd);
  } else {
    document.getElementById("popup").style.display = "inline-block";
    document.getElementById("popup").innerHTML = "Passwords do not match";
  }

  alert(`WIP // Still bulding this feature.`);

});

function createUser(user_name) {
  var jsonBody = {
    username: user_name,
    score: 0,
  };
  $.post("/api/adduser", jsonBody).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

// DIRECT API call
function pingAPI(uri) {
  $.get({
    url: uri,
    success: function (res) {
      console.log(res);
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

//--- BFF calls below ---//

function gqlFlow() {
  $.get({
    url: "/api/getflow",
    success: function (res) {
      localStorage.setItem("flow", JSON.stringify(res));
      localStorage.setItem("position", "stage_1");
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

function gqluserStage(user_name) {
  var flow = JSON.parse(localStorage.getItem("flow"));
  var jsonBody = {
    username: user_name,
    stage: flow.stage_1,
  };
  $.post({
    url: "/api/userstage",
    data: jsonBody,
    success: function (res) {
      console.log(res);
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(err);
  });
}

function bffRegister(user_name, pwd) {
  var jsonBody = {
    username: user_name,
    password: pwd,
  };
  $.post({
    url: "/api/registeruser",
    data: jsonBody,
    success: function (res) {
      console.log(res);
      document.getElementById("regomodal").style.display = "none";
      document.getElementById("loginmodal").style.display = "inline-block";
      document.getElementById("worrior_username").defaultValue = jsonBody.username;
    },
  }).fail(function (jqXHR, textStatus, err) {
    console.log("API reponse is " + jqXHR.status);
    console.log(textStatus);
    console.log(jqXHR.responseText);
    document.getElementById("popup").style.display = "inline-block";
    document.getElementById("popup").innerHTML = "User already exists";
  });
}
