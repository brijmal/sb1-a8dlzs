export const getCurrentLocation = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          resolve(data.display_name);
        } catch (error) {
          reject('Error fetching address');
        }
      },
      () => {
        reject('Unable to retrieve location');
      }
    );
  });
};