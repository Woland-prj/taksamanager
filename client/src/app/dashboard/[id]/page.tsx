import { TaskInfo } from "@/components/main/TaskInfo/TaskInfo";
import { PageHeader } from "@/components/main/PageHeader/PageHeader";
import { useState } from "react";


export default function TestTaskPage({
    params,
}: {
    params: {id: string}
}) {
    return (
        <TaskInfo></TaskInfo>
    )
}