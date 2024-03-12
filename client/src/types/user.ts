export type TUnidentifiedUser = {
    username: string,
    email: string,
    password: string
}

export type TConfirmedUser = {
    id: string,
    profileId: string,
    username: string,
    email: string
}