import data from "../pages/api/data.json";

const getItemById = (itemId) => {
  return data.items.find((item) => item.id === itemId);
};

export default getItemById;
