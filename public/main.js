const addForm = document.querySelector('form')
const nameInput = document.querySelector('input')
const container = document.querySelector('section')

function submithandler(e) {
    e.preventDefault()
    axios.post('/api/people', {name: nameInput.value}) 
        .then(res => {
            container.innerHTML = ''
            nameInput.value = ''

            res.data.forEach(personName => {
            container.innerHTML += `<p>${personName}</p>`
        })
    })
    .catch(err => {
        nameInput.value = ''

        const notif = document.createElement('aside')
        notif.innerHTML = `<p>${err.response.data}</p> <button class ='close'> close</button>`
        document.body.appendChild(notif)

        document.querySelector('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentNode.remove()
            })
        })
    })
}

addForm.addEventListener('submit', submithandler)