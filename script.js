const carrouselCards = document.querySelector('carrousel-cards')
const carrousel = document.querySelector('.cards');
const arrowBtns = document.querySelectorAll('.arrowBtn');
const firstCardWidth = carrousel.querySelector('.card-item').offsetWidth;
const carrouselChildrens = [...carrousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carrousel.offsetWidth / firstCardWidth);

carrouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carrousel.insertAdjacentHTML('afterbegin',card.outerHTML);
})

carrouselChildrens.slice(0,-cardPerView).forEach(card =>{
    carrousel.insertAdjacentHTML('beforeend',card.outerHTML);
})

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

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(()=>carrousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if(carrousel.scrollLeft === 0) {
        carrousel.classList.add('no-transition');
        carrousel.scrollLeft = carrousel.scrollWidth - ( 2 * carrousel.offsetWidth);
        carrousel.classList.remove('no-transition');

    }else if(Math.ceil(carrousel.scrollLeft) === carrousel.scrollWidth - carrousel.offsetWidth) {
        carrousel.classList.add('no-transition');
        carrousel.scrollLeft = carrousel.offsetWidth;
        carrousel.classList.remove('no-transition');
    }
    clearTimeout(timeoutId);
    if(!carrouselCards.matched(":hover")) autoPlay();
}

carrousel.addEventListener('mousedown',dragStart)
carrousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup',dragStop);
carrousel.addEventListener('scroll', infiniteScroll);
carrouselCards.addEventListener('mouseenter',() =>clearTimeout(timeoutId));
carrouselCards.addEventListener('mouseleave',autoPlay);
/*let glide = new Glide('.glide');
const cargarRecetas = async() => {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?q=desserts&from=0&size=3';
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
            let recetas = "";
            
            datos.results.forEach((receta, i) => {
                recetas += `
                <li class="glide__slide api-content">
                    <article class="card-item">
                        <picture class="card-picture">
                            <img src="${receta.thumbnail_url}" alt="${receta.name}">
                        </picture>
                        <div class="card-item-text">
                            <h2>${receta.name}</h2>
                            <p>${receta.description}</p>
                        </div>
                        <div class="card-btn"><button>PREPARACIÓN</button></div> 
                    </article>
                </li>`;
            });

            document.querySelector('.glide__slides').innerHTML += recetas;
            glide.destroy();
            glide = new Glide('.glide');
            glide.mount();
        } else {
            console.log("Hubo un error al obtener las recetas");
        }
    }
    catch(error) {
        console.log(error.message);
    }
}

cargarRecetas();*/