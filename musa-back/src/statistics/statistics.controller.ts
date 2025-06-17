import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) { }

    @Get(':graphic/:range')
    async getStatistics(
        @Param('graphic') graphic: number,
        @Param('range') range: string
    ) {
        console.log(graphic, range);
        return await this.statisticsService.getStatistics(Number(graphic), range);
    }
}
