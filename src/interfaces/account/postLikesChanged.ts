// ******************** //
// Interfaces for the postLikesChanged event.
// ******************** //

export interface PostLikesChangedResult {
    author: string;
    postId: string;
    likes: number;
}
