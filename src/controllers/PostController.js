import {httpCodes} from "../configs/config"
import db from "../models"
import {uploadMultipleImages} from "../utils/uploadMedia";
const { Op } = require("sequelize");

export const createPost = async (req, res) => {
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
}

export const getAllApprovalPost = async (req, res) => {
  try {
    const allPost = await db.Post.findAll({where: {
        status: {
          [Op.ne]: 0,
        }
      },
      include: [
        {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
      ],
      order: [['createdAt', 'DESC']],
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
}

export const getAllPost = async (req, res) => {
  try {
    const allPost = await db.Post.findAll({
      include: [
        {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
      ],
      order: [['createdAt', 'DESC']],
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
}

export const getPostById = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: {id: req.params.id},
      include: [
        {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
      ],
      raw: true,
      nest: true
    });
    if(post) {
      const postData = {...post, images: JSON.parse(post.images.split(','))}
      return res.status(httpCodes.SUCCESS).json(postData)
    }
  } catch (e) {
    console.log('e', e)
  }
}

export const updatePost = async (req, res) => {
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
}

export const getPostByProvinceasync = async (req, res) => {
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
}

export const getPostByUser = async (req, res) => {
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
}

export const filterPost = async (req, res) => {
  
  let {body} = req
  // body.status =   {
  //   [Op.ne]: 0,
  // }
  if(body.type) {
    body.type = {...{[Op.in]: body.type}}
  }
  
  if(body.price) {
    body.price = {...{ [Op.between]: [body.price.min, body.price.max]}}
  }
  if(body.area) {
    body.area = {...{ [Op.between]: [body.area.min, body.area.max]}}
  }
  
  const {isSort} = body
  let allPost = null
  if (isSort) {
    delete body.isSort
    switch (isSort) {
      case  1: {
        allPost = await db.Post.findAll({
          where: {...body},
          include: [
            {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
          ],
          order: [['createdAt', 'DESC']],
          raw: true,
          nest: true
        })
        break
      }
      default: {
          allPost = await db.Post.findAll({
            where: {...body},
            include: [
              {model: db.Account, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber']}
            ],
            order: [
              ['price', isSort === 2 ? 'ASC': 'DESC'],
            ],
            raw: true,
            nest: true
          })
        }
      }
  }
  
  else {
    allPost = await db.Post.findAll({
      where: {...body},
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
}

export const sortPost =  async (req, res) => {
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
}

export const approvePost = async (req, res) => {
  try {
    const accountData = await db.Account.findOne({where: {id: req.user.id}})
    if (accountData.role === 2) {
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

