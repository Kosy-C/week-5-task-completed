import fs from 'fs';
import path from 'path';

//handle request and response
import { ServerResponse, IncomingMessage } from 'http';

import { Organization } from './IOrganization';



const getTasks = (req: IncomingMessage, res: ServerResponse)=>{
    

    return fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data)=>{
        if(err){
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Error while reading file"}));
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({ success: true, message: JSON.parse(data) }))
        }
    })
}

const addTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
        console.log(data);
    });
    req.on('end', () => {
        let task = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                let newData: Organization[] = JSON.parse(data);
                //add the new task
                newData.push(task);
                
                    //write the new array to the file
                    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newData), (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Error writing file' }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: true, message: 'Task added successfully' }));
                        }
                    }
                );
            }
        }
        );
    }
    );
}

const updateTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
    });
    req.on('end', () => {
        let task: Organization = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                let newData: Organization[] = JSON.parse(data);
                //find the index of the task to update
                let taskIndex = newData.findIndex((el: Organization) => el.id === task.id);
                //update the task
                newData[taskIndex] = task;
                //write the new array to the file
                fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newData), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing file', error: err }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Organization updated successfully', task }));
                    }
                }
                );

            }

        }
        );
    }
    );
}

//delete a task
const deleteTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk.toString();
    }
    );
    //when the request is done
    req.on("end", () => {
        let task: Organization = JSON.parse(data);
        fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: "Error reading file", error: err}));
            } else {
                let newData: [Organization] = JSON.parse(data);
                //find the index of the task to delete
                let taskIndex = newData.findIndex((el) => el.id == task.id);
                //delete the task
                newData.splice(taskIndex, 1);
                //write the new array to the file
                fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(newData), (err) => {
                    if (err) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({message: "Error writing file", error: err}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, message: "Task deleted successfully"}));
                    }
                }
                );
            }
        }
        );
    })
}

export { getTasks, addTask, updateTask, deleteTask };
