import * as migration_20250330_052411 from './20250330_052411';
import * as migration_20250330_055438 from './20250330_055438';
import * as migration_20250331_021059 from './20250331_021059';
import * as migration_20250331_044312 from './20250331_044312';
import * as migration_20250402_024259 from './20250402_024259';
import * as migration_20250402_024818 from './20250402_024818';
import * as migration_20250403_162638 from './20250403_162638';
import * as migration_20250404_040701 from './20250404_040701';
import * as migration_20250405_223108 from './20250405_223108';
import * as migration_20250405_224028 from './20250405_224028';
import * as migration_20250405_224228 from './20250405_224228';
import * as migration_20250406_004519 from './20250406_004519';
import * as migration_20250407_225726 from './20250407_225726';

export const migrations = [
  {
    up: migration_20250330_052411.up,
    down: migration_20250330_052411.down,
    name: '20250330_052411',
  },
  {
    up: migration_20250330_055438.up,
    down: migration_20250330_055438.down,
    name: '20250330_055438',
  },
  {
    up: migration_20250331_021059.up,
    down: migration_20250331_021059.down,
    name: '20250331_021059',
  },
  {
    up: migration_20250331_044312.up,
    down: migration_20250331_044312.down,
    name: '20250331_044312',
  },
  {
    up: migration_20250402_024259.up,
    down: migration_20250402_024259.down,
    name: '20250402_024259',
  },
  {
    up: migration_20250402_024818.up,
    down: migration_20250402_024818.down,
    name: '20250402_024818',
  },
  {
    up: migration_20250403_162638.up,
    down: migration_20250403_162638.down,
    name: '20250403_162638',
  },
  {
    up: migration_20250404_040701.up,
    down: migration_20250404_040701.down,
    name: '20250404_040701',
  },
  {
    up: migration_20250405_223108.up,
    down: migration_20250405_223108.down,
    name: '20250405_223108',
  },
  {
    up: migration_20250405_224028.up,
    down: migration_20250405_224028.down,
    name: '20250405_224028',
  },
  {
    up: migration_20250405_224228.up,
    down: migration_20250405_224228.down,
    name: '20250405_224228',
  },
  {
    up: migration_20250406_004519.up,
    down: migration_20250406_004519.down,
    name: '20250406_004519',
  },
  {
    up: migration_20250407_225726.up,
    down: migration_20250407_225726.down,
    name: '20250407_225726'
  },
];
