"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const html_metadata_parser_1 = require("html-metadata-parser");
const server = http_1.default.createServer(async (req, res) => {
    if (req.url === "/" && req.method === "GET") {
        const result = await html_metadata_parser_1.parser("https://www.linkedIn.com/");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(JSON.stringify(result, null, 2));
        console.log(JSON.stringify(result, null, 2));
    }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
