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
  getAllQuestion?: Maybe<Array<Question>>;
  getGame?: Maybe<Game>;
  getAllGame?: Maybe<Array<Game>>;
  getAllGameByUsername?: Maybe<Array<Game>>;
  getStudentTeacher?: Maybe<StudentTeacher>;
  getAllStudentTeacher?: Maybe<Array<StudentTeacher>>;
  getCharacter?: Maybe<Character>;
  getLevel?: Maybe<Level>;
  getAllLevel?: Maybe<Array<Level>>;
};


export type QueryGetUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['Float'];
};


export type QueryGetAllQuestionArgs = {
  difficulty: Scalars['Float'];
  type: Scalars['String'];
};


export type QueryGetGameArgs = {
  gameId: Scalars['Float'];
  username: Scalars['String'];
};


export type QueryGetAllGameByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetStudentTeacherArgs = {
  teacher: Scalars['String'];
};


export type QueryGetAllStudentTeacherArgs = {
  teacher: Scalars['String'];
};


export type QueryGetCharacterArgs = {
  username: Scalars['String'];
};


export type QueryGetAllLevelArgs = {
  createdBy: Scalars['String'];
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
  difficulty: Scalars['Float'];
  type: Scalars['String'];
  questionTitle: Scalars['String'];
  A: Scalars['String'];
  B: Scalars['String'];
  C: Scalars['String'];
  D: Scalars['String'];
  correctAnswer: Scalars['String'];
  levels?: Maybe<Array<Level>>;
};

export type Level = {
  __typename?: 'Level';
  id: Scalars['Float'];
  level: Scalars['Float'];
  dateCreated: Scalars['String'];
  createdBy: Scalars['String'];
  questions?: Maybe<Array<Question>>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Float'];
  gameId: Scalars['Float'];
  username: Scalars['String'];
  type: Scalars['String'];
  difficulty: Scalars['Float'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  score: Scalars['Float'];
  totalCorrect: Scalars['Float'];
  totalQuestion: Scalars['Float'];
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
  characterId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  sublogin: UserResponse;
  logout: Scalars['Boolean'];
  updateStartGame: GameResponse;
  updateEndGame: GameResponse;
  updateStudentTeacher: StudentTeacherResponse;
  updateCharacter: Character;
  createLevel: Level;
  updateLevel: Level;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationSubloginArgs = {
  options: LoginInput;
};


export type MutationUpdateStartGameArgs = {
  options: StartGameInput;
};


export type MutationUpdateEndGameArgs = {
  options: EndGameInput;
};


export type MutationUpdateStudentTeacherArgs = {
  options: StudentTeacherInput;
};


export type MutationUpdateCharacterArgs = {
  options: CharacterInput;
};


export type MutationCreateLevelArgs = {
  options: LevelInput;
};


export type MutationUpdateLevelArgs = {
  options: UpdateInput;
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
  userType: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  userType: Scalars['String'];
};

export type GameResponse = {
  __typename?: 'GameResponse';
  game?: Maybe<Game>;
};

export type StartGameInput = {
  gameId: Scalars['Float'];
  username: Scalars['String'];
  type: Scalars['String'];
  difficulty: Scalars['Float'];
};

export type EndGameInput = {
  gameId: Scalars['Float'];
  username: Scalars['String'];
  score: Scalars['Float'];
  totalQuestion: Scalars['Float'];
};

export type StudentTeacherResponse = {
  __typename?: 'StudentTeacherResponse';
  studentTeacher?: Maybe<StudentTeacher>;
};

export type StudentTeacherInput = {
  student: Scalars['String'];
  teacher: Scalars['String'];
};

export type CharacterInput = {
  username: Scalars['String'];
  characterId: Scalars['Float'];
};

export type LevelInput = {
  level: Scalars['Float'];
  createdBy: Scalars['String'];
};

export type UpdateInput = {
  level: Scalars['Float'];
  createdBy: Scalars['String'];
  levelId: Scalars['Float'];
  questionId: Scalars['Float'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type CreateLevelMutationVariables = Exact<{
  level: Scalars['Float'];
  createdBy: Scalars['String'];
}>;


export type CreateLevelMutation = (
  { __typename?: 'Mutation' }
  & { createLevel: (
    { __typename?: 'Level' }
    & Pick<Level, 'id' | 'level' | 'createdBy'>
    & { questions?: Maybe<Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'type' | 'difficulty' | 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  userType: Scalars['String'];
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
  userType: Scalars['String'];
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

export type SubloginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  userType: Scalars['String'];
}>;


export type SubloginMutation = (
  { __typename?: 'Mutation' }
  & { sublogin: (
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

export type UpdateCharacterMutationVariables = Exact<{
  username: Scalars['String'];
  characterId: Scalars['Float'];
}>;


export type UpdateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter: (
    { __typename?: 'Character' }
    & Pick<Character, 'username' | 'characterId'>
  ) }
);

export type UpdateEndGameMutationVariables = Exact<{
  gameId: Scalars['Float'];
  username: Scalars['String'];
  score: Scalars['Float'];
  totalQuestion: Scalars['Float'];
}>;


export type UpdateEndGameMutation = (
  { __typename?: 'Mutation' }
  & { updateEndGame: (
    { __typename?: 'GameResponse' }
    & { game?: Maybe<(
      { __typename?: 'Game' }
      & Pick<Game, 'gameId' | 'username'>
    )> }
  ) }
);

export type UpdateLevelMutationVariables = Exact<{
  level: Scalars['Float'];
  createdBy: Scalars['String'];
  levelId: Scalars['Float'];
  questionId: Scalars['Float'];
}>;


export type UpdateLevelMutation = (
  { __typename?: 'Mutation' }
  & { updateLevel: (
    { __typename?: 'Level' }
    & Pick<Level, 'id' | 'level' | 'createdBy'>
    & { questions?: Maybe<Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'type' | 'difficulty' | 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
    )>> }
  ) }
);

export type UpdateStartGameMutationVariables = Exact<{
  gameId: Scalars['Float'];
  username: Scalars['String'];
  type: Scalars['String'];
  difficulty: Scalars['Float'];
}>;


export type UpdateStartGameMutation = (
  { __typename?: 'Mutation' }
  & { updateStartGame: (
    { __typename?: 'GameResponse' }
    & { game?: Maybe<(
      { __typename?: 'Game' }
      & Pick<Game, 'gameId' | 'username'>
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

export type GetAllGameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGameQuery = (
  { __typename?: 'Query' }
  & { getAllGame?: Maybe<Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId' | 'username' | 'type' | 'difficulty' | 'startTime' | 'endTime' | 'score' | 'totalCorrect' | 'totalQuestion'>
  )>> }
);

export type GetAllGameByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetAllGameByUsernameQuery = (
  { __typename?: 'Query' }
  & { getAllGameByUsername?: Maybe<Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId' | 'username' | 'type' | 'difficulty' | 'startTime' | 'endTime' | 'score' | 'totalCorrect' | 'totalQuestion'>
  )>> }
);

export type GetAllLevelQueryVariables = Exact<{
  createdBy: Scalars['String'];
}>;


export type GetAllLevelQuery = (
  { __typename?: 'Query' }
  & { getAllLevel?: Maybe<Array<(
    { __typename?: 'Level' }
    & Pick<Level, 'id' | 'level' | 'createdBy'>
    & { questions?: Maybe<Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'difficulty' | 'type' | 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
    )>> }
  )>> }
);

export type GetAllQuestionQueryVariables = Exact<{
  type: Scalars['String'];
  difficulty: Scalars['Float'];
}>;


export type GetAllQuestionQuery = (
  { __typename?: 'Query' }
  & { getAllQuestion?: Maybe<Array<(
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'difficulty' | 'type' | 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
  )>> }
);

export type GetAllStudentTeacherQueryVariables = Exact<{
  teacher: Scalars['String'];
}>;


export type GetAllStudentTeacherQuery = (
  { __typename?: 'Query' }
  & { getAllStudentTeacher?: Maybe<Array<(
    { __typename?: 'StudentTeacher' }
    & Pick<StudentTeacher, 'student'>
  )>> }
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
  username: Scalars['String'];
  gameId: Scalars['Float'];
}>;


export type GetGameQuery = (
  { __typename?: 'Query' }
  & { getGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'gameId' | 'username' | 'type' | 'difficulty' | 'startTime' | 'endTime' | 'score' | 'totalCorrect' | 'totalQuestion'>
  )> }
);

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetQuestionQuery = (
  { __typename?: 'Query' }
  & { getQuestion?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'difficulty' | 'type' | 'questionTitle' | 'A' | 'B' | 'C' | 'D' | 'correctAnswer'>
    & { levels?: Maybe<Array<(
      { __typename?: 'Level' }
      & { questions?: Maybe<Array<(
        { __typename?: 'Question' }
        & Pick<Question, 'id'>
      )>> }
    )>> }
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
export const CreateLevelDocument = gql`
    mutation CreateLevel($level: Float!, $createdBy: String!) {
  createLevel(options: {level: $level, createdBy: $createdBy}) {
    id
    level
    createdBy
    questions {
      id
      type
      difficulty
      questionTitle
      A
      B
      C
      D
      correctAnswer
    }
  }
}
    `;

export function useCreateLevelMutation() {
  return Urql.useMutation<CreateLevelMutation, CreateLevelMutationVariables>(CreateLevelDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $userType: String!) {
  login(options: {username: $username, password: $password, userType: $userType}) {
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
    mutation Register($email: String!, $username: String!, $password: String!, $password2: String!, $userType: String!) {
  register(
    options: {email: $email, username: $username, password: $password, password2: $password2, userType: $userType}
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
export const SubloginDocument = gql`
    mutation Sublogin($username: String!, $password: String!, $userType: String!) {
  sublogin(
    options: {username: $username, password: $password, userType: $userType}
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

export function useSubloginMutation() {
  return Urql.useMutation<SubloginMutation, SubloginMutationVariables>(SubloginDocument);
};
export const UpdateCharacterDocument = gql`
    mutation UpdateCharacter($username: String!, $characterId: Float!) {
  updateCharacter(options: {username: $username, characterId: $characterId}) {
    username
    characterId
  }
}
    `;

export function useUpdateCharacterMutation() {
  return Urql.useMutation<UpdateCharacterMutation, UpdateCharacterMutationVariables>(UpdateCharacterDocument);
};
export const UpdateEndGameDocument = gql`
    mutation UpdateEndGame($gameId: Float!, $username: String!, $score: Float!, $totalQuestion: Float!) {
  updateEndGame(
    options: {gameId: $gameId, username: $username, score: $score, totalQuestion: $totalQuestion}
  ) {
    game {
      gameId
      username
    }
  }
}
    `;

export function useUpdateEndGameMutation() {
  return Urql.useMutation<UpdateEndGameMutation, UpdateEndGameMutationVariables>(UpdateEndGameDocument);
};
export const UpdateLevelDocument = gql`
    mutation UpdateLevel($level: Float!, $createdBy: String!, $levelId: Float!, $questionId: Float!) {
  updateLevel(
    options: {level: $level, createdBy: $createdBy, levelId: $levelId, questionId: $questionId}
  ) {
    id
    level
    createdBy
    questions {
      id
      type
      difficulty
      questionTitle
      A
      B
      C
      D
      correctAnswer
    }
  }
}
    `;

export function useUpdateLevelMutation() {
  return Urql.useMutation<UpdateLevelMutation, UpdateLevelMutationVariables>(UpdateLevelDocument);
};
export const UpdateStartGameDocument = gql`
    mutation UpdateStartGame($gameId: Float!, $username: String!, $type: String!, $difficulty: Float!) {
  updateStartGame(
    options: {gameId: $gameId, username: $username, type: $type, difficulty: $difficulty}
  ) {
    game {
      gameId
      username
    }
  }
}
    `;

export function useUpdateStartGameMutation() {
  return Urql.useMutation<UpdateStartGameMutation, UpdateStartGameMutationVariables>(UpdateStartGameDocument);
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
export const GetAllGameDocument = gql`
    query GetAllGame {
  getAllGame {
    gameId
    username
    type
    difficulty
    startTime
    endTime
    score
    totalCorrect
    totalQuestion
  }
}
    `;

export function useGetAllGameQuery(options: Omit<Urql.UseQueryArgs<GetAllGameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllGameQuery>({ query: GetAllGameDocument, ...options });
};
export const GetAllGameByUsernameDocument = gql`
    query GetAllGameByUsername($username: String!) {
  getAllGameByUsername(username: $username) {
    gameId
    username
    type
    difficulty
    startTime
    endTime
    score
    totalCorrect
    totalQuestion
  }
}
    `;

export function useGetAllGameByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetAllGameByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllGameByUsernameQuery>({ query: GetAllGameByUsernameDocument, ...options });
};
export const GetAllLevelDocument = gql`
    query GetAllLevel($createdBy: String!) {
  getAllLevel(createdBy: $createdBy) {
    id
    level
    createdBy
    questions {
      id
      difficulty
      type
      questionTitle
      A
      B
      C
      D
      correctAnswer
    }
  }
}
    `;

export function useGetAllLevelQuery(options: Omit<Urql.UseQueryArgs<GetAllLevelQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllLevelQuery>({ query: GetAllLevelDocument, ...options });
};
export const GetAllQuestionDocument = gql`
    query GetAllQuestion($type: String!, $difficulty: Float!) {
  getAllQuestion(type: $type, difficulty: $difficulty) {
    id
    difficulty
    type
    questionTitle
    A
    B
    C
    D
    correctAnswer
  }
}
    `;

export function useGetAllQuestionQuery(options: Omit<Urql.UseQueryArgs<GetAllQuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllQuestionQuery>({ query: GetAllQuestionDocument, ...options });
};
export const GetAllStudentTeacherDocument = gql`
    query GetAllStudentTeacher($teacher: String!) {
  getAllStudentTeacher(teacher: $teacher) {
    student
  }
}
    `;

export function useGetAllStudentTeacherQuery(options: Omit<Urql.UseQueryArgs<GetAllStudentTeacherQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllStudentTeacherQuery>({ query: GetAllStudentTeacherDocument, ...options });
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
    query GetGame($username: String!, $gameId: Float!) {
  getGame(username: $username, gameId: $gameId) {
    gameId
    username
    type
    difficulty
    startTime
    endTime
    score
    totalCorrect
    totalQuestion
  }
}
    `;

export function useGetGameQuery(options: Omit<Urql.UseQueryArgs<GetGameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGameQuery>({ query: GetGameDocument, ...options });
};
export const GetQuestionDocument = gql`
    query GetQuestion($id: Float!) {
  getQuestion(id: $id) {
    id
    difficulty
    type
    questionTitle
    A
    B
    C
    D
    correctAnswer
    levels {
      questions {
        id
      }
    }
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