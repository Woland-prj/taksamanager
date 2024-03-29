export type TLoggingInUser = {
    email: string,
    password: string
}

export type TNewUser = {
    username: string,
    email: string,
    password: string
}

export type TConfirmedNewUser = {
    id: string,
    profileId: string,
    username: string,
    email: string
}

export type TAccessToken = string

export type TRefreshToken = string

export type TJWTResponse = {
    access_token: TAccessToken
    refresh_token: TRefreshToken}