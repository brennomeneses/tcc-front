const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("div");
  newTask.classList.add("contentCard", "normalStatusCard","task");
  newTask.setAttribute("draggable", "true");
    newTask.innerHTML = '<h4>' + value + '</h4><hr>'
                        + '<div class="cardUser"> <div class="cardUserProfilePicArea"></div> <div class="cardUserProfileInfoArea"> <p class="text-start">Cargo do Usuário</p> <h5 class="text-start cardUsername">Nome do Usuário</h5> </div> </div>'
                        + '<button class="btnBottom buttonStyle smallButton col-12" data-bs-toggle="modal" data-bs-target="#projectInformationModal">Informações do Projeto</button>';

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});
