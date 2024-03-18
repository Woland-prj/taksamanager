import { QuestionTemplate } from '@prisma/client'

export class Task {}

export class TaskQ {
	questionText: string
	answerText: string
}

export enum DefaultFields {
	NAME = 'Название задачи',
	DEADLINE = 'Дедлайн сдачи работы',
	CLIENTNAME = 'Имя заказчика'
}

export type DefaultTemplates = {
	nameTemp: QuestionTemplate
	deadlineTemp: QuestionTemplate
	clientTemp: QuestionTemplate
}
