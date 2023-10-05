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
      <button class="btnBottom buttonStyle smallButton col-12" data-bs-toggle="modal" data-bs-target="#projectInformationModal">Informações do Projeto</button>
      <!-- This div is null from default, and it must be filled wherever the project has an issue -->
      <div id="projectWarning">
        <!-- Every project with a warning must contain this paragraph (styled as delayedAlert) with the corresponding issue -->
        ${new Date(project.deadline) < new Date() ? '<p class="delayedAlert">PROJETO ATRASADO</p>' : '' }
      </div>
    </div>
    `
  })

  document.querySelector('#backlog .swim-lane.colContent').innerHTML = projectCard
  
  console.log(response)

  } catch(error) {
    console.log(error)
  }
});