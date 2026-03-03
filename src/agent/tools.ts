import { DynamicStructuredTool } from "langchain/tools";
import { queryDatabase } from "../services/db";
import { z } from "zod";
import { callExternalAPI } from "../services/api";
import { getRetriever } from "../rag/retriever";

export const databaseTool = new DynamicStructuredTool({
  name: "database_query",
  description: "Query the internal PostgreSQL database",
  schema: z.object({
    query: z.string().describe("SQL query to execute"),
  }),
  func: async ({ query }) => {
    const data = await queryDatabase(query);
    return JSON.stringify(data);
  },
});

export const apiTool = new DynamicStructuredTool({
  name: "external_api",
  description: "Call external REST API",
  schema: z.object({
    endpoint: z.string(),
  }),
  func: async ({ endpoint }) => {
    const data = await callExternalAPI(endpoint);
    return JSON.stringify(data);
  },
});

export const ragTool = new DynamicStructuredTool({
  name: "retrieve_docs",
  description: "Retrieve relevant documents from vector database",
  schema: z.object({
    query: z.string(),
  }),
  func: async ({ query }) => {
    const retriever = await getRetriever();
    const docs = await retriever.invoke(query);
    return JSON.stringify(docs);
  },
});

export const tools = [databaseTool, apiTool, ragTool];
