import http from "http";
import winston, { format } from "winston";

// Logger 설정
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs.json" }), // JSON 형식으로 로그를 저장
  ],
});
// const logger = winston.createLogger({
//   level: "info",
//   format: format.combine(
//     format.timestamp(),
//     format.json(),
//     format.printf((info) => JSON.stringify(info)), // 각 로그를 JSON 문자열로 변환
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: "logs.json",
//       options: { flags: "a" }, // 로그가 파일 끝에 추가됨
//     }),
//   ],
// });

const PORT = 8000;

const server = http.createServer((req, res) => {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  logger.info(req);

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  if (req.url === "/" && req.method === "GET") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/upload" && req.method === "POST") {
    // handle file upload
    // res.write("File upload route");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "File uploaded" }));
    res.end();
  }
});

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
