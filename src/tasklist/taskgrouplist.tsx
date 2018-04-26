import * as React from "react";

import { ITask, TaskList, TaskGroup } from "./"

interface ITaskGroupListState {
    tasks: ITask[][];
    taskDict: { [taskId: number]: boolean }
    groups: string[];
    completion: number[];
    currentGroup: number;
}

export class TaskGroupList extends React.Component<{}, ITaskGroupListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            groups: [],
            completion: [],
            currentGroup: 0,
            taskDict: {}
        }
    }

    public componentDidMount() {
        const response = payload; // here's where an API call would go
        const newResponse: ITask[] =[];

        response.forEach(item => newResponse.push({...item, complete: false})); // add complete flag to each item in payload
                                                                                // (not sure if completed at was supposed to be used or not, could have used Moment to get UTC time instead)

        const tasks: ITask[][] = [];
        const groups: string[] = [];
        const completion: number[] = [0];
        const taskDict: { [taskId: number]: boolean } = {}  // create dictionary for looking up of completion status

        let taskIndex = 0;

        tasks[0] = [newResponse[0]];
        groups[0] = newResponse[0].group;
        taskDict[newResponse[0].id] = false;

        for (let i = 1; i < newResponse.length; i++) { // assign the tasks based on groups
            let noDependencies = true;  

            newResponse[i].dependencyIds.forEach(itm => {   // check dependencies, and only add to list if dependencies exist
                if(taskDict[itm] === undefined) {
                    noDependencies = false;
                }
            })

            if(noDependencies) {                
                if (newResponse[i].group === tasks[taskIndex][0].group) {
                    tasks[taskIndex].push(newResponse[i]);
                } else {
                    taskIndex++;
                    tasks[taskIndex] = [newResponse[i]];
                    groups.push(newResponse[i].group);
                    completion.push(0);
                }
                taskDict[newResponse[i].id] = false;
            }
        }

        this.setState({ tasks, groups, completion, taskDict });
    }

    public render() {
        return (
            <div className="container" style={{ paddingTop: "5vh" }}>
                <div className="row">
                    <div className="col-md-3 col-md-offset-3">
                        {this.state.groups.map((group, index) => this.TaskGroupSingle(group, index))} 
                    </div>
                    <div className="col-md-3">
                        {this.state.tasks[0] ? this.state.tasks[this.state.currentGroup].map((task) => this.TaskListSingle(task)) : ""}
                    </div>
                </div>
            </div>
        )
    }

    private TaskGroupSingle = (group: string, index: number) => { // used to map groups
        return(
            <TaskGroup key={index} index={index} group={group} completion={this.state.completion[index]} total={this.state.tasks[index].length} onGroupClick={this.onGroupClick} />
        )
    }

    private TaskListSingle = (task: ITask) => { // used to map single lists
        let locked = false;

        task.dependencyIds.forEach(itm => { // determine if task is locked or unlocked by checking dictionary
            if(!this.state.taskDict[itm]){
                locked = true;
            }
        })
        return(
            <TaskList key={task.id} task={task} locked={locked} onTaskClick={this.onTaskClick} />
        )
    }

    private onGroupClick = (index: number) => { // changes current group based on click
        this.setState({
            currentGroup: index
        })
    }
    
    private onTaskClick = (taskId: number) => { // changes task completion status
        const tasks = this.state.tasks
        const thisGroup = tasks[this.state.currentGroup];

        let increment = 0;

        thisGroup.forEach((task, index) => { // finds the task based on id and changes the status
            if(task.id === taskId){
                increment = thisGroup[index].complete ? -1 : 1; // increment the amount of tasks completed based on whether it was already completed
                thisGroup[index].complete = !thisGroup[index].complete;
            }
        })

        tasks[this.state.currentGroup] = thisGroup;

        const taskDict = this.state.taskDict;
        taskDict[taskId] = !taskDict[taskId];

        const completion = this.state.completion;
        completion[this.state.currentGroup] += increment;

        this.setState({ // update tasks, taskdictionary, and completion count 
            tasks, taskDict, completion 
        })
    }
}

const payload = [
    {
        id: 1,
        group: "Purchases",
        task: "Go to the bank",
        dependencyIds: [],
        completedAt: null,
    },
    {
        id: 2,
        group: "Purchases",
        task: "Buy hammer",
        dependencyIds: [1],
        completedAt: null,
    },
    {
        id: 3,
        group: "Purchases",
        task: "Buy wood",
        dependencyIds: [1],
        completedAt: null,
    },
    {
        id: 4,
        group: "Purchases",
        task: "Buy nails",
        dependencyIds: [1],
        completedAt: null,
    },
    {
        id: 5,
        group: "Purchases",
        task: "Buy paint",
        dependencyIds: [1],
        completedAt: null,
    },
    {
        id: 6,
        group: "Build Airplane",
        task: "Hammer nails into wood",
        dependencyIds: [2, 3, 4],
        completedAt: null,
    },
    {
        id: 7,
        group: "Build Airplane",
        task: "Paint wings",
        dependencyIds: [5, 6],
        completedAt: null,
    },
    {
        id: 8,
        group: "Build Airplane",
        task: "Have a snack",
        dependencyIds: [11],
        completedAt: null,
    }
];