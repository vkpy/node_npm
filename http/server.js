const http = require("http");

const projectIdeas = [
  {
    id: 1,
    project: "Day-Plan Organiser",
    projectType: "client app major",
  },
  {
    id: 2,
    project: "User Sign-Up Authentication",
    projectType: "server side major",
  },
];

/** Create a Http server using NodeJS http API*/
const server = http.createServer((request, response) => {
  let body = [];

  const { headers, url, method, statusCode } = request;
  console.log(
    5,
    "\n",
    headers,
    "\n",
    url,
    "\n",
    method,
    "\n",
    statusCode,
    "\n"
  );

  //*Header 'Content-Type' defines what kind of format does the request from the client is asking from the server in the response*/
  // response.setHeader("Content-Type", "application/json");

  //*Header 'X-Powered-By' defines the Technology the web application / specific API is using currently*/
  // response.setHeader("X-Powered-By","Node.js");

  let testStatus = 404;

  const testResponse = {
    success: false,
    data: null,
    error:null
  };

  request
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      if (method === "GET" && url === "/projectIdeas") {
        testStatus = 200;
        testResponse.success = true;
        testResponse.data = projectIdeas;
      } else if (method === "POST" && url === "/projectIdeas") {
        const { id, project, projectType } = JSON.parse(body);
        if (!id || !project || !projectType) {
          testStatus = 400;
          testResponse.error = "Required keys value is missing. id, project and projectType"
        } else {
          projectIdeas.push({ id, project, projectType });
          testStatus = 201;
          response.success = true;
          response.data = projectIdeas;
        }
      }

      /**setting a single header can be done by setHeader method
       * to update multiple headers one can use writeHead method
       * the writeHead takes two parameter's one statusCode and the other is hedears
       */
      response.writeHead(testStatus, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      response.end(
        // JSON.stringify({
        //   success: true,
        //   data: projectIdeas,
        // })
        testStatus === 200 || testStatus === 201
          ? JSON.stringify(projectIdeas)
          : JSON.stringify(testResponse)
      );
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server Running on ${PORT}`));
