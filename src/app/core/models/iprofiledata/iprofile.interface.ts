export interface Iprofile {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  createdAt: string;
  photo: string;
  cover: string;

  bookmarks: any[];
  followers: string[];
  following: string[];
  bookmarksCount: number;
  followersCount: number;
  followingCount: number;
}
