/*Carrousel*/ 
const carrouselCards = document.querySelector('.carrousel-cards')
const carrousel = document.querySelector('.cards');
const arrowBtns = document.querySelectorAll('.arrowBtn');
const firstCardWidth = carrousel.querySelector('.card-item').offsetWidth;
const carrouselChildrens = [...carrousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carrousel.offsetWidth / firstCardWidth);

arrowBtns.forEach(btn =>{
   btn.addEventListener('click', () =>{
    carrousel.scrollLeft += btn.id === 'prev' ? - firstCardWidth : firstCardWidth;
   })
});

const dragStart = (e) => {
    isDragging = true;
    carrousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carrousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
    carrousel.scrollLeft= startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrousel.classList.remove('dragging'); 
}


carrousel.addEventListener('mousedown',dragStart)
carrousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup',dragStop);
carrouselCards.addEventListener('mouseenter',() =>clearTimeout(timeoutId));

/*Consulta a la api */
const cargarRecetas = async() => {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?q=desserts&from=0&size=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6ae261f398msh32492719c1fb766p1ae62fjsn2a98b63a1dbf',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const respuesta = await fetch(url, options);
        console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            console.log(datos);
            let recetas = "";
            
            datos.results.forEach((receta, i) => {
                let base_url = "https://tasty.co/recipe/";
                let recipe_url = base_url + receta.slug;

                recetas += `
                <li class="card-item">
                    <picture class="card-picture">
                        <img draggable="false" src="${receta.thumbnail_url}" alt="${receta.name}">
                    </picture>
                    <div class="card-text">
                        <h2>${receta.name}</h2>
                        <p>${receta.description}</p>
                    </div>
                    <div class="card-btn">
                    <a href="${recipe_url}" target="_blank"><button>PREPARACIÓN</button></a>
                    </div> 
                </li>`;
            });
            document.querySelector('.cards').innerHTML += recetas;
            
        } else {
            console.log("Hubo un error al obtener las recetas");
        }
    }
    catch(error) {
        console.log(error.message);
    }
}

cargarRecetas();

    

