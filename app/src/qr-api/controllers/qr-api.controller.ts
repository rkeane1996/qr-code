import { Body, Controller, Post } from '@nestjs/common';
import { QrApiService } from '../service/qr-api.service';
import { GenerateQRRequest } from '../dtos/qr-generate-reqeust.dto';
import { SaveQRRequest } from '../dtos/qr-save-reqeust.dto';

@Controller('qr-api')
export class QrApiController {
  constructor(readonly qrService: QrApiService) {}

  @Post('/generate')
  async generateQRCode(@Body() request: GenerateQRRequest) {
    return await this.qrService.generateQRCode(request.dataToEncode);
  }

  @Post('/save')
  async saveQRCode(@Body() request: SaveQRRequest) {
    return await this.qrService.saveQRCode(request);
  }
}
