// referencia del input para realizar la busqueda
const searchInput = document.querySelector('#search'); // referencia por medio del id, cuando es id se usa #, y cuando es clase de usa el punto, ejemplo .search
const containerProducts = document.querySelector('#products') // referencia al div que va contener las cards de los productos
const empty = document.querySelector('#empty'); // referencia al div, por medio del id

// api de productos para realizar practicas, con esta api puedes hacer paginados, obtener categorias, etc
// link de la documentacion https://fakestoreapi.com/docs

let products = []; // variable para almacenera los productos obtenidos de la api, se incializa con un arreglo vacio, al ser JavaScript perfectamente lo puedes inicializar a donde se va usar
let urlBase = 'https://fakestoreapi.com/products?limit=20'// enpoint que se estara consumiento en esta practica para realizar la busqueda de los productos, en el frontend

// funcion para obtener los productos con un limite de 20, el valor del numero puede ser dinamico
const getProducs = async () =>{ // funcion fecha asincrona, usando async await, perfectamente se puede usar el .then catch, pero eso seria algo antiguo a mi parecer

    const response = await fetch(urlBase); // uso del fetch para consultar datos, fetch es nativo de JavaScript
    const result = await response.json(); // se pasan los datos obtenidos a json, para que podas hacer con el lo que necesitemos
    products = result; // lleñamos la variable creado anteriormente por los datos obtenidos
    //console.log(products);
    generateHtmlProduct(products); // pasamos por parametro los productos obtenidos de la api
}

// invocamos el metodo
getProducs();

// metodo para realizar la busqueda de los productos por titulo, categoria, descripcion
// en este caso se hara la busqueda desde el frontend, es decir desde la vista, esto por que el back no esta preparado para recibir peticiones y devuelva coincidencias
// se puede hacer una busqueda a nivel backend, que cada escritura en el input consulte al backend
const searchProducts = (event) =>{
    
    let search = event.target.value; // almacenamos en una variable lo que se escribio en el input
    // uso de prototipo filter para buscar en el arreglo, y pasamos los datos en letras minusculas al ingual que la busqueda
    let product = products.filter( prod => 
                                    prod.title.toLowerCase().includes(search.toLowerCase())
                                ||  prod.category.toLowerCase().includes(search.toLowerCase())
                                ||  prod.description.toLowerCase().includes(search.toLowerCase())
    );
    
    generateHtmlProduct(product); // invocamos el metodo nuevamente para para pasarle los parametros de los prodcutos filtrados
}

// asociamos el input del buscador a un evento escucha, para que muestre cada vez que escribimos en el input
searchInput.addEventListener('input', searchProducts);

// funcion para generara el html de las cards de los productos, recibe como parametro un arreglo (array) de producto
// uso de tamplate string, para interpolar codigo JS, en html, ejemplo `hola ${variable}`
const generateHtmlProduct = (products = []) =>{ // en caso de que no se le pase nada al metodo, lo igualo a un arreglo vacio para que no vaya a explotar el aplicativo
    
    containerProducts.innerHTML = ''; // important!!, inicializar el contenedor en vacio
    empty.innerHTML = ''; // limpiar variable

    // uso de un codicionador ternario para mostrar cuando se ecnontraron productos en el filtro
    products.length > 0 ?
        products.map( prod =>(
            // uso de innerHTML para concatenar las cards,uso de interpolacion
            containerProducts.innerHTML += `
                <div class="card">
                    <div class="imagen">
                        <img src="${prod.image}" alt="${prod.title}"> 
                    </div>
                    <div class="card-body">
                        <div class="title">${prod.title}</div>
                        <div class="category">
                            Category: <span>${prod.category}</span> | 
                            Price: <span>$${prod.price}</span>
                        </div>
                        <div class="description">${prod.description}</div>
                    </div>
                </div>
            `
        ))
    : empty.innerHTML = '<p>No se encontraron productos!!</p>' // mostrar en caso de que no se encuentren productos en el filtro
    
}


