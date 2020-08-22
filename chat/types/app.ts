export type User = {
  username: string;
  iconurl: string;
};

export type AlbumItem = {
  date: string;
  dateDisp: string;
  text: string;
  members: User[];
};
