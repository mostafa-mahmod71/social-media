export interface Icomment {
  _id: string;
  content: string;
  createdAt: string;
  likes: string[];
  parentComment: string | null;
  post: string;
  repliesCount: number;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
}
