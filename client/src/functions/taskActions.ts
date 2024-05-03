import { redirectToPage } from "./redirectToPage"
import { createTaskURL } from "@/app/dashboard/page"
export const redirectToTaskForm = async () => {
    redirectToPage(createTaskURL)
}
