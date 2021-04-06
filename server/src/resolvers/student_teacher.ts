import { StudentTeacher } from "../entities/StudentTeacher";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { EntityManager } from "@mikro-orm/postgresql";


@InputType()
class StudentTeacherInput {
    @Field()
    student: string;
    @Field()
    teacher: string;
    
}

@ObjectType()
class StudentTeacherResponse {
    @Field(() => StudentTeacher, { nullable: true })
    studentTeacher?: StudentTeacher
}

@Resolver()
export class StudentTeacherResolver {

    @Query(() => StudentTeacher, { nullable: true })
    getStudentTeacher(
        @Arg( 'teacher' ) teacher: string,
        @Ctx() { em }: MyContext
    ): Promise<StudentTeacher | null>{
        return em.findOne(StudentTeacher, { teacher });
    }

    @Mutation(() => StudentTeacherResponse)
    async updateStudentTeacher(
        @Arg('options') options: StudentTeacherInput,
        @Ctx() { em }: MyContext
    ): Promise<StudentTeacherResponse> {
        let studentTeacher;
            const result = await (em as EntityManager)
            .createQueryBuilder(StudentTeacher)
            .getKnexQuery()
            .insert({
                student: options.student,
                teacher: options.teacher,
            }).returning("*");
            studentTeacher = result[0];

        return {studentTeacher}
    }

    
}