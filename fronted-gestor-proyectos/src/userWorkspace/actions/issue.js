import { createAsyncAction } from 'redux-promise-middleware-actions';
import { issue } from "../api";

export const getIssues = createAsyncAction('GET_ISSUES', async (filter) => {
  const res = await issue.issues(filter);
  return res;
});

export const getIssuesStatus = createAsyncAction('GET_ISSUES_STATUS', async () => {
  const res = await issue.status();
  return res;
});

export const getIssuesTypes = createAsyncAction('GET_ISSUES_TYPES', async () => {
  const res = await issue.types();
  return res;
});
