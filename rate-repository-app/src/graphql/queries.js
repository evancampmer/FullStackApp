import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after){
      pageInfo{
        endCursor
        hasNextPage
      }
      edges {
        node {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
        }
      }
    }
  }
`

export const REPOSITORY = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
        reviews($first: Int, $after: String){
          totalCount
          edges {
            node {
              id
              text
              rating
              createdAt
              repositoryId
              user {
                id
                username
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
          }
        }
        }
    }
`

export const ME = gql`
query Me($includeReviews: Boolean = false){
    me{
        id
        username
        createdAt
        reviewCount
        reviews @include(if: $includeReviews) {
          edges{
            node{
                id
                text
                rating
                createdAt
                user {
                    id
                    username
                }
                repository {
                  id
                }
              }
            }
          }
    }
}
`