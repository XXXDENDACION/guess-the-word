import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    query signIn($input: loginUserInput!) {
        login(input: $input) {
            accessToken,
            refreshToken
        }
    }
`

export const REFRESH_ACCESS_TOKEN = gql`
    query refreshAccessToken($refreshToken: String!) {
        refresh(refreshToken: $refreshToken) {
            accessToken,
            refreshToken
        }
    }
`
