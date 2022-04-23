import { IsNotEmpty, IsOptional, IsString, isURL, IsUrl, Matches } from "class-validator";

export class CreateShortcodeDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    readonly url: string;
  
    @IsString()
    // @MaxLength(30)
    @IsOptional()
    // @Matches('^[0-9a-zA-Z_]{4,}$')
    readonly shortcode: string;
}
