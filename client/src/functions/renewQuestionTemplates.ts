'use server'
export const renewQuestionTemplates = async () => {
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_API_HOST || 'localhost:3200'}/api/v1/tasks/templates`,
		{
			method: 'PATCH'
		}
	)
}
