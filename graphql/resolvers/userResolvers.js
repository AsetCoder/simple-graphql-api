import prisma from '../../db/prisma.js'


const userResolvers = {
    Query: {
        users: async () => {
            return await prisma.user.findMany()
        },

        user: async (_, args) => {
            const { id } = args
            return await prisma.user.findUnique({
                where: { id }
            })
        }
    },

    Mutation: {
        createUser: async (_, args) => {
            const { email, name } = args
            return await prisma.user.create({
                data: {
                    email, name
                }
            })
        },
        updateUser: async (_, args) => {
            const { id, name } = args
            return await prisma.user.update({
                where: { id },
                data: { name }
            })
        },
        deleteUser: async (_, args) => {
            const { id } = args
            return await prisma.user.delete({
                where: {
                    id
                }
            })
        }
    },

    User: {

        comments: async (user) => {
            return await prisma.comment.findMany({
                where: { userId: user.id }
            })
        },
        posts: async (user) => {
            return await prisma.post.findMany({
                where: { authorId: user.id }
            })
        }
    }
}

export default userResolvers
