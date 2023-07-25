export type LocalKeys =
    | 'token'
    | 'darkTheme'
    | 'revealNav'
    | 'savedAccounts'
    | 'disabledIn30Time'
    | 'bW'
    | 'bDW'
    | 'bD'
    | 'bDD';

export enum Errors {
    UNKNOWN = 1,
    LOGGED_IN,
    LOGGED_OUT,
    MISSING,
    REQUIRED,
    LENGTH,
    LENGTH_EXACT,
    NOT_BOOLEAN,
    INVALID,
    INVALID_REGEX,
    EMAIL_TAKEN,
    ID_TAKEN,
    ACCOUNT_404,
    ROOM_404,
    POST_404,
    NOT_POST_CREATOR,
    POST_BOTH_TYPES,
    ALREADY_IN_ROOM,
    USE_IN_ROOM,
    USER_NOT_IN_ROOM,
    NOT_IN_ROOM,
    ROOM_NOT_DM,
    DM_EXISTS,
    DM_HIDDEN,
    DM_INACCESSIBLE,
    NOT_OWNER,
    NOT_YOURSELF,
    NOT_FRIEND,
    OVER_FRIENDS_LIMIT,
    FRIEND_ALREADY_SENT,
    FRIEND_ALREADY_PENDING,
    FRIEND_NOT_PENDING,
    FRIEND_ALREADY_ACCEPTED,
    NOT_HIGHER,
    TOO_MUCH,
    DO_AGAIN,
    OVER_LIMIT,
    ALREADY_USED,
    NOT_IN_BETA,
    DISABLED_IN_BETA,
    PRO_REQUIRED,
    NOT_FRONVO,
}

export enum TopPanels {
    Edit,
    Friends,
    Marketplace,
    Admin,
}
