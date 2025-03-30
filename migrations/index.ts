import * as migration_20250330_052411 from './20250330_052411';
import * as migration_20250330_055438 from './20250330_055438';

export const migrations = [
  {
    up: migration_20250330_052411.up,
    down: migration_20250330_052411.down,
    name: '20250330_052411',
  },
  {
    up: migration_20250330_055438.up,
    down: migration_20250330_055438.down,
    name: '20250330_055438'
  },
];
