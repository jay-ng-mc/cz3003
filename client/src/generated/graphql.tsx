import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  getQuestion?: Maybe<Question>;
  getGame?: Maybe<Game>;
  getStudentTeacher?: Maybe<StudentTeacher>;
  getCharacter?: Maybe<Character>;
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['Float'];
};


export type QueryGetGameArgs = {
  id: Scalars['Float'];
};


export type QueryGetStudentTeacherArgs = {
  teacher: Scalars['String'];
};


export type QueryGetCharacterArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  userType: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  type: Scalars['String'];
  questionTitle: Scalars['String'];
  A: Scalars['String'];
  B: Scalars['String'];
  C: Scalars['String'];
  D: Scalars['String'];
  correctAnswer: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Float'];
  username: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  score: Scalars['Float'];
};

export type StudentTeacher = {
  __typename?: 'StudentTeacher';
  id: Scalars['Float'];
  student: Scalars['String'];
  teacher: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['Float'];
  username: Scalars['String'];
  characterId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateGame: GameResponse;
  updateStudentTeacher: StudentTeacherResponse;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationUpdateGameArgs = {
  options: GameInput;
};


export type MutationUpdateStudentTeacherArgs = {
  options: StudentTeacherInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  userRole: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  userRole: Scalars['String'];
};

export type GameResponse = {
  __typename?: 'GameResponse';
  game?: Maybe<Game>;
};

export type GameInput = {
  username: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  score: Scalars['String'];
};

export type StudentTeacherResponse = {
  __typename?: 'StudentTeacherResponse';
  studentTeacher?: Maybe<StudentTeacher>;
};

export type StudentTeacherInput = {
  student: Scalars['String'];
  teacher: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  userRole: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  userRole: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UpdateGameMutationVariables = Exact<{
  username: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  score: Scalars['String'];
}>;


export type UpdateGameMutation = (
  { __typename?: 'Mutation' }
  & { updateGame: (
    { __typename?: 'GameResponse' }
    & { game?: Maybe<(
      { __typename?: 'Game' }
      & Pick<Game, 'username' | 'startTime' | 'endTime' | 'score'>
    )> }
  ) }
);

export type UpdateStudentTeacherMutationVariables = Exact<{
  student: Scalars['String'];
  teacher: Scalars['String'];
}>;


export type UpdateStudentTeacherMutation = (
  { __typename?: 'Mutation' }
  & { updateStudentTeacher: (
    { __typename?: 'StudentTeacherResponse' }
    & { studentTeacher?: Maybe<(
      { __typename?: 'StudentTeacher' }
      & Pick<StudentTeacher, 'student' | 'teacher'>
    )> }
  ) }
);

export type GetCharacterQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetCharacterQuery = (
  { __typename?: 'Query' }
  & { getCharacter?: Maybe<(
    { __typename?: 'Character' }
    & Pick<Character, 'username' | 'characterId'>
  )> }
);

export type GetGameQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetGameQuery = (
  { __typename?: 'Query' }
  & { getGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'username' | 'startTime' | 'endTime' | 'score'>
  )> }
);

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetQuestionQuery = (
  { __typename?: 'Query' }
  & { getQuestion?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
  )> }
);

export type GetStudentTeacherQueryVariables = Exact<{
  teacher: Scalars['String'];
}>;


export type GetStudentTeacherQuery = (
  { __typename?: 'Query' }
  & { getStudentTeacher?: Maybe<(
    { __typename?: 'StudentTeacher' }
    & Pick<StudentTeacher, 'student' | 'teacher'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $userRole: String!) {
  login(options: {username: $username, password: $password, userRole: $userRole}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $password2: String!, $userRole: String!) {
  register(
    options: {email: $email, username: $username, password: $password, password2: $password2, userRole: $userRole}
  ) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateGameDocument = gql`
    mutation UpdateGame($username: String!, $startTime: String!, $endTime: String!, $score: String!) {
  updateGame(
    options: {username: $username, startTime: $startTime, endTime: $endTime, score: $score}
  ) {
    game {
      username
      startTime
      endTime
      score
    }
  }
}
    `;

export function useUpdateGameMutation() {
  return Urql.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument);
};
export const UpdateStudentTeacherDocument = gql`
    mutation UpdateStudentTeacher($student: String!, $teacher: String!) {
  updateStudentTeacher(options: {student: $student, teacher: $teacher}) {
    studentTeacher {
      student
      teacher
    }
  }
}
    `;

export function useUpdateStudentTeacherMutation() {
  return Urql.useMutation<UpdateStudentTeacherMutation, UpdateStudentTeacherMutationVariables>(UpdateStudentTeacherDocument);
};
export const GetCharacterDocument = gql`
    query GetCharacter($username: String!) {
  getCharacter(username: $username) {
    username
    characterId
  }
}
    `;

export function useGetCharacterQuery(options: Omit<Urql.UseQueryArgs<GetCharacterQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCharacterQuery>({ query: GetCharacterDocument, ...options });
};
export const GetGameDocument = gql`
    query GetGame($id: Float!) {
  getGame(id: $id) {
    username
    startTime
    endTime
    score
  }
}
    `;

export function useGetGameQuery(options: Omit<Urql.UseQueryArgs<GetGameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGameQuery>({ query: GetGameDocument, ...options });
};
export const GetQuestionDocument = gql`
    query GetQuestion($id: Float!) {
  getQuestion(id: $id) {
    questionTitle
    A
    B
    C
    D
    correctAnswer
  }
}
    `;

export function useGetQuestionQuery(options: Omit<Urql.UseQueryArgs<GetQuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetQuestionQuery>({ query: GetQuestionDocument, ...options });
};
export const GetStudentTeacherDocument = gql`
    query GetStudentTeacher($teacher: String!) {
  getStudentTeacher(teacher: $teacher) {
    student
    teacher
  }
}
    `;

export function useGetStudentTeacherQuery(options: Omit<Urql.UseQueryArgs<GetStudentTeacherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetStudentTeacherQuery>({ query: GetStudentTeacherDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};