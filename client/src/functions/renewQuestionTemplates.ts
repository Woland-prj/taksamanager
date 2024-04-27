'use server' 
export const renewQuestionTemplates = async () => {
    const response = await fetch('http://localhost:3000/api/v1/tasks/template', {
        method: 'PATCH'
    })
}