import { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  readonly name: string;
  readonly phone: string | undefined;
  readonly email: string;
  readonly address: string | undefined;
  readonly password: string;
  readonly dob: Date | undefined;

  comparePassword(password: string): Promise<boolean>;
}

export const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: false, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: false, trim: true },
    password: { type: String, required: true, trim: true },
    dob: { type: Date, required: false, trim: true },
  },
  {
    collection: 'users',
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
