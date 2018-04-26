import * as React from "react";

import Group from './Group.svg';

interface ITaskGroupProps {
    completion: number;
    total: number;
    group: string;
    onGroupClick: (index: number) => void;
    index: number;
}

export const TaskGroup: React.StatelessComponent<ITaskGroupProps> = (props: ITaskGroupProps) => {
    return (
        <div style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px", textAlign: "left", cursor: "pointer" }} onClick={onGroupClick(props)}>
            <img src={Group} style={{ float: "left", height: "15px", top: "15px", position: "relative" }} />
            <div style={{ paddingLeft: "25px" }}>
                <div style={{fontSize: "20px", fontWeight: "bold"}}>
                    {props.group}
                </div>
                <div>
                    {props.completion} of {props.total} tasks complete
                </div>
            </div>
        </div>
    )
}

const onGroupClick = (props: ITaskGroupProps) => (e: React.MouseEvent<HTMLDivElement>) => {
    props.onGroupClick(props.index);
}