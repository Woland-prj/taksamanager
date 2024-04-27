import { QuestionTemplate } from '@prisma/client'

export class TaskQ {
	questionText: string
	answerText: string
}

export enum DefaultFields {
	NAME = 'Название задачи',
	DEADLINE = 'Дедлайн сдачи работы',
	CLIENTNAME = 'Имя заказчика',
	TYPE = 'Вид задачи'
}

export enum TaskFormType {
	FORM_PHOTO = 'Фотосъемка',
	FORM_VIDEO = 'Видеосъемка / анимация',
	FORM_POST = 'Текст поста',
	FORM_DESIGN = 'Дизайн',
	FORM_MONTAGE = 'Монтаж'
}

export type DefaultTemplates = {
	nameTemp: QuestionTemplate
	deadlineTemp: QuestionTemplate
	clientTemp: QuestionTemplate
	typeTemp: QuestionTemplate
}
