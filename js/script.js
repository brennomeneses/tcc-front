$(document).ready(function(){
  updateSystemTime();
});

function updateSystemTime(){
  var weekdays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');

  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  var year = date.getFullYear();
  var formattedDate = day + '/' + month + '/' + year;

  $("#currentDay").html(weekdays[date.getDay()] + " - " + formattedDate);
  $("#currentTime").html(hour + ":" + min);

}

function newMeeting(){
  location.href = "portfolioManagerNewMeeting.html";
}

function scheduleMeeting(){
  location.href = "portfolioManagerMeetingScheduled.html";
}
function portfolioManagerMainPage(){
  location.href = "portfolioManagerMainPage.html";
}
function newCriteria(){
  // do some stuff
}

function newProject(){
  // do some stuff
}
