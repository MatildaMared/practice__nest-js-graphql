import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { Lesson } from "./lesson.entity";

@Injectable()
export class LessonService {
	constructor(
		@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
	) {}

	async createLesson(name, startDate, endDate): Promise<Lesson> {
		const lesson = this.lessonRepository.create({
			name,
			startDate,
			endDate,
			id: randomUUID(),
		});

		return this.lessonRepository.save(lesson);
	}
}
