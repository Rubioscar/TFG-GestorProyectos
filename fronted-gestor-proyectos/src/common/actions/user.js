import { createAsyncAction } from 'redux-promise-middleware-actions';
import usuario from "../api";

const singInAction = createAsyncAction('SING_IN', async (form) => {
  const res = await usuario.singIn(form)
  return res;
});

export default singInAction;
