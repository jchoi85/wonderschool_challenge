import * as React from "react";

import { ITask } from "./"

import Completed from "./Completed.svg";
import Incomplete from './Incomplete.svg';
import Locked from "./Locked.svg";


interface ITaskListProps {
    task: ITask;
    locked: boolean;
    onTaskClick: (id: number) => void;
}

export const TaskList: React.StatelessComponent<ITaskListProps> = (props: ITaskListProps) => {
    return (
        <div style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px", textAlign: "left" }}>
            {props.locked ?
                <img src={Locked} style={{ float: "left", height: "15px", top: "5px", position: "relative" }} />
            : 
                <img src={props.task.complete ? Completed : Incomplete} style={{ float: "left", height: "15px", top: "5px", position: "relative", cursor: "pointer" }} onClick={onTaskClick(props)} />
            }
            <div style={{ paddingLeft: "25px" }}>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {props.task.task}
                </div>
            </div>
        </div>
    )
}

const onTaskClick = (props: ITaskListProps) => (e: React.MouseEvent<HTMLImageElement>) => {
    props.onTaskClick(props.task.id);
}