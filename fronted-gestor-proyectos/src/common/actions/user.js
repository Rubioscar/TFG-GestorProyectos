import { createAsyncAction } from 'redux-promise-middleware-actions';
import usuario from "../api";

export const singInAction = createAsyncAction('SING_IN', async (form) => {
  const res = await usuario.singIn(form)
  return res;
});

export const changePass = createAsyncAction('CHANGE_PASS', async (form) => {
    const res = await usuario.reset(form)
    return res;
});

