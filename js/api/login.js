document.getElementById('loginForm').addEventListener('submit', async (event)=> {
  event.preventDefault()

  const formData = new FormData(event.target)

  const formValues = Object.fromEntries(formData)

  const loadingScreen = document.getElementById('loadingModal')

  try {
    debugger
    loadingScreen.classList.remove('none')
    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: formValues.emailLogin,
      password: formValues.passwordLogin
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const response = await responseRaw.json()

  sessionStorage.setItem('app:userToken', response.token.token)

  if(response.role === 'Gerente de Portfólio')
    window.location.href = "pages/portfolioManagerMainPage.html";
  else if (response.role === 'Gerente de Projetos')
    window.location.href = "http://www.w3schools.com";
  else if (response.role === 'Funcionário')
    window.location.href = "http://www.w3schools.com";
    
  } catch (error) {
    loadingScreen.classList.add('none')
    alert("Usuário ou senhas incorretos")
  }

  
})