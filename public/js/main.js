const deleteBtn = document.querySelectorAll('.fa-trash')
const stars = document.querySelectorAll('.stars i')
const starItems = document.querySelectorAll('.item')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})
Array.from(stars).forEach((element)=>{
    element.addEventListener('click', rateMovie)
})

async function rateMovie(){
    const movieText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('rateMovie', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'movieFromJS': movieText
            })
        })
        starItems.forEach((starItem, index1) => {
            starItem.addEventListener('click', () => {
                starItems.forEach((currentStarItem, index2) => {
                    if (index1 >= index2 && index2 < 5) {
                        currentStarItem.classList.add('active');
                    } else {
                        currentStarItem.classList.remove('active');
                    }
                });
            });
        });
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}


async function deleteMovie(){
    const movieText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'movieFromJS': movieText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

stars.forEach((star,index1) => {
    star.addEventListener('click', () => {
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add('active') : star.classList.remove('active')
        })
    })
})