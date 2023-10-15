window.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("app:userToken")

  const participantList = []
  const projectsList = []

  const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/users', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const response = await responseRaw.json()

  const select = document.getElementById("participant")

  response.forEach(element => {
    const option = document.createElement("option")
    option.text = element.name
    option.value = element.id
    option.id = element.name
    select.add(option)
  });

  const selectProject = document.getElementById("projects")

  const responseProjectRaw = await fetch('https://photoclub-03.azurewebsites.net/projects', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const responseProject = await responseProjectRaw.json()

  responseProject.forEach(element => {
    const option = document.createElement("option")
    option.text = element.name
    option.value = element.id
    option.id = element.name
    selectProject.add(option)
  });
  
  document.getElementById("btnAddParticipant").addEventListener("click", () => {

    const participant = {
      id: select.value, 
      name: select.options[select.selectedIndex].text
    };

    console.log()
    
    if(participantList.some(el => el.id === participant.id)) return

    participantList.push(participant)

    document.getElementsByClassName("participantes")[0].innerHTML = participantList.map((e)=> {
      return `
      <div class="d-flex justify-content-center">
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <h5 class="invitedName">${e.name}</h5>
          </div>
          <div class="col-auto">
            <button type="submit" class="buttonStyle">Remover</button>
          </div>
          <hr>
        </div>
      </div>
      `
    }).join("\n")
  })

  document.getElementById("btnAddProject").addEventListener("click", () => {
    const project = {
      id: selectProject.value, 
      name: selectProject.options[selectProject.selectedIndex].text
    };
    
    
    if(projectsList.some(el => el.id === project.id)) return
    
    projectsList.push(project)

    document.getElementsByClassName("projectsContainer")[0].innerHTML = projectsList.map((e)=> {
      return `
      <div class="d-flex justify-content-center">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <h5 class="projectName" id="projectNameList">${e.name}</h5>
              </div>
              <div class="col-auto">
                <button type="submit" class="buttonStyle bigButton bigButtonbuttonSide" id="projectInformationList" data-bs-toggle="modal" data-bs-target="#projectInformationModal">Informações</button>
                <button type="submit" class="buttonStyle bigButton buttonSide" id="projectUpdate">Atualizar Cenário</button>
                <button type="submit" class="buttonStyle buttonSide" id="projectRemoveList">Remover</button>
              </div>
              <hr>
            </div>
          </div>
      `
    }).join("\n")
  })

  document.getElementById("finishMeeting").addEventListener("click", async () => {
    const date = new Date(document.getElementById("meetingDateInput").value).toISOString().replace("T", " ")

    console.log(date)

    if(!(date) || (((participantList || projectsList).length) === 0)) {
      alert("Data, participantes ou projetos faltando")
    } else {
      const body = {
        date,
        projectsId: projectsList.map(e => parseInt(e.id)),
        participantsId: participantList.map(e => parseInt(e.id))
      }

      const reunion = await fetch("https://photoclub-03.azurewebsites.net/reunion", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      if(reunion.ok) {
        location.href = "portfolioManagerMainPage.html"
      }
    }
  })
})