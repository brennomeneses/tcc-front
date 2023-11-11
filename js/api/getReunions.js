window.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("app:userToken")
  const meetingsArea = document.querySelector(".meetings")

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const reunions = await (await fetch("https://photoclub-03.azurewebsites.net/reunion", options)).json()

  const meetingsElement = reunions.map((e)=> {
    const date = new Date(e.date)
  
    return `
    <a href="portfolioManagerEBMatrix.html?reunionId=${e.id}">
      <div class="reuniao">
        <h4 class="text-center reuniaoText">
          <span id="meetingDate">${date.toLocaleDateString()}<span class="horaReuniao">
          <span id="meetingStartTime">${date.toLocaleTimeString()}</span>
          </span>
        </h4>
      </div>
    </a>
    `
}).join("\n")

meetingsArea.innerHTML = meetingsElement
})