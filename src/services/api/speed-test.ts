import { AxiosResponse } from 'axios';
import api from 'lib/api';

export const SpeedTestService = {
  Save: (data: INewSpeedTest): Promise<AxiosResponse> => api.post('/me/speed-tests', { ...data }),
};
