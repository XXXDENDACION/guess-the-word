export interface UserData {
    provider: string;
    name: string;
    email: string;
    socialId: string;
}

export interface UserMeData extends UserData {
    accessToken: string;
    refreshToken: string;
}
