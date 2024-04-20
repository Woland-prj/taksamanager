import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import mailComposer from 'nodemailer/lib/mail-composer'
import { MailTemplate, getActivationTemplate } from './mail.templates'

@Injectable()
export class MailService {
	private transporter: Transporter
	// private readonly auth = new google.auth.GoogleAuth({
	// 	keyFile: resolve(process.env.GOOGLE_SERVICE_ACCOUNT_PATH),
	// 	scopes: [
	// 		'https://www.googleapis.com/auth/gmail.modify',
	// 		'https://www.googleapis.com/auth/gmail.compose',
	// 		'https://www.googleapis.com/auth/gmail.send'
	// 	]
	// })
	// private readonly gmail = google.gmail({
	// 	version: 'v1',
	// 	auth: this.auth
	// })
	constructor() {
		this.transporter = createTransport({
			host: process.env.SMTP_HOST,
			port: +process.env.SMTP_PORT,
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	private encodeMail(mail: Buffer) {
		return Buffer.from(mail)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '')
	}

	private async createMail(template: MailTemplate) {
		const composer = new mailComposer(template)
		const compiledMail = await composer.compile().build()
		console.log(composer.compile())
		return this.encodeMail(compiledMail)
	}

	async sendActivationMail(to: string, link: string) {
		// TODO обработка ошибок не существующего email
		try {
			// console.log(await this.createMail(getActivationTemplate(to, link)))
			// const res = await this.gmail.users.messages.send({
			// 	userId: 'me',
			// 	requestBody: {
			// 		raw: await this.createMail(getActivationTemplate(to, link))
			// 	}
			// })
			// console.log(res)
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				to: to,
				subject: 'Активация аккаунта в таксаменеджере',
				text: '',
				html: `
                <div>
                  <h1>Перейдите по ссылке для активации аккаунта</h1>
                  <a href="${link}">Активировать</a>
                </div>
              `
			})
		} catch (e) {
			// throw new HttpException(e, HttpStatus.BAD_REQUEST)
			console.log(e)
		}
	}
}
