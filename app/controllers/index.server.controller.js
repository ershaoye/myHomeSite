exports.render = function (req, res) {

    if(req.session.lastVisit){
        //如果session中有lastVisit就在log中输出
        console.log(req.session.lastVisit);
    }

    //更新session中lastVisit的值
    req.session.lastVisit = new Date();

    //用title渲染index模版
    res.render('index',{title:'Hello World~!'});
};
