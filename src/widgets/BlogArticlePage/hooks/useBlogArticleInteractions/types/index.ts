export type BlogArticleInteractions = {
    isStarred: boolean;
    isSaved: boolean;
    isShareCopied: boolean;
    displayStars: number;
    handleToggleStar: () => void;
    handleToggleSaved: () => void;
    handleCopyShareLink: () => Promise<void>;
  };
  
export type UseBlogArticleInteractionsParams = {
    articleId: string | number;
    baseStars: number;
  };