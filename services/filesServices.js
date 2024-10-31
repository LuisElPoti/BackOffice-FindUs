// Función para convertir archivo a base64
export const convertToBase64 = (file) => {
        console.log('file:', file);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Tomar solo la parte base64
            reader.onerror = (error) => reject(error);
        });
    };