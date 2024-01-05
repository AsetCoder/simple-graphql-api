import prisma from '../../db/prisma.js'


const postResolvers = {
    Query: {
        posts: async () => {
            return await prisma.post.findMany()
        },

        post: async (_, args) => {
            const { id } = args
            return await prisma.post.findUnique({
                where: { id }
            })
        }
    },

    Mutation: {
        createPost: async (_, args) => {
            const { title, content, authorId } = args
            return await prisma.post.create({
                data: {
                    title, content, authorId
                }
            })
        },
        updatePost: async (_, args) => {
            const { id, title, content } = args
            return await prisma.post.update({
                where: { id },
                data: { title, content }
            })
        },
        deletePost: async (_, args) => {
            const { id } = args
            return await prisma.post.delete({
                where: {
                    id
                }
            })
        }
    },

    Post: {
        author: async (post) => {
            return await prisma.user.findUnique({
                where: { id: post.authorId }
            })
        },
        comments: async (post) => {
            return await prisma.comment.findMany({
                where: { postId: post.id }
            })
        }
    }
}

export default postResolvers
