import {
  finduserbyname,
  finduserdetail,
  updateuserdetail,
  userlist,
} from "./user";

export const userdata = {
  userlist,
  finduserdetail,
  updateuserdetail,
  finduserbyname,
} as const;
