import { gql } from "@apollo/client";

export const SAY_WOW = gql`
    query sayWow($word: String) {
        dogs(word: $word)
    }
`
