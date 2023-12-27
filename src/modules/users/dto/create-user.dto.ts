import { userRole } from "@prisma/client"

export class CreateUserDto {
    userName:string
    password:string
    avatar:string
    email:string
    role:userRole
    createdAt:string
    updatedAt:string
}
