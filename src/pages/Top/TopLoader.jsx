import axios from "axios"

export const TopLoader = async() => {
  const response = await axios.post(`${import.meta.env.VITE_RAILS_API}/recipe_generations`);

  return { data: response.data}
}

