import data from "../pages/api/data.json";

const getAllStaticPaths = () => {
  return data.items.map((item) => ({
    params: { cid: item.id },
  }));
};

export default getAllStaticPaths;
