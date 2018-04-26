export interface ITask {
    completedAt: any,
    dependencyIds: number[],
    task: string,
    group: string,
    id: number
    complete: boolean
}