import { Injectable } from '@nestjs/common'
import { FormsService } from './forms/forms.service'

@Injectable()
export class AppService {
	constructor(private readonly formsService: FormsService) {}
	async getRowFormData() {
		return await this.formsService.getFormResponses()
	}
}
