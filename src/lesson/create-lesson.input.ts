import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength, IsDateString, IsUUID } from "class-validator";

@InputType()
export class CreateLessonInput {
	@MinLength(1)
	@Field()
	name: string;

	@IsDateString()
	@Field()
	startDate: string;

	@IsDateString()
	@Field()
	endDate: string;

	@IsUUID("all", { each: true })
	@Field((type) => [ID], { defaultValue: [] })
	students: string[];
}
