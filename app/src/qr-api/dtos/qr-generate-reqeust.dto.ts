import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateQRRequest {
  @IsString()
  @IsNotEmpty()
  dataToEncode: string;
}
