import {httpCodes} from "../configs/config"
import db from "../models"
import {uploadMultipleImages} from "../utils/uploadMedia";
const { Op } = require("sequelize");
const postController = {
    async createPost(req, res) {
        const {body} = req
        try {
            const urlImages = await uploadMultipleImages(body.images)
            try {
                const {dataValues: post} = await db.Post.create({
                    ...body,
                    images: JSON.stringify(urlImages),
                    userId: req.user.id
                })
                return res.status(httpCodes.CREATED).json({post: post})
            } catch (e) {
                console.log('e', e)
            }
        } catch (e) {
            return res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    },

    async getAllPost(req, res) {
        try {
            const allPost = await db.Post.findAll({
                include: [
                    {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                ],
                raw: true,
                nest: true
            })
            if (allPost) {
                const postData = allPost.map((post) => {
                    return {
                        ...post,
                        images: JSON.parse(post.images.split(',')),
                    }
                })
                return res.status(httpCodes.SUCCESS).json(postData)
            }
        } catch (e) {
            console.log('e', e)
            return res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    },

    async getPostById(req, res) {
        try {
            const post = await db.Post.findOne({
                where: {id: req.params.id},
                include: [
                    {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                ],
                raw: true,
                nest: true
            });
            const postData = {...post, images: JSON.parse(post.images.split(','))}
            return res.status(httpCodes.SUCCESS).json(postData)
        } catch (e) {
            console.log('e', e)
        }
    },

    async updatePost(req, res) {
        try {
            const post = await db.Post.update({...req.body}, {
                where: {
                    id: req.params.id
                }
            })
            return res.status(httpCodes.SUCCESS).json({ok: true})
        } catch (e) {
            console.log('e', e)
        }
    },

    async getPostByProvince(req, res) {
        try {
            const posts = await db.Post.findAll({
                where: {province: req.query.province},
                include: [
                    {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                ],
                raw: true,
                nest: true
            })
            const postsData = posts.map((post) => {
                return {
                    ...post,
                    images: JSON.parse(post.images.split(',')),
                }
            })
            return res.status(httpCodes.SUCCESS).json(postsData)
        } catch (e) {
            console.log('e', e)
        }
    },

    async getPostByUser(req, res) {
        try {
            const posts = await db.Post.findAll({
                where: {userId: req.query.userId},
                include: [
                    {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                ],
                raw: true,
                nest: true
            })
            const postsData = posts.map((post) => {
                return {
                    ...post,
                    images: JSON.parse(post.images.split(',')),
                }
            })
            return res.status(httpCodes.SUCCESS).json(postsData)
        } catch (e) {
            console.log('e', e)
        }
    },

    async filterPost(req, res) {
        let {body} = req
        let type = []
        let price = []
        if(body.type) {
            type = {
                [Op.in]: body.type
            }
            body.type = {...type}
        }

        if(body.price) {
            price = {
                [Op.between]: [body.price.min, body.price.max]
            }
            body.price = {...price}
        }
        if(body.area) {
            body.area = {...{ [Op.between]: [body.area.min, body.area.max]}}
        }

        let allPost = null
        if (body.isSort) {
            console.log('body.isSort',body.isSort)
            switch (body.isSort) {
                case  1: {
                    delete body.isSort
                    allPost = await db.Post.findAll({
                        where: {...body},
                        include: [
                            {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                        ],

                        raw: true,
                        nest: true
                    })
                    break
                }
                case 2: {
                    delete body.isSort

                    allPost = await db.Post.findAll({
                        where: {...body},
                        include: [
                            {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                        ],
                        order: [
                            ['price', 'ASC'],
                        ],
                        raw: true,
                        nest: true
                    })
                    break
                }
                case 3: {
                    delete body.isSort

                    allPost = await db.Post.findAll({
                        where: {...body},
                        include: [
                            {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                        ],
                        order: [
                            ['price', 'DESC'],
                        ],
                        raw: true,
                        nest: true
                    })
                }
            }
        }

        else {
            allPost = await db.Post.findAll({
                where: {...body
                },
                include: [
                    {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                ],

                raw: true,
                nest: true
            })
        }
        if (allPost) {
            const postData = allPost.map((post) => {
                return {
                    ...post,
                    images: JSON.parse(post.images.split(',')),
                }
            })
            return res.status(httpCodes.SUCCESS).json(postData)
        }
    },

    async sortPost(req, res) {
        const {sortCriterion} = req.query
        switch (sortCriterion) {
            case '2':
                const allPostASC = await db.Post.findAll({
                    include: [
                        {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                    ],
                    order: [
                        ['price', 'ASC'],
                    ],
                    raw: true,
                    nest: true
                })
                if (allPostASC) {
                    const postData = allPostASC.map((post) => {
                        return {
                            ...post,
                            images: JSON.parse(post.images.split(',')),
                        }
                    })
                    return res.status(httpCodes.SUCCESS).json(postData)
                }
                break;
            case '3':
                const allPost = await db.Post.findAll({
                    include: [
                        {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
                    ],
                    order: [
                        ['price', 'DESC'],
                    ],
                    raw: true,
                    nest: true
                })
                if (allPost) {
                    const postData = allPost.map((post) => {
                        return {
                            ...post,
                            images: JSON.parse(post.images.split(',')),
                        }
                    })
                    return res.status(httpCodes.SUCCESS).json(postData)
                }
        }
    },

    async approvePost(req, res) {
        try {
            const accountData = await db.Account.findOne({where: {id: req.user.userId}})
            if (accountData.role === 1 || accountData.role === 2) {
                try {
                    const post = await db.Post.update({
                            status: 1
                        }, {where: {id: req.params.id}}
                    )
                    return res.status(httpCodes.SUCCESS).json({oke: true})
                } catch (e) {
                    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
                }
            }
            return res.sendStatus(httpCodes.INVALID_ACCESS_TOKEN)
        } catch (e) {
            return res.sendStatus(httpCodes.UNKNOWN_ERROR)
        }
    }
}

module.exports = postController