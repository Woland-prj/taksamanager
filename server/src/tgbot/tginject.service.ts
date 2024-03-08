import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { TGContext } from './interfaces/context.interface'

@Injectable()
export class TgbotService {
	constructor(@InjectBot() private bot: Telegraf<TGContext>) {}
}
