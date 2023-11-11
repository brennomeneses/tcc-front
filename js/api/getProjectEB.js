async function getProjects() {
    const responseRaw = await fetch('https://photoclub-03.azurewebsites.net/projects/', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })

  const response = await responseRaw.json()

  return response.map(e => {
    return({
        position: "row1Col1",
        name: e.name,
        description: e.description,
        stakeholder: e.stakeholder,
        dice: "Dice projeto 1",
        cost: e.cost
      })
  })
}