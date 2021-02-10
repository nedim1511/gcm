import { UserMetaData } from "./user-meta-data.model";

export class RegisterModel {
  constructor(
    public client_id?: string,
    public email?: string,
    public password?: string,
    public connection?: string,
    public given_name?: string,
    public family_name?: string,
    public user_metadata?: UserMetaData,
    public _id?: string,
    public email_verified?: boolean
  ) {}
}
