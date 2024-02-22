import { Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'

@Injectable()
export class MailService {
	private transporter: Transporter
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
	async sendActivationMail(to: string, link: string) {
		// TODO обработка ошибок не существующего email
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
	}
}
