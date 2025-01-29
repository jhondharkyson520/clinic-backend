import prismaClient from "../../prisma";
import {hash} from "bcryptjs";

interface UpdateUserPasswordRequest {
    userId: string;
    newPassword: string;
}

class UpdateUserPasswordService {
    async execute({ userId, newPassword }: UpdateUserPasswordRequest) {
        const passwordHash = await hash(newPassword, 8);
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                password: passwordHash
            }
        });
    }
}

export {UpdateUserPasswordService};
