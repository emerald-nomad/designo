import * as migration_20250330_052411 from './20250330_052411';

export const migrations = [
  {
    up: migration_20250330_052411.up,
    down: migration_20250330_052411.down,
    name: '20250330_052411'
  },
];
