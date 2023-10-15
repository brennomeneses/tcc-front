window.addEventListener("DOMContentLoaded", async () => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const projectId = urlParams.get("projectId") ?? 1;

    const userToken = sessionStorage.getItem('app:userToken');

    const responseRaw = await fetch(`https://photoclub-03.azurewebsites.net/tasks/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    const response = await responseRaw.json()

    console.log(response)

    let projectCard = '';
    let projectModal = '';

    response.map(e => {
      console.log()
      projectCard = projectCard + `
      <div class="task contentCard normalStatusCard" draggable="true">
        <p class="IdActivity">ID#${e.id}</p><hr>
        <div class="cardUser">
          <div class="userProfilePicAreaActivity"></div>
          <div class="cardUserProfileInfoAreaActivity">
            <p class="text-start ActivityOwnerName">${e.user.role}</p>
            <h5 class="text-start ActivityOwnerName cardUsername">${e.user.name}</h5>
          </div>                    
        </div>
        <button class="btnBottom projectCardButton buttonStyle smallButton col-12" data-bs-toggle="modal" data-bs-target="#projectInformationModal${e.id}">Informações</button>
        <div class="cardUserProfileDateArea">
          <div class="row ProjectDates">
            <div class="col-4">
              <p class="CardProjectDate">I: ${new Date(e.initial_date).toLocaleDateString()}</p>  
            </div>
            <div class="col-4">
              <p class="CardProjectDate">E: ${new Date(e.estimated_date).toLocaleDateString()}</p>
            </div>
            <div class="col-4">
              <p class="CardProjectDate">F: ${e.final_date != null ? new Date(e.final_date).toLocaleDateString() : "00/00/0000"} </p>
            </div>
          </div>
        </div>
        <!-- This div is null from default, and it must be filled wherever the project has an issue -->
        <div id="projectWarning">
          <!-- Every project with a warning must contain this paragraph (styled as delayedAlert) with the corresponding issue -->
        </div>
      </div>
      `

      projectCard = projectCard + `
      <div class="modal fade" id="projectInformationModal${e.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">
              <br><span class="projectStakeholderModal">Responsável: <span id="stakeholderName">${e.user.name}</span></span></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h6>Data Inicial: <span class="fw-normal">${new Date(e.initial_date).toLocaleDateString()}</span></h6>
              <div class="d-flex justify-content-left">
                <div class="row g-3 align-items-center">
                  <div class="col-auto">
                    <h6>Data Estimada: </h6>
                  </div>
                  <div class="col-auto">
                    <input type="date" value="${new Date(e.estimated_date).toISOString().split("T")[0]}">
                  </div>
                </div>
              </div>
              <h6>Data Final:<span class="fw-normal"> ${e.final_date != null ? new Date(e.final_date).toLocaleDateString() : "--"} </span></h6><br>
              <div class="row justify-content-start">
                <div class="col-6"><button type="button" data-bs-dismiss="modal" class="buttonStyle CancelbuttonStyle bigButton">Cancelar</button></div>
                <div class="col-6"><button type="submit" class="buttonStyle SavebuttonStyle bigButton">Salvar</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    })

    document.querySelector('#backlog .swim-lane.colContent').innerHTML = projectCard
  } catch (error) {
    console.log(error)
  }
})