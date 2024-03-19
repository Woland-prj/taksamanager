import { Injectable } from '@nestjs/common'
import { google } from 'googleapis'
import { resolve } from 'path'

@Injectable()
export class FormsService {
	private readonly auth = new google.auth.GoogleAuth({
		keyFile: resolve(process.env.GOOGLE_SERVICE_ACCOUNT_PATH),
		scopes: [
			'https://www.googleapis.com/auth/forms.body',
			'https://www.googleapis.com/auth/forms.body.readonly',
			'https://www.googleapis.com/auth/forms.responses.readonly'
		]
	})

	private readonly forms = google.forms({
		version: 'v1',
		auth: this.auth
	})

	async getFormResponses() {
		const res = await this.forms.forms.responses.list({
			formId: process.env.GOOGLE_FORM_ID
		})
		return res.data
	}

	async getForm() {
		const res = await this.forms.forms.get({
			formId: process.env.GOOGLE_FORM_ID
		})
		return res.data
	}
}
