var cargarPagina = function() {
  //obtenerUbicacion();
  //crearElementos(restaurantes);
  //$("#formularioBusqueda").click(filtrarRestaurantes);
  //$('select').material_select();
  obtenerUbicacion();
  $(".restaurante").click(cambiarUbicacion);
};


var obtenerUbicacion = function(e) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion);
  } else {
    alert("Actualice su navegador");
  }
};

var mostrarPosicion = function(posicion) {
  console.log(posicion);

  var coordenadas = {
    lat: posicion.coords.latitude,
    lng: posicion.coords.longitude
  };
  mostrarMapa(coordenadas);
};

var mostrarMapa = function(coordenadas) {
  var map = new google.maps.Map($('.map')[0], {
    zoom: 17,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}

function cambiarUbicacion() {
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}

var restaurantes = [{
  "nombre": "Restaurante La Roma",
  "tipoDeComida": "ComidaCorrida",
  "direccion": "Mérida 243, C. U. Benito Juárez, 06700 Ciudad de México, CDMX",
  "coordenadas": {
    "lat": '19.4124033',
    "lng": '-99.1580568',
  }
}, {
  "nombre": "Helado Obscuro",
  "tipoDeComida": "Helado",
  "direccion": "Orizaba 203, Roma Nte., 06700 Ciudad de México, CDMX",
  "coordenadas": {
    "lat": '19.4128247',
    "lng": '-99.1606755'
  }

}, {
  "nombre": "Pizza del Perro Negro",
  "tipoDeComida": "Pizza",
  "direccion": "Parque España 3, Roma Nte., 06700 Ciudad de México, CDMX",
  "coordenadas": {
    "lat": '19.41652',
    "lng": '99.1718387'
  }

}];

var crearElementos = function(restaurantes) {
  var plantillaFinal = "";
  restaurantes.forEach(function(restaurante) {
    plantillaFinal += plantillaRestaurante.replace("__nombre__", restaurante.nombre)
      .replace("__direccion__", restaurante.direccion)
      .replace("__TipoComida__", restaurante.tipoDeComida)

  });
  $(".listadoDeComidas").html(plantillaFinal);
};
var filtrarRestaurantes = function(e) {
  e.preventDefault();
  var criterioBusqueda = $("input.select-dropdown").val().toLowerCase();
  var palabraBusqueda = $("#buscadorComida").val().toLowerCase();
  var restaurantesFiltrados = restaurantes.filter(function(restaurante) {
    if (criterioBusqueda === "tipo") {
      return restaurante.tipoDeComida.toLowerCase().indexOf(palabraBusqueda) >= 0;

    } else if (criterioBusqueda === "nombre") {
      return restaurante.nombre.toLowerCase().indexOf(palabraBusqueda) >= 0;

    } else if (criterioBusqueda === "direccion") {
      return restaurante.direccion.toLowerCase().indexOf(palabraBusqueda) >= 0;

    } else {
      return "Elije otro Restaurante";
    }
  });
  crearElementos(restaurantesFiltrados);
};


$(document).ready(cargarPagina);
