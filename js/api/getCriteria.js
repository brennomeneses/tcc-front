window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userToken = sessionStorage.getItem('app:userToken');

    console.log(userToken)

    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/criteria', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })

  const response = await responseRaw.json()

  console.log(response)

  response.forEach((e) => {
    const column = `
    <div class="criteria">
      <div class="criteriaContent smallCriteriaSize"><p class="criteriaText" id="criteriaNameArea">${e.name}</p></div>
      <div class="criteriaContent mediumCriteriaSize"><p class="criteriaText" id="criteriaDescriptionArea">${e.description}</p></div>
      <div class="criteriaContent smallCriteriaSize"><p class="criteriaText" id="criteriaZeroArea">${e.zero}</p></div>
      <div class="criteriaContent smallCriteriaSize"><p class="criteriaText"  id="criteriaOneArea">${e.first}</p></div>
      <div class="criteriaContent smallCriteriaSize"><p class="criteriaText" id="criteriaTwoArea">${e.second}</p></div>
      <div class="criteriaContent smallCriteriaSize"><p class="criteriaText" id="criteriaThreeArea">${e.third}</p></div>
    </div>
  `

    const element = document.getElementById(e.is_benefit ? 'benefitCriteriaList' : 'effortCriteriaList')

    element.innerHTML = element.innerHTML + column
  })

  } catch(error) {
    console.log(error)
  }
});