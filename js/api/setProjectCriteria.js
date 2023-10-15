window.addEventListener("DOMContentLoaded", async ()=> {

  const benefit = document.getElementById("benefitCriterias")
  const enforce = document.getElementById("enforceCriterias")

  const apiKey = sessionStorage.getItem("app:userToken")

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };
  
  const responseRaw = await fetch('https://photoclub-03.azurewebsites.net//criteria', options)
  const response = await responseRaw.json()

  let bodyBenefit = ''
  let bodyEnforce = ''

  response.forEach((e) => {
    if(e.is_benefit) {
      bodyBenefit = bodyBenefit + `
      <div class="criteriaSelectorCriteria">
        <div class="d-flex justify-content-center">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <div class="criteriaSelectorName"><h5 id="criteriaName">${e.name}</h5></div>
            </div>
            <div class="col-auto">
              <div class="criteriaSelectorName"><h6 class="criteriaSelectorDescription" id="criteriaDescription">${e.description}</h6></div>
            </div>
            <div class="col-auto">
              <select class="form-select inputStyle form-select-lg selectList" aria-label="Default select example" id="newProjectDiceStakeholderCommitment${e.id}">
                <option value="zero">${e.zero}</option>
                <option value="first">${e.first}</option>
                <option value="second">${e.second}</option>
                <option value="third">${e.third}</option>
              </select>
            </div>
          </div>
        </div><br>
      </div>
      `
    } else {
      bodyEnforce = bodyEnforce + `
      <div class="criteriaSelectorCriteria">
        <div class="d-flex justify-content-center">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <div class="criteriaSelectorName"><h5 id="criteriaName">${e.name}</h5></div>
            </div>
            <div class="col-auto">
              <div class="criteriaSelectorName"><h6 class="criteriaSelectorDescription" id="criteriaDescription">${e.description}</h6></div>
            </div>
            <div class="col-auto">
              <select class="form-select inputStyle form-select-lg selectList" aria-label="Default select example" id="newProjectDiceStakeholderCommitment${e.id}">
                <option value="zero">${e.zero}</option>
                <option value="first">${e.first}</option>
                <option value="second">${e.second}</option>
                <option value="third">${e.third}</option>
              </select>
            </div>
          </div>
        </div><br>
      </div>
      `
    }
  })

  benefit.innerHTML = bodyBenefit
  enforce.innerHTML = bodyEnforce
})
