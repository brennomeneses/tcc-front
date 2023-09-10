window.addEventListener("DOMContentLoaded", async () => {
  try {
    const userToken = sessionStorage.getItem('app:userToken');

    console.log(userToken)

    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/users/create', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })

  const response = await responseRaw.json()
  
  document.getElementById('userrole').innerHTML = `${response.role}`
  document.getElementById('username').innerHTML = `${response.name}`

  } catch(error) {
    console.log(error)
  }
});