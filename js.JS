var modal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
});
var btn = document.getElementById("openModalBtn");

btn.onclick = function() {
    modal.show();
}

var formReceta = document.getElementById("formReceta");

formReceta.onsubmit = function(event) {
    event.preventDefault();

    var numero = document.getElementById("receta-numero").value;
    var nombre = document.getElementById("receta-nombre").value;
    var descripcion = document.getElementById("receta-descripcion").value;
    var costo = document.getElementById("receta-costo").value;
    var precio = document.getElementById("receta-precio").value;

    var foto = document.getElementById("receta-foto").files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        var fotoBase64 = reader.result;  

        var receta = {
            numero: numero,
            nombre: nombre,
            descripcion: descripcion,
            costo: costo,
            precio: precio,
            foto: fotoBase64  
        };

        var recetas = JSON.parse(localStorage.getItem("recetas")) || [];
        recetas.push(receta);

        localStorage.setItem("recetas", JSON.stringify(recetas));

        formReceta.reset();
        modal.hide();
        mostrarRecetas(); 
    };

    if (foto) {
        reader.readAsDataURL(foto);  
    }
}

function mostrarRecetas() {
    var recetas = JSON.parse(localStorage.getItem("recetas")) || [];
    var listaRecetas = document.getElementById("recetas-lista");
    listaRecetas.innerHTML = "";  

    recetas.forEach(function(receta) {
        var divReceta = document.createElement("div");
        divReceta.classList.add("col-md-4");

        divReceta.innerHTML = `
            <div class="receta card mb-4">
                <img src="${receta.foto}" class="card-img-top" alt="${receta.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${receta.numero} - ${receta.nombre}</h5>
                    <p class="card-text">${receta.descripcion}</p>
                    <p><strong>Costo:</strong> $${receta.costo}</p>
                    <p><strong>Precio:</strong> $${receta.precio}</p>
                </div>
            </div>
        `;

        listaRecetas.appendChild(divReceta);
    });
}


function buscarRecetas() {
    let searchQuery = document.getElementById('search').value.toLowerCase(); // obtener el texto de búsqueda
    let recetas = document.querySelectorAll('.receta'); // seleccionar todas las recetas

    recetas.forEach(function(receta) {
        let nombreReceta = receta.querySelector('.card-title').innerText.toLowerCase(); 
        
        if (nombreReceta.includes(searchQuery)) {
            receta.style.display = ''; 
        } else {
            receta.style.display = 'none'; 
        }
    });
}

function mostrarRecetasFiltradas(recetas) {
    var listaRecetas = document.getElementById("recetas-lista");
    listaRecetas.innerHTML = "";  

    recetas.forEach(function(receta) {
        var divReceta = document.createElement("div");
        divReceta.classList.add("col-md-4");

        divReceta.innerHTML = `
            <div class="receta card mb-4">
                <img src="${receta.foto}" class="card-img-top" alt="${receta.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${receta.numero} - ${receta.nombre}</h5>
                    <p class="card-text">${receta.descripcion}</p>
                    <p><strong>Costo:</strong> $${receta.costo}</p>
                    <p><strong>Precio:</strong> $${receta.precio}</p>
                </div>
            </div>
        `;

        listaRecetas.appendChild(divReceta);
    });
}


window.onload = function() {
    var recetas = JSON.parse(localStorage.getItem("recetas")) || [];
    mostrarRecetas();
};


document.getElementById("search").addEventListener("input", buscarRecetas);
