document.getElementById('addCriterionForm').addEventListener('submit', async (event)=> {
    event.preventDefault()
  
    const formData = new FormData(event.target)
  
    formData.append('isBenefit', event.submitter.name === 'benefit')
    const formValues = Object.fromEntries(formData)

    console.log(formValues)
  
    const loadingScreen = document.getElementById('loadingModal')
  
    try {
      loadingScreen.classList.remove('none')
      const userToken = sessionStorage.getItem('app:userToken');
      const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/criteria', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${userToken}`
      }
    })

    const response = await responseRaw.json()

    console.log(response)
    loadingScreen.classList.add('none')
    } catch (error) {
      loadingScreen.classList.add('none')
      alert("Usuário ou senhas incorretos")
    }
  
    
  })