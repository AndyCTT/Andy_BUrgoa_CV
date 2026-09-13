document.addEventListener('DOMContentLoaded', function () {
  inicializar_tema();
  inicializar_foto_respaldo();
  inicializar_imagenes_proyecto();

  if (typeof inicializar_validacion_formulario === 'function') {
    inicializar_validacion_formulario();
  }
});

function inicializar_tema() {
  var raiz = document.documentElement;
  var boton = document.getElementById('boton_tema');
  var icono = document.getElementById('icono_tema');
  var texto = document.getElementById('texto_tema');
  var tema_guardado = localStorage.getItem('cv_tema');

  if (tema_guardado === null) {
    tema_guardado = 'oscuro';
  }

  aplicar_tema(tema_guardado);

  boton.addEventListener('click', function () {
    var tema_actual = raiz.getAttribute('data-tema');
    var tema_nuevo = tema_actual === 'oscuro' ? 'claro' : 'oscuro';

    aplicar_tema(tema_nuevo);
    localStorage.setItem('cv_tema', tema_nuevo);

    if (tema_nuevo === 'oscuro') {
      mostrar_notificacion('Modo oscuro activado');
    } else {
      mostrar_notificacion('Modo claro activado');
    }
  });

  function aplicar_tema(tema) {
    raiz.setAttribute('data-tema', tema);

    if (tema === 'oscuro') {
      icono.textContent = '🌙';
      texto.textContent = 'Modo claro';
      boton.setAttribute('aria-pressed', 'false');
    } else {
      icono.textContent = '☀️';
      texto.textContent = 'Modo oscuro';
      boton.setAttribute('aria-pressed', 'true');
    }
  }
}

function inicializar_foto_respaldo() {
  var foto = document.getElementById('foto_perfil');
  var iniciales = document.getElementById('foto_iniciales');

  foto.addEventListener('error', function () {
    foto.hidden = true;
    iniciales.hidden = false;
  });
}

function inicializar_imagenes_proyecto() {
  var imagenes = document.querySelectorAll('.proyecto_imagen');

  imagenes.forEach(function (imagen) {
    imagen.addEventListener('error', function () {
      imagen.closest('.proyecto_imagen_marco').hidden = true;
    });
  });
}

function mostrar_notificacion(mensaje) {
  var notificacion = document.getElementById('notificacion');
  notificacion.textContent = mensaje;
  notificacion.classList.add('visible');

  clearTimeout(mostrar_notificacion.temporizador);
  mostrar_notificacion.temporizador = setTimeout(function () {
    notificacion.classList.remove('visible');
  }, 2500);
}
