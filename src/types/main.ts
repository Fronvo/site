// ******************** //
// Shared types for the app route, after login.
// ******************** //

export enum PanelTypes {
    Home,
    Profile,
    Communities,
}

export enum ModalTypes {
    Settings,
    FollowInfo,
    EditProfile,
    CreatePost,
    ViewPost,
    FindProfiles,
    MaxOnlineTime,
    CreateCommunity,
    JoinCommunity,
    FindCommunities,
    LeaveCommunity,
    CommunityMembers,
    EditCommunity,
    ConfirmDeleteMessage,
    JoinRequests,
    EditJoinRequest,
    DeletePost,
    JoinFronvo,
    ShowBans,
}

export enum DropdownTypes {
    CommunityInfo,
    PostOptions,
    CommunityMember,
    CommunityMemberUnban,
}

export interface DropdownActions {
    title: string;
    callback: () => void;
    condition?: boolean;
}

export interface ModalActions {
    title: string;
    callback: () => void;
}

export interface ModalData {
    titlePreSpan?: any;
    titleIcon?: string;
    titleDropdown?: any;
    titleDropdownCondition?: () => boolean;
    titleListener?: () => void;
    titleListenerCondition?: () => boolean;
    title: string;
    actions: ModalActions[];
    noSeperator?: boolean;
    removeTransparency?: boolean;
}
