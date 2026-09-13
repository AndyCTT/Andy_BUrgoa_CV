function inicializar_validacion_formulario() {
  var formulario = document.getElementById('formulario_contacto');
  var confirmacion = document.getElementById('mensaje_confirmacion');

  if (!formulario) {
    return;
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var nombre_valido = validar_nombre();
    var correo_valido = validar_correo();
    var telefono_valido = validar_telefono();
    var motivo_valido = validar_motivo();
    var mensaje_valido = validar_mensaje();
    var aceptar_valido = validar_aceptar();

    var todo_valido = nombre_valido && correo_valido && telefono_valido &&
      motivo_valido && mensaje_valido && aceptar_valido;

    if (todo_valido) {
      confirmacion.hidden = false;
      mostrar_notificacion('Formulario enviado correctamente');
      formulario.reset();

      setTimeout(function () {
        confirmacion.hidden = true;
      }, 4000);
    } else {
      confirmacion.hidden = true;
      mostrar_notificacion('Revisa los campos marcados en rojo');
    }
  });

  formulario.addEventListener('reset', function () {
    limpiar_error('nombre');
    limpiar_error('correo');
    limpiar_error('telefono');
    limpiar_error('motivo');
    limpiar_error('mensaje');
    limpiar_error('aceptar');
    confirmacion.hidden = true;
  });

  function validar_nombre() {
    var campo = document.getElementById('nombre');

    if (campo.value.trim().length < 3) {
      mostrar_error('nombre', campo, 'Escribe al menos 3 caracteres.');
      return false;
    }

    limpiar_error('nombre', campo);
    return true;
  }

  function validar_correo() {
    var campo = document.getElementById('correo');
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patron.test(campo.value)) {
      mostrar_error('correo', campo, 'Ingresa un correo valido.');
      return false;
    }

    limpiar_error('correo', campo);
    return true;
  }

  function validar_telefono() {
    var campo = document.getElementById('telefono');
    var patron = /^\+?[0-9 ]{7,15}$/;

    if (!patron.test(campo.value)) {
      mostrar_error('telefono', campo, 'Ingresa un telefono valido.');
      return false;
    }

    limpiar_error('telefono', campo);
    return true;
  }

  function validar_motivo() {
    var campo = document.getElementById('motivo');

    if (campo.value === '') {
      mostrar_error('motivo', campo, 'Selecciona un motivo de contacto.');
      return false;
    }

    limpiar_error('motivo', campo);
    return true;
  }

  function validar_mensaje() {
    var campo = document.getElementById('mensaje');

    if (campo.value.trim().length < 10) {
      mostrar_error('mensaje', campo, 'Escribe al menos 10 caracteres.');
      return false;
    }

    limpiar_error('mensaje', campo);
    return true;
  }

  function validar_aceptar() {
    var campo = document.getElementById('aceptar');

    if (!campo.checked) {
      mostrar_error('aceptar', campo, 'Debes aceptar el tratamiento de datos.');
      return false;
    }

    limpiar_error('aceptar', campo);
    return true;
  }

  function mostrar_error(nombre_campo, campo, texto_error) {
    var casilla_error = document.getElementById('error_' + nombre_campo);
    casilla_error.textContent = texto_error;
    campo.setAttribute('aria-invalid', 'true');
  }

  function limpiar_error(nombre_campo, campo) {
    var casilla_error = document.getElementById('error_' + nombre_campo);
    casilla_error.textContent = '';

    if (campo) {
      campo.removeAttribute('aria-invalid');
    }
  }
}
