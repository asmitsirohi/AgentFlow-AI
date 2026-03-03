// Qdrant vector DB

import { QdrantClient } from "@qdrant/js-client-rest";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { embeddings } from "./embeddings";

const client = new QdrantClient({
  url: "http://localhost:6333",
});

export async function getRetriever() {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      client,
      collectionName: "docs",
    }
  );

  return vectorStore.asRetriever();
}
