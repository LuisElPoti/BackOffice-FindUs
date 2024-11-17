import Cookies from 'js-cookie';

export const guardarToken = (jwtToken) => {
  console.log("Guardando token: ", jwtToken);
  Cookies.set('token', jwtToken, { expires: 1, secure: true });
};

export const eliminarToken = () => {
  Cookies.remove('token');
};

export const obtenerToken = () => {
  return Cookies.get('token');
};


export const guardarFotoPerfil = (fotoPerfil) => {
  console.log("Guardando foto de perfil: ", fotoPerfil);
  //EN local storage
  localStorage.setItem('fotoPerfil', fotoPerfil);
};

export const obtenerFotoPerfil = () => {
  if (typeof localStorage !== "undefined") {
      return localStorage.getItem('fotoPerfil');
  }
  return null; // O un valor por defecto si lo prefieres
};

export const guardarNombreUsuario = (nombreUsuario) => {
  console.log("Guardando nombre de usuario: ", nombreUsuario);
  //EN local storage
  localStorage.setItem('nombreUsuario', nombreUsuario);
}

export const obtenerNombreUsuario = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem('nombreUsuario');
  }
  return null; // O un valor por defecto si lo prefieres
}

export const eliminarDatosUsuario = () => {
  Cookies.remove('token');
  localStorage.removeItem('fotoPerfil');
  localStorage.removeItem('nombreUsuario');
}