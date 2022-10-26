import http, { IncomingMessage, Server, ServerResponse } from "http";

// import { Organization } from "./IOrganization";
import { getTasks, addTask, updateTask, deleteTask } from "./controller";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    //get tasks
    if(req.url == "/api/tasks" && req.method == "GET"){
      return getTasks(req,res);
    }
    //creating a task
    if(req.method == "POST" && req.url == "/api/tasks"){
      return addTask(req,res);
    }
    //updating a task
    if(req.method == "PUT" && req.url == "/api/tasks"){
      return updateTask(req,res);
    }
    //deleting a task
    if(req.method == "DELETE" && req.url == "/api/tasks"){
      return deleteTask(req,res);
    }
    //default response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  


// server.listen(3005);
