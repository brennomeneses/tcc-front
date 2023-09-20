document.getElementById('singUpForm').addEventListener('submit', async (event)=> {
  event.preventDefault()

  const formData = new FormData(event.target)

  const formValues = Object.fromEntries(formData)

  const loadingScreen = document.getElementById('loadingModal')

  try {
    loadingScreen.classList.remove('none')
    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/users/', {
      method: 'POST',
      body: JSON.stringify({
        email: formValues.emailSingup,
        name: formValues.nameSignup,
        role: formValues.roleSignup,
        password: formValues.passwordSignup,
        companyId: formValues.companyId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const response = await responseRaw.json()

    if(responseRaw.status != 200){
      loadingScreen.classList.add('none')
      alert('erro interno, favor aguardar')
    }else {
      alert('Obrigado por se cadastrar, redirecionando para a pagina de login')
      loadingScreen.classList.add('none')
      window.location.href = "../index.html";
    }
    
  } catch (error) {
    alert("Usuário ou senhas incorretos")
  }

  
})