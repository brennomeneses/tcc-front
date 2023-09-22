window.addEventListener("DOMContentLoaded", async ()=> {
    sessionStorage.removeItem("app:ProjectCache")

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

    console.log(formValues)
    })
})
