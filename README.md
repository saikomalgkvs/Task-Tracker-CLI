
# Task Tracker CLI

This is a Command Line Interface project which can be used to store and manage your daily tasks. This projects tracks your task's status, your start-date and updated-date. All your tasks are stored in ```tasks.json``` file.
## Installation

To run this project, firstly clone this repository on your local computer using the following command.

```bash
  git clone https://github.com/saikomalgkvs/Task-Tracker-CLI.git
```

If you do not have ```node.js```, please install it.

- Delete the existing ```tasks.json``` file.
- Open terminal and you are now ready to go.




## How to use

To add a task or many use ```node tracker add 'task1' 'task2' ....``` All your tasks are store in the json file, and will create a new one if doesn't exists.

For each tasks the following fields are created:
- ID
- Description
- Status
- Created at
- Updated at

To update the description of a task use ```node tracker update 'id' 'new description'```

To change the status of task use ```node tracker mark 'id' 'new status'``` Examples of new status can be - ```in progress```, ```done``` etc...

To delete a task or many use ```node tracker delete 'id1' 'id2' ....```
To delete all tasks use ```node tracker delete all```

To display all the tasks use ```node tracker list```
To display the tasks by status use ```node tracker list 'status'```

For documentation use ```node tracker``` or ```node tracker help```



## Reference

 - This project is submission for a project under the projects section of [roadmap.sh](roadmap.sh) 
 - To know more about this project [click here](https://roadmap.sh/projects/task-tracker)
 

