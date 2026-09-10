const sanitize = require('sanitize-html')
const sanitize_html = (req,res,next)=>{
    const values = Object.entries(req.body).map((item)=>[item[0],sanitize(item[1])])
    req.body = Object.fromEntries(values)
    next()
}
module.exports = sanitize_html
