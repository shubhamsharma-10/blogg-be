import User from '../schema/user.schema.js';
import { nanoid } from 'nanoid';

export async function usernameGen(email: string) {
  let uname = email.split('@')[0];
  let isUserExists = await User.exists({"profileInfo.username": uname});
  while(isUserExists){
      uname = uname + nanoid();
      isUserExists = await User.exists({"profileInfo.username": uname});
  }
  return uname;
 }