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

	async getStudent(id: string): Promise<Student> {
		return this.studentRepository.findOneBy({ id });
	}

	async getStudents(): Promise<Student[]> {
		return this.studentRepository.find();
	}

	async createStudent(createStudentInput: CreateStudentInput) {
		const student = this.studentRepository.create({
			...createStudentInput,
			id: randomUUID(),
		});

		return this.studentRepository.save(student);
	}

	async getManyStudents(studentIds: string[]): Promise<Student[]> {
		return this.studentRepository.find({
			where: {
				id: {
					$in: studentIds,
				} as any,
			},
		});
	}
}
