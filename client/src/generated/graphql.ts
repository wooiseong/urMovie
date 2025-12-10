import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AdminStats = {
  __typename?: 'AdminStats';
  totalJournals: Scalars['Int']['output'];
  totalMembers: Scalars['Int']['output'];
  totalPremiumUsers: Scalars['Int']['output'];
  totalSalary: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type CreateJournalInput = {
  actor?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['JSON']['input'];
  director?: InputMaybe<Array<Scalars['String']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  movieName: Scalars['String']['input'];
  quote?: InputMaybe<Array<QuoteInput>>;
  tag?: InputMaybe<Array<TagInput>>;
};

export type Journal = {
  __typename?: 'Journal';
  actor?: Maybe<Array<Scalars['String']['output']>>;
  content: Scalars['JSON']['output'];
  date: Scalars['Date']['output'];
  director?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  movieName: Scalars['String']['output'];
  quote?: Maybe<Array<Quote>>;
  tag?: Maybe<Array<Tag>>;
  updatedAt: Scalars['Date']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MemberMutationResponse = {
  __typename?: 'MemberMutationResponse';
  message: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createJournal: Journal;
  deleteJournal: Scalars['Boolean']['output'];
  loginAccount: AuthPayload;
  registerUser: AuthPayload;
  updateJournal: Journal;
  updateUser: User;
  upgradeToPremium: MemberMutationResponse;
};


export type MutationCreateJournalArgs = {
  input: CreateJournalInput;
};


export type MutationDeleteJournalArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginAccountArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterInput;
};


export type MutationUpdateJournalArgs = {
  id: Scalars['ID']['input'];
  input: UpdateJournalInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  getAdminStats: AdminStats;
  getTags?: Maybe<Array<Tag>>;
  getUsersWithStats: Array<UserStats>;
  journal?: Maybe<Journal>;
  journals?: Maybe<Array<Journal>>;
  me: User;
};


export type QueryJournalArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJournalsArgs = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  tag?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Quote = {
  __typename?: 'Quote';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  textColor?: Maybe<Scalars['String']['output']>;
};

export type QuoteInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  textColor?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterInput = {
  password: Scalars['String']['input'];
  rePassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  selected: Scalars['Boolean']['output'];
};

export type TagInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isEdited?: InputMaybe<Scalars['Boolean']['input']>;
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  selected: Scalars['Boolean']['input'];
};

export type TagUsage = {
  __typename?: 'TagUsage';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type UpdateJournalInput = {
  actor?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  director?: InputMaybe<Array<Scalars['String']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  movieName?: InputMaybe<Scalars['String']['input']>;
  quote?: InputMaybe<Array<QuoteInput>>;
  tag?: InputMaybe<Array<TagInput>>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  rePassword?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserStats = {
  __typename?: 'UserStats';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  journalCount: Scalars['Int']['output'];
  lastJournalDate?: Maybe<Scalars['String']['output']>;
  tags: Array<TagUsage>;
  username: Scalars['String']['output'];
};

export type GetAdminStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminStatsQuery = { __typename?: 'Query', getAdminStats: { __typename?: 'AdminStats', totalMembers: number, totalUsers: number, totalPremiumUsers: number, totalJournals: number, totalSalary: number } };

export type GetUsersWithStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithStatsQuery = { __typename?: 'Query', getUsersWithStats: Array<{ __typename?: 'UserStats', _id: string, username: string, journalCount: number, lastJournalDate?: string | null, createdAt?: string | null, tags: Array<{ __typename?: 'TagUsage', name: string, count: number }> }> };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, role: string } } };

export type LoginAccountMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginAccountMutation = { __typename?: 'Mutation', loginAccount: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, role: string } } };

export type QuoteFieldsFragment = { __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null };

export type JournalFieldsFragment = { __typename?: 'Journal', id: string, movieName: string, director?: Array<string> | null, actor?: Array<string> | null, image?: string | null, content: any, date: any, updatedAt: any, tag?: Array<{ __typename?: 'Tag', id: string, name: string, selected: boolean }> | null, quote?: Array<{ __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null }> | null };

export type GetJournalsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  tag?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetJournalsQuery = { __typename?: 'Query', journals?: Array<{ __typename?: 'Journal', id: string, movieName: string, director?: Array<string> | null, actor?: Array<string> | null, image?: string | null, content: any, date: any, updatedAt: any, tag?: Array<{ __typename?: 'Tag', id: string, name: string, selected: boolean }> | null, quote?: Array<{ __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null }> | null }> | null };

export type GetJournalQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetJournalQuery = { __typename?: 'Query', journal?: { __typename?: 'Journal', id: string, movieName: string, director?: Array<string> | null, actor?: Array<string> | null, image?: string | null, content: any, date: any, updatedAt: any, tag?: Array<{ __typename?: 'Tag', id: string, name: string, selected: boolean }> | null, quote?: Array<{ __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null }> | null } | null };

export type CreateJournalMutationVariables = Exact<{
  input: CreateJournalInput;
}>;


export type CreateJournalMutation = { __typename?: 'Mutation', createJournal: { __typename?: 'Journal', id: string, movieName: string, director?: Array<string> | null, actor?: Array<string> | null, image?: string | null, content: any, date: any, updatedAt: any, tag?: Array<{ __typename?: 'Tag', id: string, name: string, selected: boolean }> | null, quote?: Array<{ __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null }> | null } };

export type UpdateJournalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateJournalInput;
}>;


export type UpdateJournalMutation = { __typename?: 'Mutation', updateJournal: { __typename?: 'Journal', id: string, movieName: string, director?: Array<string> | null, actor?: Array<string> | null, image?: string | null, content: any, date: any, updatedAt: any, tag?: Array<{ __typename?: 'Tag', id: string, name: string, selected: boolean }> | null, quote?: Array<{ __typename?: 'Quote', name?: string | null, content?: string | null, backgroundColor?: string | null, textColor?: string | null }> | null } };

export type DeleteJournalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteJournalMutation = { __typename?: 'Mutation', deleteJournal: boolean };

export type TagFieldsFragment = { __typename?: 'Tag', id: string, name: string };

export type JournalTagFieldsFragment = { __typename?: 'Tag', id: string, name: string, selected: boolean };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null };

export type UpgradeToPremiumMutationVariables = Exact<{ [key: string]: never; }>;


export type UpgradeToPremiumMutation = { __typename?: 'Mutation', upgradeToPremium: { __typename?: 'MemberMutationResponse', message: string, user?: { __typename?: 'User', id: string, username: string, role: string, avatar?: string | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, role: string, avatar?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, role: string, avatar?: string | null } };

export const JournalTagFieldsFragmentDoc = gql`
    fragment JournalTagFields on Tag {
  id
  name
  selected
}
    `;
export const QuoteFieldsFragmentDoc = gql`
    fragment QuoteFields on Quote {
  name
  content
  backgroundColor
  textColor
}
    `;
export const JournalFieldsFragmentDoc = gql`
    fragment JournalFields on Journal {
  id
  movieName
  director
  actor
  tag {
    ...JournalTagFields
  }
  image
  content
  quote {
    ...QuoteFields
  }
  date
  updatedAt
}
    ${JournalTagFieldsFragmentDoc}
${QuoteFieldsFragmentDoc}`;
export const TagFieldsFragmentDoc = gql`
    fragment TagFields on Tag {
  id
  name
}
    `;
export const GetAdminStatsDocument = gql`
    query GetAdminStats {
  getAdminStats {
    totalMembers
    totalUsers
    totalPremiumUsers
    totalJournals
    totalSalary
  }
}
    `;

/**
 * __useGetAdminStatsQuery__
 *
 * To run a query within a React component, call `useGetAdminStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
      }
export function useGetAdminStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(GetAdminStatsDocument, options);
        }
export type GetAdminStatsQueryHookResult = ReturnType<typeof useGetAdminStatsQuery>;
export type GetAdminStatsLazyQueryHookResult = ReturnType<typeof useGetAdminStatsLazyQuery>;
export type GetAdminStatsQueryResult = Apollo.QueryResult<GetAdminStatsQuery, GetAdminStatsQueryVariables>;
export const GetUsersWithStatsDocument = gql`
    query GetUsersWithStats {
  getUsersWithStats {
    _id
    username
    journalCount
    tags {
      name
      count
    }
    lastJournalDate
    createdAt
  }
}
    `;

/**
 * __useGetUsersWithStatsQuery__
 *
 * To run a query within a React component, call `useGetUsersWithStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersWithStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersWithStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersWithStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersWithStatsQuery, GetUsersWithStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersWithStatsQuery, GetUsersWithStatsQueryVariables>(GetUsersWithStatsDocument, options);
      }
export function useGetUsersWithStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersWithStatsQuery, GetUsersWithStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersWithStatsQuery, GetUsersWithStatsQueryVariables>(GetUsersWithStatsDocument, options);
        }
export type GetUsersWithStatsQueryHookResult = ReturnType<typeof useGetUsersWithStatsQuery>;
export type GetUsersWithStatsLazyQueryHookResult = ReturnType<typeof useGetUsersWithStatsLazyQuery>;
export type GetUsersWithStatsQueryResult = Apollo.QueryResult<GetUsersWithStatsQuery, GetUsersWithStatsQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterInput!) {
  registerUser(input: $input) {
    token
    user {
      id
      username
      role
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginAccountDocument = gql`
    mutation LoginAccount($input: LoginInput!) {
  loginAccount(input: $input) {
    token
    user {
      id
      username
      role
    }
  }
}
    `;
export type LoginAccountMutationFn = Apollo.MutationFunction<LoginAccountMutation, LoginAccountMutationVariables>;

/**
 * __useLoginAccountMutation__
 *
 * To run a mutation, you first call `useLoginAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAccountMutation, { data, loading, error }] = useLoginAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginAccountMutation(baseOptions?: Apollo.MutationHookOptions<LoginAccountMutation, LoginAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginAccountMutation, LoginAccountMutationVariables>(LoginAccountDocument, options);
      }
export type LoginAccountMutationHookResult = ReturnType<typeof useLoginAccountMutation>;
export type LoginAccountMutationResult = Apollo.MutationResult<LoginAccountMutation>;
export type LoginAccountMutationOptions = Apollo.BaseMutationOptions<LoginAccountMutation, LoginAccountMutationVariables>;
export const GetJournalsDocument = gql`
    query GetJournals($limit: Int, $offset: Int, $startDate: Date, $endDate: Date, $tag: [String!], $orderBy: String, $order: String) {
  journals(
    limit: $limit
    offset: $offset
    startDate: $startDate
    endDate: $endDate
    tag: $tag
    orderBy: $orderBy
    order: $order
  ) {
    ...JournalFields
  }
}
    ${JournalFieldsFragmentDoc}`;

/**
 * __useGetJournalsQuery__
 *
 * To run a query within a React component, call `useGetJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      tag: // value for 'tag'
 *      orderBy: // value for 'orderBy'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetJournalsQuery(baseOptions?: Apollo.QueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
      }
export function useGetJournalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
        }
export type GetJournalsQueryHookResult = ReturnType<typeof useGetJournalsQuery>;
export type GetJournalsLazyQueryHookResult = ReturnType<typeof useGetJournalsLazyQuery>;
export type GetJournalsQueryResult = Apollo.QueryResult<GetJournalsQuery, GetJournalsQueryVariables>;
export const GetJournalDocument = gql`
    query GetJournal($id: ID!) {
  journal(id: $id) {
    ...JournalFields
  }
}
    ${JournalFieldsFragmentDoc}`;

/**
 * __useGetJournalQuery__
 *
 * To run a query within a React component, call `useGetJournalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJournalQuery(baseOptions: Apollo.QueryHookOptions<GetJournalQuery, GetJournalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalQuery, GetJournalQueryVariables>(GetJournalDocument, options);
      }
export function useGetJournalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalQuery, GetJournalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalQuery, GetJournalQueryVariables>(GetJournalDocument, options);
        }
export type GetJournalQueryHookResult = ReturnType<typeof useGetJournalQuery>;
export type GetJournalLazyQueryHookResult = ReturnType<typeof useGetJournalLazyQuery>;
export type GetJournalQueryResult = Apollo.QueryResult<GetJournalQuery, GetJournalQueryVariables>;
export const CreateJournalDocument = gql`
    mutation CreateJournal($input: CreateJournalInput!) {
  createJournal(input: $input) {
    ...JournalFields
  }
}
    ${JournalFieldsFragmentDoc}`;
export type CreateJournalMutationFn = Apollo.MutationFunction<CreateJournalMutation, CreateJournalMutationVariables>;

/**
 * __useCreateJournalMutation__
 *
 * To run a mutation, you first call `useCreateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJournalMutation, { data, loading, error }] = useCreateJournalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJournalMutation(baseOptions?: Apollo.MutationHookOptions<CreateJournalMutation, CreateJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJournalMutation, CreateJournalMutationVariables>(CreateJournalDocument, options);
      }
export type CreateJournalMutationHookResult = ReturnType<typeof useCreateJournalMutation>;
export type CreateJournalMutationResult = Apollo.MutationResult<CreateJournalMutation>;
export type CreateJournalMutationOptions = Apollo.BaseMutationOptions<CreateJournalMutation, CreateJournalMutationVariables>;
export const UpdateJournalDocument = gql`
    mutation UpdateJournal($id: ID!, $input: UpdateJournalInput!) {
  updateJournal(id: $id, input: $input) {
    ...JournalFields
  }
}
    ${JournalFieldsFragmentDoc}`;
export type UpdateJournalMutationFn = Apollo.MutationFunction<UpdateJournalMutation, UpdateJournalMutationVariables>;

/**
 * __useUpdateJournalMutation__
 *
 * To run a mutation, you first call `useUpdateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJournalMutation, { data, loading, error }] = useUpdateJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJournalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJournalMutation, UpdateJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJournalMutation, UpdateJournalMutationVariables>(UpdateJournalDocument, options);
      }
export type UpdateJournalMutationHookResult = ReturnType<typeof useUpdateJournalMutation>;
export type UpdateJournalMutationResult = Apollo.MutationResult<UpdateJournalMutation>;
export type UpdateJournalMutationOptions = Apollo.BaseMutationOptions<UpdateJournalMutation, UpdateJournalMutationVariables>;
export const DeleteJournalDocument = gql`
    mutation DeleteJournal($id: ID!) {
  deleteJournal(id: $id)
}
    `;
export type DeleteJournalMutationFn = Apollo.MutationFunction<DeleteJournalMutation, DeleteJournalMutationVariables>;

/**
 * __useDeleteJournalMutation__
 *
 * To run a mutation, you first call `useDeleteJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJournalMutation, { data, loading, error }] = useDeleteJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJournalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJournalMutation, DeleteJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJournalMutation, DeleteJournalMutationVariables>(DeleteJournalDocument, options);
      }
export type DeleteJournalMutationHookResult = ReturnType<typeof useDeleteJournalMutation>;
export type DeleteJournalMutationResult = Apollo.MutationResult<DeleteJournalMutation>;
export type DeleteJournalMutationOptions = Apollo.BaseMutationOptions<DeleteJournalMutation, DeleteJournalMutationVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  getTags {
    ...TagFields
  }
}
    ${TagFieldsFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const UpgradeToPremiumDocument = gql`
    mutation UpgradeToPremium {
  upgradeToPremium {
    message
    user {
      id
      username
      role
      avatar
    }
  }
}
    `;
export type UpgradeToPremiumMutationFn = Apollo.MutationFunction<UpgradeToPremiumMutation, UpgradeToPremiumMutationVariables>;

/**
 * __useUpgradeToPremiumMutation__
 *
 * To run a mutation, you first call `useUpgradeToPremiumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeToPremiumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeToPremiumMutation, { data, loading, error }] = useUpgradeToPremiumMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpgradeToPremiumMutation(baseOptions?: Apollo.MutationHookOptions<UpgradeToPremiumMutation, UpgradeToPremiumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeToPremiumMutation, UpgradeToPremiumMutationVariables>(UpgradeToPremiumDocument, options);
      }
export type UpgradeToPremiumMutationHookResult = ReturnType<typeof useUpgradeToPremiumMutation>;
export type UpgradeToPremiumMutationResult = Apollo.MutationResult<UpgradeToPremiumMutation>;
export type UpgradeToPremiumMutationOptions = Apollo.BaseMutationOptions<UpgradeToPremiumMutation, UpgradeToPremiumMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    role
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    role
    avatar
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;