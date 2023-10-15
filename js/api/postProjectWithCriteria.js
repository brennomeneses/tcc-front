window.addEventListener("DOMContentLoaded", async ()=> {
  document.getElementById("finish").addEventListener("click", async () => {
    const { 
      name, 
      description, 
      cost, 
      deadline, 
      dice, 
      projectManager, 
      stakeholder 
    } = JSON.parse(sessionStorage.getItem("app:ProjectCache"))
  
    const acessToken = sessionStorage.getItem("app:userToken")
  
    const criterias = [...document.querySelectorAll('.form-select.inputStyle.form-select-lg.selectList')]
    const criteriaValues = criterias.map(e => {
      return({
        level: e.value, 
        criterionId: parseInt(e.id.replace("newProjectDiceStakeholderCommitment", ""))
      })
    })
  
    console.log(criteriaValues)
  
    const body = {
      name,
      description,
      stackeholder: stakeholder,
      deadline,
      dice,
      grade: 0,
      price: cost,
      userIds: [parseInt(projectManager)],
      effort: criteriaValues
    }
  
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${acessToken}`
      },
      body: JSON.stringify(body)
    }

    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/projects', options)

    if(responseRaw.ok) {
      sessionStorage.removeItem("app:ProjectCache")
      location.href = "portfolioManagerMainPage.html"
    }
  })
})
