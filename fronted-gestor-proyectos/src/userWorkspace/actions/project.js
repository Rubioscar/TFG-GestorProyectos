import { createAsyncAction } from 'redux-promise-middleware-actions';
import project from "../api";

export const findOneProject = createAsyncAction('FIND_ONE_PROJECT', async (id) => {
  const res = await project.findOne(id)
  return res;
});

