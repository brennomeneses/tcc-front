window.addEventListener("DOMContentLoaded", async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const projectId = urlParams.get("projectId") ?? 1;

  const userToken = sessionStorage.getItem('app:userToken');

  const responseRaw = await fetch(`https://photoclub-03.azurewebsites.net/projects/`, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  })
  const response = await responseRaw.json()

  const reunionElements = response.map((e) => {
    return `
    <a style="text-decoration: none; color: inherit;" href="employeeMainPage.html?projectId=${e.id}">
      <div ${projectId == e.id ? `style="background-color: #EDEDED"` : "" } class="reuniao">
        <h4 class="text-center reuniaoText">${e.name}</h4>
      </div>
    </a>
    `
  }).join("\n")

  document.getElementsByClassName("meetings")[0].innerHTML = reunionElements

  if(!window.location.pathname === "/pages/projectManagerNewActivity.html")
    document.querySelector(".sidebarFooter.fixed-bottom > a").setAttribute("href", `./projectManagerNewActivity.html?projectId=${projectId}`)
})