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

