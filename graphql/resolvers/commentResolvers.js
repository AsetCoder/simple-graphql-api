import prisma from '../../db/prisma.js'


const commentResolvers = {
    Mutation: {
        createComment: async (_, args) => {
            const { text, userId, postId } = args
            if (!postId) {
                throw new Error('postId is required for creating a comment');
            }
            return await prisma.comment.create({
                data: {
                    text, userId, postId
                }
            })
        },
        updateComment: async (_, args) => {
            const { id, text } = args
            return await prisma.comment.update({
                where: { id },
                data: { text }
            })
        },
        deleteComment: async (_, args) => {
            const { id } = args
            return await prisma.comment.delete({
                where: {
                    id
                }
            })
        }
    },
}

export default commentResolvers