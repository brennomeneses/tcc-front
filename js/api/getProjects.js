window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userToken = sessionStorage.getItem('app:userToken');

    console.log(userToken)

    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/projects/', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })

  const response = await responseRaw.json()

  let projectCard = '';
  let projectModal = '';

  response.map((project) => {
    projectCard = projectCard + `
      <div class="task contentCard ${new Date(project.deadline) < new Date() ? 'delayedStatusCard' : 'normalStatusCard' }" draggable="true">
      <h4>${project.name}</h4><hr>
      <div class="cardUser">
        <div class="cardUserProfilePicArea"></div>
        <div class="cardUserProfileInfoArea">
          <p class="text-start">${project.projectManager.name}</p>
          <h5 class="text-start cardUsername">${project.projectManager.role}</h5>
        </div>
      </div>
      <button class="btnBottom buttonStyle smallButton col-12" data-bs-toggle="modal" data-bs-target="#projectInformationModal${project.id}">Informações do Projeto</button>
      <!-- This div is null from default, and it must be filled wherever the project has an issue -->
      <div id="projectWarning">
        <!-- Every project with a warning must contain this paragraph (styled as delayedAlert) with the corresponding issue -->
        ${new Date(project.deadline) < new Date() ? '<p class="delayedAlert">PROJETO ATRASADO</p>' : '' }
      </div>
    </div>
    `

    projectModal = projectModal + `
    <div class="modal fade" id="projectInformationModal${project.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"><span id="projectTitleModal">${project.name}</span>
            <br><span class="projectStakeholderModal">Stakeholder: <span id="stakeholderName">${project.stackeholder}</span></span></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>Descrição do Projeto:</h6>
            <p>${project.description}</p>
            <h6>Custo Estimado: <span class="fw-normal">${project.price}</span></h6>
            <h6>Data Limite: <span class="fw-normal">${project.deadline}</span></h6><br>
            <div class="row justify-content-start">
              <div class="col-6"><button type="submit" class="buttonStyle bigButton">Visualizar Critérios</button></div>
              <div class="col-6"><button type="submit" class="buttonStyle bigButton">Visualizar DICE</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  })

  document.querySelector('#backlog .swim-lane.colContent').innerHTML = projectCard
  document.getElementById('modalsContainer').innerHTML = projectModal
  
  console.log(response)

  kanbanEvent()

  } catch(error) {
    console.log(error)
  }
});