import { prisma } from "../utils/prisma";

export class StudentRepository {

  static async findMany(where?:any){
    return await prisma.student.findMany({
      where,
      orderBy:{
        name:'asc'
      }
    })
  }

  static async findByRa(ra:string) {
    return await prisma.student.findUnique({
      where: {ra}
    })
  }

  static async create(data:any) {
    return await prisma.student.create({ data })
  }

  static async update(ra:string, data:any){
    return await prisma.student.update({
      where: {ra},
      data,
    })
  }

  static async delete(ra:string){
    return await prisma.student.delete({
      where: {ra}
    })
  }
}