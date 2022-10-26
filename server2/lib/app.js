"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let cheerio = require("cheerio");
// import cheerio from "cheerio"
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            let url = body;
            // console.log(data);
            // const url = 'https://facebook.com'
            async function getMeta() {
                try {
                    const response = await axios_1.default.get(url);
                    // console.log(response);
                    const $ = cheerio.load(response.data);
                    let obj = {
                        title: "",
                        description: "",
                        image_url: ""
                    };
                    obj['title'] = $("title").text();
                    obj['description'] = $('meta[name="description"]').attr('content');
                    obj['image_url'] = $('meta[property="og:image"]').attr('content');
                    console.log(obj);
                    res.end(JSON.stringify(obj, null, 2));
                }
                catch (error) {
                    console.error(error);
                }
            }
            getMeta();
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/HTML' })
            .end(JSON.stringify({ alert: "Route Unavailable" }));
    }
});
server.listen(3001, function () {
    console.log('Server is very much running at port 3001');
});
