export const getPets = async (animal, location, breed) => {
  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!response.ok) {
    throw new Error(
      `An has been occured trying fetch getPets. Message: ${response}`
    );
  }

  return response.json();
};
