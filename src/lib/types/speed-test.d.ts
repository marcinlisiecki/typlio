interface INewSpeedTest {
  time: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  mode: string;
}

interface IHistory {
  cpm: number;
  accuracy: number;
  mode: string;
  id: string;
  createdAt: Date;
}
