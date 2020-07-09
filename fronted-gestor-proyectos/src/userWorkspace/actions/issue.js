import { createAsyncAction } from 'redux-promise-middleware-actions';
import { issue } from "../api";

export const getIssues = createAsyncAction('GET_ISSUES', async (filter) => {
  const res = await issue.issues(filter);
  return res;
});

