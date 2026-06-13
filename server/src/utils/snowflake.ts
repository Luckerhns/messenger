class SnowflakeGenerator {
  private nodeId: number;
  private sequence: number = 0;
  private lastTimestamp: number = -1;

  constructor(nodeId: number) {
    if (nodeId < 0 || nodeId > 1023) {
      throw new Error('Node ID must be between 0 and 1023');
    }
    this.nodeId = nodeId;
  }

  generate(): string {
    const timestamp = Date.now() - 1577836800000; // эпоха с 2020-01-01

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 0xFFF; // 12 бит
      if (this.sequence === 0) {
        while (Date.now() - 1577836800000 <= timestamp) {}
        this.lastTimestamp = Date.now() - 1577836800000;
      }
    } else {
      this.sequence = 0;
      this.lastTimestamp = timestamp;
    }

    // Сборка ID через битовые операции
    let id = (timestamp << 22) | (this.nodeId << 12) | this.sequence;
    return id.toString();
  }

  decode(snowflakeId: string): { timestamp: Date; nodeId: number; sequence: number } {
    const id = parseInt(snowflakeId, 10);

    const sequence = id & 0xFFF;           // Последние 12 бит
    const nodeId = (id >> 12) & 0x3FF; // Следующие 10 бит
    const timestamp = (id >> 22) + 1577836800000; // Первые 41 бит

    return {
      timestamp: new Date(timestamp),
      nodeId,
      sequence
    };
  }
}

export default SnowflakeGenerator;
