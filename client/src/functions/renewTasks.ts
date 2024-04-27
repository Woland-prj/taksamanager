'use server' 
export const renewTasks = async () => {
    const response = await fetch('http://localhost:3000/api/v1/tasks/response', {
        method: 'PATCH'
    })
}