import axios from "axios";

export async function callExternalAPI(endpoint: string) {
  const response = await axios.get(endpoint);

  return response.data;
}
