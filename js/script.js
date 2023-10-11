$(document).ready(function(){
  updateSystemTime();
  addSelectedProjectsToMatrix();
  listenToSelectProjectEvent();
  listenToKeyProjectEvents();
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
  location.href = "portfolioManagerNewCriteria.html";
}

function newProject(){
  location.href = "portfolioManagerNewProjectPartOne.html";
}

function returnNewProjectPartOne(){
  location.href = "portfolioManagerNewProjectPartOne.html";
  // Must retrieve all information gathered during part one conclusion
}

function newProjectPartTwo(){
  location.href = "portfolioManagerNewProjectPartTwo.html";
}

function addNewProject(){
  // Do some stuff
  location.href = "portfolioManagerMainPage.html";
}

// ROW 1 - 6
// COL 1 - 10
var selectedProjects = [
  {
    position: "row1Col1",
    name: "Primeiro Projeto",
    description: "Descrição do primeiro projeto descrição do primeiro projeto  descrição do primeiro projeto  descrição do primeiro projeto  descrição do primeiro projeto  descrição do primeiro projeto  descrição do primeiro projeto ",
    stakeholder: "Nome do Stakeholder",
    dice: "Dice projeto 1",
    cost: 12000
  },
  {
    position: "row6Col10",
    name: "Último Projeto",
    description: "Descrição do último projeto descrição do último projeto  descrição do último projeto  descrição do último projeto  descrição do último projeto  descrição do último projeto  descrição do último projeto ",
    stakeholder: "Nome do Stakeholder",
    dice: "Dice projeto 2",
    cost: 51265
  },
  {
    position: "row3Col5",
    name: "Projeto do Meio",
    description: "Descrição do Projeto",
    stakeholder: "Nome do Stakeholder",
    dice: "Dice projeto 3",
    cost: 27000
  },
  {
    position: "row1Col10",
    name: "Projeto do Topo",
    description: "Descrição do Projeto",
    stakeholder: "Nome do Stakeholder",
    dice: "Dice projeto 4",
    cost: 15000
  }
];

function addSelectedProjectsToMatrix(){
  // Prevent memory dump issues
  $(".matrixGrid").html("");
  $(".projectsMatrixPage").html("");
  // Matrix format is 6x10
  // The higher the line number, the lower the benefit of the project
  // The higher the column number, the higher the effort of the project

  for (i = 1; i < 7; i++){
    for (j = 1; j < 11; j++){
      $(".matrixGrid").append('<div class="matrixItem" id="row'+i+'Col'+j+'"></div>');
    }
  }
  if (selectedProjects.length == 0){
    location.href = "portfolioManagerMainPage.html";
  }
  for (i = 0; i < selectedProjects.length; i++) {
    const project = selectedProjects[i];

    $("#" + project.position).html(project.name).addClass("matrixItemAdded " + project.position);
    $(".projectsMatrixPage").append('<div id="'+project.position+'" class="projectMatrixPageList"><h4 class="text-center projectText">'+project.name+'</h4></div>');

  }

  $("#matrixPageSelectedProjectName").html(selectedProjects[0].name);
  $("#matrixPageSelectedProjectDescription").html(selectedProjects[0].description);
  $("#matrixPageSelectedProjectStakeholder").html(selectedProjects[0].stakeholder);
  $("#matrixPageSelectedProjectDICE").html(selectedProjects[0].dice);
  $("#matrixPageSelectedProjectCost").html("R$ "+ selectedProjects[0].cost);

  listenToSelectProjectEvent();
  listenToKeyProjectEvents();

}

var currentSelectedProject = selectedProjects[0].position;

function listenToSelectProjectEvent(){
  for (i = 0; i < selectedProjects.length; i++) {
    const project = selectedProjects[i];
    $("#" + project.position).click(function(){
      currentSelectedProject = project.position;
      $(this).addClass("projectListSelected");
      $("#matrixPageSelectedProjectName").html(project.name);
      $("#matrixPageSelectedProjectDescription").html(project.description);
      $("#matrixPageSelectedProjectStakeholder").html(project.stakeholder);
      $("#matrixPageSelectedProjectDICE").html(project.dice);
      $("#matrixPageSelectedProjectCost").html("R$ "+ project.cost);
    });

    $("." + project.position).click(function(){
      currentSelectedProject = project.position;
      $(this).addClass("projectListSelected");
      $("#matrixPageSelectedProjectName").html(project.name);
      $("#matrixPageSelectedProjectDescription").html(project.description);
      $("#matrixPageSelectedProjectStakeholder").html(project.stakeholder);
      $("#matrixPageSelectedProjectDICE").html(project.dice);
      $("#matrixPageSelectedProjectCost").html("R$ "+ project.cost);
    });


  }
}

function listenToKeyProjectEvents(){
  $("#removeProject").click(function(){
    const filteredProjects = selectedProjects.filter(project => project.position !== currentSelectedProject);
    selectedProjects = filteredProjects;
    addSelectedProjectsToMatrix();
    listenToSelectProjectEvent();
    listenToKeyProjectEvents();
  });

  $("#cancelProject").click(function(){
    const filteredProjects = selectedProjects.filter(project => project.position !== currentSelectedProject);
    selectedProjects = filteredProjects;
    addSelectedProjectsToMatrix();
    listenToSelectProjectEvent();
    listenToKeyProjectEvents();
  });

  $("#approveProject").click(function(){
    const filteredProjects = selectedProjects.filter(project => project.position !== currentSelectedProject);
    selectedProjects = filteredProjects;
    addSelectedProjectsToMatrix();
    listenToSelectProjectEvent();
    listenToKeyProjectEvents();
  });
}
