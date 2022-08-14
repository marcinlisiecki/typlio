interface IUser {
  email: string;
  id: string;
  username: string;
  image: string | null;

  createdAt: Date;
  updatedAt: Date;
}
