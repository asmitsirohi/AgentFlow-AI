import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

export const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
});
