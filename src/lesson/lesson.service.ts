import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./create-lesson.input";

@Injectable()
export class LessonService {
	constructor(
		@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
	) {}

	async getLesson(id: string): Promise<Lesson> {
		return this.lessonRepository.findOneBy({ id });
	}

	async getLessons(): Promise<Lesson[]> {
		return this.lessonRepository.find();
	}

	async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
		const lesson = this.lessonRepository.create({
			...createLessonInput,
			id: randomUUID(),
		});

		return this.lessonRepository.save(lesson);
	}

	async assignStudentsToLesson(
		lessonId: string,
		studentIds: string[],
	): Promise<Lesson> {
		const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

		lesson.students = [...lesson.students, ...studentIds];

		return this.lessonRepository.save(lesson);
	}
}
