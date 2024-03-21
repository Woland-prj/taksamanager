import { Module } from '@nestjs/common'
import { FormsService } from './forms.service'

@Module({
	imports: [],
	providers: [FormsService],
	exports: [FormsService]
})
export class FormsModule {}
