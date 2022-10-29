import http, { IncomingMessage, Server, ServerResponse } from "http";
import { parser } from "html-metadata-parser"

const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url ==="/" && req.method === "GET") {
      const result = await parser("https://www.linkedIn.com/");
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(JSON.stringify(result, null,2));
      console.log(JSON.stringify(result, null,2))
    }
  }
);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
