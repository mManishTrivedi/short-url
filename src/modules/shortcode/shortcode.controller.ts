import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
  ConflictException,
  UnprocessableEntityException,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { ShortcodeService } from './shortcode.service';
import { CreateShortcodeDto } from './dto/create-shortcode.dto';

@Controller()
export class ShortcodeController {
  protected logger = new Logger(ShortcodeController.name);

  constructor(private readonly shortcodeService: ShortcodeService) {}

  @Post('/shorten')
  async create(@Body() createShortcodeDto: CreateShortcodeDto) {
    if (createShortcodeDto.shortcode) {
      // make sure
      if (!createShortcodeDto.shortcode.match('^[0-9a-zA-Z_]{4,}$')) {
        throw new UnprocessableEntityException(
          'Invalid Alias. Must be alphanumeric and _ allowed',
        );
      }

      const record = await this.shortcodeService.findOne({
        shortcode: createShortcodeDto.shortcode,
      });

      if (record) {
        this.logger.error('Requested alias/shortcode is already exist', record);
        throw new ConflictException(
          'Requested alias/shortcode is already exist',
        );
        // res.status(409).json({message: 'requested alias/shortcode is already exist'})
      }
    }
    const record = await this.shortcodeService.create(createShortcodeDto);

    return { shortcode: record.shortcode };
  }

  @Redirect('https://docs.nestjs.com', 302)
  @Get('/:shortcode')
  async findOne(@Param('shortcode') shortcode: string) {
    const record = await this.shortcodeService.findOne({ shortcode });

    if (record) {
      // Async call fro update last seen and increment redirectCount
      this.shortcodeService.updateCount(record._id);
      return { url: record.url };
    }

    throw new NotFoundException('Requested alias/shorcode does not exist!');
  }

  @Get('/:shortcode/stats')
  async findStats(@Param('shortcode') shortcode: string) {
    const record = await this.shortcodeService.findOne({ shortcode });

    if (record) {
      return {
        startDate: record.startDate,
        lastSeenDate: record.lastSeenDate,
        redirectCount: record.redirectCount,
      };
    }

    throw new NotFoundException('Requested alias/shorcode does not exist!');
  }

  // @Get()
  // findAll() {
  //   return this.shortcodeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shortcodeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShortcodeDto: UpdateShortcodeDto) {
  //   return this.shortcodeService.update(+id, updateShortcodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shortcodeService.remove(+id);
  // }
}
