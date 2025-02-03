export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  imageUrl?: string;
  likes: string[];
  comments: Comment[];
  createdAt: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  bio?: string;
  location?: string;
  website?: string;
  followers: string[];
  following: string[];
} 