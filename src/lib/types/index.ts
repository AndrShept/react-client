export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  avatarUrl?: string;
  dateOfBirth?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  isOnline: boolean;
  isFollowing: boolean;
  posts: Post[];
  following: Follows[];
  followers: Follows[];
  likes: Like[];
  comments: Comment[];
  conversationsSent: Conversation[];
  conversationsReceived: Conversation[];
  favoritePosts: FavoritePost[];
  notifications: Notification[];
  reply: Reply[];
};

export interface Photo {
  id: string;
  url: string;
  size: number;
  name: string;
  likedByUser: boolean;
  userId?: string;
  user?: User;
  likes: Like[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    comments: number;
    likes: number;
    view: number;
  };
}

export interface View {
  id: string;
  postId?: string;
  post?: Post;
  userId?: string;
  user?: User;
  photoId?: string;
  photo?: Photo;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  content: string;
  comment: Comment;
  commentId: string;
  author: User;
  authorId: string;

  likes: Like[];

  updatedAt: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: NotificationType;
  isRead: boolean;
  user?: User;
  userId?: string;
  author?: User;
  authorId?: string;
  post?: Post;
  postId?: string;
  follows?: Follows;
  followsId?: string;
  like?: Like;
  likeId?: string;
  comment?: Comment;
  commentId?: string;

  createdAt: Date;
  updatedAt: Date;
}

export enum NotificationType {
  Message = 'message',
  Like = 'like',
  Comment = 'comment',
  Post = 'post',
  Follower = 'follower',
}

export interface FavoritePost {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  senderUser: User;
  receiverUser: User;
  senderId: string;
  receiverId: string;
  newMessagesCount: number;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  imageUrl: string;
  conversation: Conversation;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  isRead: boolean;
  authorId: string;
}

export interface UserWithCount extends User {
  _count: {
    comments: number;
    followers: number;
    following: number;
    posts: number;
    likes: number;
    message: number;
    photos: number;
  };
}

export type Follows = {
  id: string;
  follower: User;
  followerId: string;
  following: User;
  followingId: string;
};

export type Post = {
  id: string;
  content: string;
  imageUrl: string;
  author: User;
  authorId: string;

  likes: Like[];
  favoritePosts: FavoritePost[];
  likedByUser: boolean;
  isFavoritePost: boolean;
  _count: { comments: number; view: number };
  createdAt: Date;
  updatedAt: Date;
};

export type Like = {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  authorId: string;
  post?: Post;
  postId?: string;
  replyId?: string;
  reply?: Comment;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  replys: Comment[];
};
export type ErrorMessage = {
  data: {
    message: string;
  };
};

export interface LocationState {
  post: Post;
  mode: 'post';
}

export type LikeType = 'post' | 'comment' | 'photo';
export type SearchType =
  | 'conversations'
  | 'users'
  | 'photo'
  | 'photoModal'
  | undefined;
