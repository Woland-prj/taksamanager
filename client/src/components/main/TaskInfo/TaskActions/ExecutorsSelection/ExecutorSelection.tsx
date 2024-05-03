import { FC } from "react"
import { Executor } from "../Executors/Executor/Executor"
import { TUser } from "@/types/user"
import localFont from "next/font/local"

type TExecutorSelectionProps = {
    className: string
}
const euclid400 = localFont({
	src: [{
		path: '../../../../../fonts/EuclidCircularBLight.ttf',
		weight: '400',
	}]
})
export const ExecutorSelection: FC<TExecutorSelectionProps> = ({className}) => {
    const users: TUser[] = []
    return (
        <div className={className}>
            <span className={euclid400.className}>Выбери одного или нескольких исполнителей</span>
            {users.map((user) => (<Executor user={user}/>))}
        </div>
    )
}