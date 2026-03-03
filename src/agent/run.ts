import { createAgent } from "./agent";

export async function runWorkFlow(input: string) {
  const agent = await createAgent();

  const result = await agent.invoke({
    input,
  });

  return result;
}
