const deleteBtn = document.querySelectorAll('.fa-trash')
const stars = document.querySelectorAll('.stars i')
const starItems = document.querySelectorAll('.item')
const li = document.querySelectorAll('li')


Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteMovie)
})
Array.from(stars).forEach((element)=>{
    element.addEventListener('click', rateMovie)
})



async function rateMovie() {
    const movieText = this.parentNode.childNodes[1].innerText;
    starItems.forEach(starItem => {
        starItem.addEventListener('click', () => {
            const clickedIndex = Array.from(starItems).indexOf(starItem);
            starItems.forEach((currentStarItem, index) => {
                if (index <= clickedIndex) {
                    currentStarItem.classList.add('active');
                } else {
                    currentStarItem.classList.remove('active');
                }
            });
        });
    });
    try {
        let stars = 0;
        starItems.forEach((starItem, index) => {
            if (starItem.classList.contains('active')) {
                stars = index + 1;
            }
        });

        const response = await fetch('rateMovie', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movieFromJS: movieText,
                stars: stars // Send the selected star count to the server
            })
        });

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
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

