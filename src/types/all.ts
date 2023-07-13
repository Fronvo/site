export type LocalKeys = 'token' | 'darkTheme' | 'revealNav' | 'savedAccounts';

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
    ALREADY_IN_ROOM,
    NOT_IN_ROOM,
    NOT_OWNER,
    NOT_YOURSELF,
    NOT_FRIEND,
    FRIEND_ALREADY_SENT,
    FRIEND_ALREADY_PENDING,
    FRIEND_ALREADY_ACCEPTED,
    NOT_HIGHER,
    TOO_MUCH,
}

export enum TopPanels {
    Edit,
    Friends,
    Marketplace,
    Admin,
}
