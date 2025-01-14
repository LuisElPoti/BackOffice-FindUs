import Cookies from 'js-cookie';

export const guardarToken = (jwtToken) => {
  console.log("Guardando token: ", jwtToken);
  Cookies.set('token', jwtToken, { expires: 1, secure: true });
};

export const guardarRolUsuario = (rol) => {
  console.log("Guardando rol de usuario: ", rol);
  //EN local storage
  localStorage.setItem('rol', rol);
};

export const guardarNombreRolUsuario = (nombreRol) => {
  console.log("Guardando nombre de rol de usuario: ", nombreRol);
  //EN local storage
  localStorage.setItem('nombreRol', nombreRol);
};

export const obtenerNombreRolUsuario = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem('nombreRol');
  }
  return null; // O un valor por defecto si lo prefieres
};

export const obtenerRolUsuario = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem('rol');
  }
  return null; // O un valor por defecto si lo prefieres
};

export const guardarIdUsuario = (id) => {
  console.log("Guardando id de usuario: ", id);
  //EN local storage
  localStorage.setItem('id', id);
};

export const obtenerIdUsuario = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem('id');
  }
  return null; // O un valor por defecto si lo prefieres
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
  localStorage.removeItem('rol');
  localStorage.removeItem('id');
  localStorage.removeItem('nombreRol');
}