import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import cors from "express-cors";

const server = new McpServer(
  {
    name: "Vivek-Raman/SJ-Watch",
    version: "1.0-rc1",
  },
  {
    capabilities: {},
  }
);

// TODO: schema fetched here
server.resource("schema", "sj-watch://schema", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: "Schema goes here",
    },
  ],
}));

server.tool("fetchRow", {}, async ({}) => {
  return {
    content: [{ type: "text", text: "" }],
  };
});

const app = express();
app.use(express.json());
app.use(cors());

let transport: SSEServerTransport;

app.get("/sse", (req, res) => {
  console.log("Received connection");
  transport = new SSEServerTransport("/message", res);
  server.connect(transport);
});

app.post("/message", (req, res) => {
  console.log("Received message");

  transport.handlePostMessage(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
