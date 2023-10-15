window.addEventListener("DOMContentLoaded", async () => {

  const userToken = sessionStorage.getItem('app:userToken');

  const responseRaw = await fetch("https://photoclub-03.azurewebsites.net/users", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })

    const response = await responseRaw.json()

    response.forEach((e) => {
      const option = document.createElement("option")
      option.value = e.id
      option.text = e.name
      document.getElementById("newProjectSelectProjectManager").add(option)
    })

  document.getElementById("basicInfoProject").addEventListener("submit", async (event) => {
    event.preventDefault()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const projectId = urlParams.get("projectId") ?? 1;

    const formData = new FormData(event.target)
    formData.append("projectId", projectId)

    const formValues = Object.fromEntries(formData)

    console.log(formValues)
    try {
      const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/tasks/', {
      method: 'POST',
      body: JSON.stringify({
        description: formValues.newProjectDescription,
        initialDate: formValues.newTaskDate,
        estimatedDate: formValues.newTaskEstimatedDate,
        finalDate: null,
        projectId: parseInt(projectId),
        userId: parseInt(formValues.newProjectSelectProjectManager)
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${userToken}`
      }
    })

    if(responseRaw.ok)
      location.href = `./projectManagerMainPage.html?projectId=${projectId}`
    } catch (error) {
      console.log(error)
    }
  })
})