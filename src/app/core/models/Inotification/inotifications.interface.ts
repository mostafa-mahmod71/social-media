export interface Inotifications {
  _id: string;
  isRead: boolean;
  type: string;
  entityType: string;
  entityId: string;
  createdAt: string;
  actor: {
    _id: string;
    name: string;
    photo: string;
  };
  recipient: {
    _id: string;
    name: string;
    photo: string;
  };
  entity: {
    _id: string;
    body: string;
    image?: string;
    user: string;
    commentsCount?: number;
  };
}
