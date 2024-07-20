import { IsNotEmpty, IsString } from 'class-validator';

export class SaveQRRequest {
  @IsString()
  @IsNotEmpty()
  dataToEncode: string;

  @IsString()
  fileName?: string;

  @IsString()
  extension?: string;
}
