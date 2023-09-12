const url = 'https://www.edamam.com/results/recipes/?search=dulces-api_key=5a6dd365ea8be9589be1ccc31b417a70&language=es';

const cargarRecetas = async() => {
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
