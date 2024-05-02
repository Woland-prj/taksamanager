'use client'
import { TaskInfo } from "@/components/main/TaskInfo/TaskInfo";
import { PageHeader } from "@/components/main/PageHeader/PageHeader";
import { useEffect, useLayoutEffect, useState } from "react";
import redirectByJWT from "@/functions/redirectByJWT";


export default function TaskPage() {
	redirectByJWT()
    return (<>
        <TaskInfo></TaskInfo>
    </>)
}