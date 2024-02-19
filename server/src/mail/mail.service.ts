import { Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'

@Injectable()
export class MailService {
	private transporter: Transporter
	// constructor() {
	// 	this.transporter = createTransport({
	// 		host: process.env.SMTP_HOST,
	// 		port: +process.env.SMTP_PORT,
	// 		secure: false,
	// 		auth: {
	// 			type: 'OAuth2',
	// 			user: process.env.SMTP_USER,
	// 			clientId: '440888034054-aneuit9t8fidrps8aqkmp326tmra775u.apps.googleusercontent.com',
	// 			clientSecret: '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',
	// 			refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
	// 			provisionCallbackaccessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
	// 			expires: 1484314697598
	// 		}
	// 	})
	// }
	async sendActivationMail(to: string, link: string) {
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
