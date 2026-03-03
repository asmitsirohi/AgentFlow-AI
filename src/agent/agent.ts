import { AgentExecutor } from "langchain/agents";
import { createReactAgent } from "langchain/agents";

import { geminiModel, hybridInvoke } from "../config/llm";
import { tools } from "./tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function createAgent() {
  const prompt = ChatPromptTemplate.fromTemplate(`
      You are a ReAct agent.

      You MUST follow this format exactly.

      If using a tool:

      Thought: your reasoning
      Action: one of [{tool_names}]
      Action Input: JSON input

      After tool returns:

      Thought: your reasoning
      Final Answer: final answer

      If no tool needed:

      Final Answer: answer directly

      Available tools:
      {tools}

      Question: {input}

      {agent_scratchpad}
  `);

  const agent = await createReactAgent({
    llm: geminiModel,
    tools,
    prompt,
  });

  return new AgentExecutor({
    agent,
    tools,
    handleParsingErrors:
      "Check your format. Follow Thought/Action/Action Input strictly.",
  });
}
