window.addEventListener("DOMContentLoaded", async ()=> {
    sessionStorage.removeItem("app:ProjectCache")

    const token = sessionStorage.getItem("app:userToken")

    const responseRaw = await fetch("https://photoclub-03.azurewebsites.net/users", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const response = await responseRaw.json()

    response.forEach((e) => {
      const option = document.createElement("option")
      option.value = e.id
      option.text = e.name
      document.getElementById("newProjectSelectProjectManager").add(option)
    })
    

    document.getElementById('basicInfoProject').addEventListener('submit', (event) => {
      event.preventDefault()
  
      const formData = new FormData(event.target)

      const formValues = Object.fromEntries(formData)

      sessionStorage.setItem("app:ProjectCache", JSON.stringify({
        name: formValues.newProjectName,
        description: formValues.newProjectDescription,
        stakeholder: formValues.newProjectStakeholder,
        cost: formValues.newProjectEstimatedCost,
        projectManager: formValues.newProjectSelectProjectManager,
        deadline: formValues.newProjectEstimatedDuration,
        dice: {
          teamCapacity: formValues.newProjectDiceTeamCapacity,
          stakeholderCommitment: formValues.newProjectDiceStakeholderCommitment,
          futureUsersCommmitment: formValues.newProjectDiceFutureUsersCommitment
        }
      }))
    })
})
