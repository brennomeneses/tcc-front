window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("basicInfoProject").addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const formValues = Object.fromEntries(formData)

    console.log(formValues)
    try {
      
    } catch (error) {
      console.log(error)
    }
  })
})