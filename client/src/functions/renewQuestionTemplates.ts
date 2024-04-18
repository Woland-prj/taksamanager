'use server'
const renewQuestionTemplates = async () => {
    const resonse = await fetch('http://localhost:3000/api/v1/tasks/templates', {
        method: 'PATCH'
    })
    
}