import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  try {
    if (req.url === "/" || req.url === "/index.html") {
      const indexHtml = fs.readFileSync("./index.html", "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(indexHtml);
    } else if (req.url === "/about.html") {
      const aboutHtml = fs.readFileSync("./about.html", "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(aboutHtml);
    } else if (req.url === "/data.json") {
      const jsonData = fs.readFileSync("./data.json", "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(jsonData);
    } else {
      // 404 fallback
      const errorFoundHtml = `
              <html>
              <head><title>404 Not Found</title></head>
              <body>
                  <h1>404 Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                  <a href="/">Go back to Home Page</a>
              </body>
              </html>
          `;
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(errorFoundHtml);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
