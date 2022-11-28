import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { CreateStudentInput } from "./create-student.input";
import { Student } from "./student.entity";

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private studentRepository: Repository<Student>,
	) {}

	async createStudent(createStudentInput: CreateStudentInput) {
		const student = this.studentRepository.create({
			...createStudentInput,
			id: randomUUID(),
		});

		return this.studentRepository.save(student);
	}
}
