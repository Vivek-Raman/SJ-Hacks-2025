from mcp.server.fastmcp import FastMCP

mcp = FastMCP("SJ-Watch")

@mcp.tool()
async def get_info() -> str:
  return "{'asd': 'Gaming!'}"

if __name__ == "__main__":
  mcp.run(transport='sse')
