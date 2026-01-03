import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
};

export type AdminStats = {
  __typename?: 'AdminStats';
  salaryPercentageChange: Scalars['Float']['output'];
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

export type JournalsResponse = {
  __typename?: 'JournalsResponse';
  journals: Array<Journal>;
  totalCount: Scalars['Int']['output'];
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
  getUsersWithStats: UserStatsResponse;
  journal?: Maybe<Journal>;
  journals: JournalsResponse;
  me: User;
};


export type QueryGetUsersWithStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type UserStatsResponse = {
  __typename?: 'UserStatsResponse';
  totalCount: Scalars['Int']['output'];
  users: Array<UserStats>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminStats: ResolverTypeWrapper<AdminStats>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateJournalInput: CreateJournalInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Journal: ResolverTypeWrapper<Journal>;
  JournalsResponse: ResolverTypeWrapper<JournalsResponse>;
  LoginInput: LoginInput;
  MemberMutationResponse: ResolverTypeWrapper<MemberMutationResponse>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Quote: ResolverTypeWrapper<Quote>;
  QuoteInput: QuoteInput;
  RegisterInput: RegisterInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  TagInput: TagInput;
  TagUsage: ResolverTypeWrapper<TagUsage>;
  UpdateJournalInput: UpdateJournalInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserStats: ResolverTypeWrapper<UserStats>;
  UserStatsResponse: ResolverTypeWrapper<UserStatsResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminStats: AdminStats;
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  CreateJournalInput: CreateJournalInput;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Journal: Journal;
  JournalsResponse: JournalsResponse;
  LoginInput: LoginInput;
  MemberMutationResponse: MemberMutationResponse;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Quote: Quote;
  QuoteInput: QuoteInput;
  RegisterInput: RegisterInput;
  String: Scalars['String']['output'];
  Tag: Tag;
  TagInput: TagInput;
  TagUsage: TagUsage;
  UpdateJournalInput: UpdateJournalInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserStats: UserStats;
  UserStatsResponse: UserStatsResponse;
};

export type AdminStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminStats'] = ResolversParentTypes['AdminStats']> = {
  salaryPercentageChange?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalJournals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalMembers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPremiumUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSalary?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type JournalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Journal'] = ResolversParentTypes['Journal']> = {
  actor?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  director?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  movieName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quote?: Resolver<Maybe<Array<ResolversTypes['Quote']>>, ParentType, ContextType>;
  tag?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export type JournalsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['JournalsResponse'] = ResolversParentTypes['JournalsResponse']> = {
  journals?: Resolver<Array<ResolversTypes['Journal']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type MemberMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberMutationResponse'] = ResolversParentTypes['MemberMutationResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createJournal?: Resolver<ResolversTypes['Journal'], ParentType, ContextType, RequireFields<MutationCreateJournalArgs, 'input'>>;
  deleteJournal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteJournalArgs, 'id'>>;
  loginAccount?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginAccountArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  updateJournal?: Resolver<ResolversTypes['Journal'], ParentType, ContextType, RequireFields<MutationUpdateJournalArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  upgradeToPremium?: Resolver<ResolversTypes['MemberMutationResponse'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getAdminStats?: Resolver<ResolversTypes['AdminStats'], ParentType, ContextType>;
  getTags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  getUsersWithStats?: Resolver<ResolversTypes['UserStatsResponse'], ParentType, ContextType, Partial<QueryGetUsersWithStatsArgs>>;
  journal?: Resolver<Maybe<ResolversTypes['Journal']>, ParentType, ContextType, RequireFields<QueryJournalArgs, 'id'>>;
  journals?: Resolver<ResolversTypes['JournalsResponse'], ParentType, ContextType, Partial<QueryJournalsArgs>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type QuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']> = {
  backgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type TagUsageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagUsage'] = ResolversParentTypes['TagUsage']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  journalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastJournalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['TagUsage']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserStatsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStatsResponse'] = ResolversParentTypes['UserStatsResponse']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserStats']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AdminStats?: AdminStatsResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Journal?: JournalResolvers<ContextType>;
  JournalsResponse?: JournalsResponseResolvers<ContextType>;
  MemberMutationResponse?: MemberMutationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quote?: QuoteResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagUsage?: TagUsageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
  UserStatsResponse?: UserStatsResponseResolvers<ContextType>;
};

