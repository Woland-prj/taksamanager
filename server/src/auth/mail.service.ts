import { Injectable } from "@nestjs/common"

@Injectable()
export class MailService {
  async validateMail() {
    console.log('validate mail')
  }
}
