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
  favoritePosts : FavoritePost[]
};

export interface FavoritePost {
  id: string;
  user: User;
  userId: string
  post: Post;
  postId: string
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
  newMessagesCount: number
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  conversation: Conversation;
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  isRead: boolean
  authorId: string;
}

export interface UserWithCount extends User {
  _count: {
    comments: number;
    followers: number;
    following: number;
    posts: number;
    likes: number;
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
  favoritePosts : FavoritePost[]
  // comments: Comment[];
  likedByUser: boolean;
  isFavoritePost: boolean
  _count: {comments: number}
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
  user: User;
  userId: string;
  post: Post;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
};
export type ErrorMessage = {
  data: {
    message: string;
  };
};
