import axios from "axios";

const TOKEN = "cfth1b9r01qokdd08g4gcfth1b9r01qokdd08g50";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
