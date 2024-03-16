import { Injectable } from '@nestjs/common'
import { FormsService } from './forms/forms.service'

@Injectable()
export class AppService {
	constructor(private readonly formsService: FormsService) {}

	async getFormResponses() {
		return await this.formsService.getFormResponses()
	}

	async getFormData() {
		return await this.formsService.getForm()
	}
}
