import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from 'src/common/logger/winstonLogger.module';
import { DatabaseModule } from '../common/database/database.module';
import { TodayWalkTime } from './daily-walk-time.entity';
import { DailyWalkTimeRepository } from './daily-walk-time.repository';
import { DailyWalkTimeService } from './daily-walk-time.service';

@Module({
    imports: [DatabaseModule.forFeature([TodayWalkTime]), WinstonLoggerModule],
    providers: [DatabaseModule, DailyWalkTimeRepository, DailyWalkTimeService],
    exports: [DatabaseModule, DailyWalkTimeRepository, DailyWalkTimeService],
})
export class DailyWalkTimeModule {}
