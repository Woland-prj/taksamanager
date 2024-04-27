import { TextEncoding } from 'nodemailer/lib/mailer'

export interface MailTemplate {
	to: string
	subject: string
	text: string
	html: string
	textEncoding: TextEncoding
}

export const getActivationTemplate = (
	to: string,
	link: string
): MailTemplate => {
	return {
		to: to,
		subject: 'Активация аккаунта в таксаменеджере',
		text: '',
		html: `
      <div>
        <h1>Перейдите по ссылке для активации аккаунта</h1>
        <a href="${link}">Активировать</a>
      </div>
    `,
		textEncoding: 'base64'
	}
}
