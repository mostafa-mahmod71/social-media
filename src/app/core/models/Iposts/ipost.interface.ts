import { Userinfo } from '../../../userinfo.interface';

export interface Ipost {
  _id: string;
  id: string;
  body: string;
  image: string | null;

  createdAt: string;

  privacy: 'public' | 'friends' | 'private';

  bookmarked: boolean;
  isShare: boolean;

  likes: string[];
  likesCount: number;

  commentsCount: number;
  sharesCount: number;

  sharedPost: null;
  topComment: Comment | null;

  user: Userinfo;
}
