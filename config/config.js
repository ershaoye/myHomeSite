//根据系统环境加载不同的配置
module.exports = require('./env/' + process.env.NODE_ENV + '.js');