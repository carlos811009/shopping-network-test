const { User, Like } = require('../models')
const userService = {
  register: async (req, res, callback) => {
    try {
      const { name, account, password, checkPassword } = req.body
      const user = await Users.findOne({
        where: { account: account }
      })
      if (user) {
        return callback({ status: "error", message: "此帳號已被註冊" })
      }
      if (!name.trim() || !account.trim() || !password.trim() || !checkPassword.trim()) {
        return callback({ status: "error", message: "所有欄位都需要填寫" })
      }
      if (password.trim() !== checkPassword.trim()) {
        return callback({ status: "error", message: "請確認密碼一致" })
      }
      const create = await Users.create({
        name,
        account,
        password
      })
      if (create) {
        return callback({ status: "seccess", message: "註冊成功，請登入使用" })
      }
    } catch (err) {
      console.log(err)
    }

  },
  likeProducts: async (req, res, callback) => {
    try {
      const like = await Like.create({
        UserId: req.user.id,
        ProductId: Number(req.params.id)
      })
      if (like) { return callback({ status: 'success', message: '新增喜歡成功' }) }
      callback({ status: 'error', message: '新增失敗' })
    } catch (err) {
      console.log(err)
    }
  },
  removeLike: async (req, res, callback) => {
    try {

    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userService