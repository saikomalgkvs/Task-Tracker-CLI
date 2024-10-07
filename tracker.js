#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const FILE_PATH = path.join(__dirname, 'tasks.json')

function initialize(){
    if(!fs.existsSync(FILE_PATH)){
        // create a json file and initialize it with an empty array
        fs.writeFileSync(FILE_PATH, JSON.stringify([]))
        return true
    }
    return false
}

function loadData(){
    const data = fs.readFileSync(FILE_PATH)
    return JSON.parse(data)
}
function save(data){
    fs.writeFileSync(FILE_PATH, JSON.stringify(data,null,3))
}

// ADD TASK
function addTask(newtask){
    const data = loadData()
    
    const task = {
        id : data.length+1,
        description : newtask,
        status : 'todo',
        createdAt : new Date().toLocaleString(),
        updatedAt : new Date().toLocaleString(),
    }

    data.push(task)
    save(data)
    console.log(`Task added - ID : ${task.id}`)
}

// UPDATE TASK
function updateTask(id, description){
    const data = loadData()
    const task = data.find((x) => x.id == id)
    if(!task){
        console.log('Please enter valid a ID')
        return
    }

    task.description = description
    task.updatedAt = new Date().toLocaleString()
    save(data)
    console.log(`Task with ID: ${id} updated`)
}

// DELETE TASK
function deleteTask(id){
    const data = loadData()
    const newdata = data.filter((task) => task.id != id)
    if(data.length == newdata.length){
        console.log(`Task with ID: ${id} NOT FOUND`)
    }
    else{
        save(newdata)
        console.log(`Task with ID: ${id} deleted`)
    }
    
}

// CHANGE STATUS
function changeStatus(id, status){
    const data = loadData()
    let task = data.find((x)=> x.id == id)
    
    if(!task){
        console.log(`Please enter a valid ID`)
        return
    }

    task.status = status
    task.updatedAt = new Date().toLocaleString()
    save(data)
    console.log(`Status changed to '${status}'`)
}

// DISPLAY TASKS
function list(arg){
    const data = arg === undefined ? loadData() : arg
    data.forEach(task => {
        console.log(`${task.id}:\tDescription - ${task.description},\tStatus - ${task.status},\tStarted on - ${task.createdAt},\tUpdated on - ${task.updatedAt}`)
    })
}

// DISPLAY TASKS BY STATUS
function listFilter(status){
    const data = loadData()
    const filteredData = data.filter((task) => task.status == status)

    if(filteredData.length != 0) list(filteredData)
    else console.log(`No tasks are there with status: ${status}`)
}


function printDocumentation(){
    console.log(`\nRefer to the following documention\n`)
    console.log(`To add task: node tracker add 'task1' 'task2' ....\n`)
    console.log(`To update description of a task: node update 'id' 'new_description'\n`)
    console.log(`To delete a task: node tracker delete 'id1' 'id2' 'id3'....`)
    console.log(`To delete all tasks: node tracker delete all\n`)
    console.log(`To change the status of a task:
        To mark as 'in-progress': node tracker 'id' mark in-progress
        To mark as 'done': node traker 'id' mark done
        To mark as 'todo': node tracker 'id' mark todo`)
}
const [command, ...args] = process.argv.slice(2)

function main(){
    initialize()

    switch (command) {
        case 'help':
        case undefined:
            printDocumentation()
            break
        case 'add':
            args.forEach(x=>addTask(x))
            break
        case 'update':
            updateTask(args[0],args[1])
            break
        case 'list':
            if(args.length == 0) list()
            else listFilter(args[0])
            break
        case 'delete':
            if(args[0] == 'all'){
                save([])
                console.log('All tasks deleted')
                break
            }
            args.forEach(x=>deleteTask(x))
            break
        case 'mark':
            changeStatus(args[0], args[1])
            break
        default:
            console.log(`${command} is invalid`)
            console.log(`For documentation type "node tracker help"`)
    }
}

main()