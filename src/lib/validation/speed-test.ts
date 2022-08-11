import * as yup from 'yup';

export const NewSpeedTestValidationSchema: yup.SchemaOf<INewSpeedTest> = yup.object().shape({
  cpm: yup.number().required(),
  mode: yup.string().required(),
  mistakes: yup.number().required(),
  accuracy: yup.number().min(0).max(100).required(),
  time: yup.number().required(),
});
