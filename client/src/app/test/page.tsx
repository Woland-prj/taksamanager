import { Scrollbar } from "@/components/Scrollbar/Scrollbar";
import { SideBar } from "@/components/main/SideBar/SideBar";
import TasksContainer from "@/components/main/TasksContainer/TasksContainer";
import { TaskStatus, TaskType } from "@/types/tasks";
import { UserRole } from "@/types/user";

export default function TestPage() {
	const exampleTask = {
		id: '1',
		name: 'Имя',
		status: TaskStatus.INWORK,
		deadline: new Date('12/12/12'),
		type: TaskType.POST,
		questions: []
	}
  return (
    <div style ={{ display: 'flex', flexGrow: '1' }}>
      <SideBar/>
    </div>
  )
}