import { Injectable } from '@nestjs/common'
import { forms_v1, google } from 'googleapis'
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

	/**
	 * Retrieves form responses asynchronously.
	 *
	 * @return {Promise<forms_v1.Schema$ListFormResponsesResponse>} the form responses data
	 */
	getFormResponses =
		async (): Promise<forms_v1.Schema$ListFormResponsesResponse> => {
			const res = await this.forms.forms.responses.list({
				formId: process.env.GOOGLE_FORM_ID
			})
			return res.data
		}

	/**
	 * Asynchronously retrieves a form.
	 *
	 * @return {Promise<forms_v1.Schema$Form>} the data returned from the form request
	 */
	getForm = async (): Promise<forms_v1.Schema$Form> => {
		const res = await this.forms.forms.get({
			formId: process.env.GOOGLE_FORM_ID
		})
		return res.data
	}
}
