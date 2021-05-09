var express = require('express');
var router = express.Router();
const moment = require('moment');
const today = moment();
const { Op } = require("sequelize");
const models = require('../../models');

//api Controller
router.get("/", (req, res) => {
    res.send("Hello World");
});

//todo select
router.get("/todo", (req, res) => {
    let ok = true;
   
    models.todo_list.findAll({
        where: {
            use_flag: {
                [Op.or]: {
                    [Op.ne]: 0,
                    [Op.eq]: null
                }
            }
        }
      })
      .then( result => {
        return res.json({
            ok
            , data: result
        });
      })
      .catch(function(err){
        console.log(err);
        ok = false;
        return res.json({
            ok
            , err
        });
      });
});

//todo create
router.post("/todo", (req, res) => {
    let body = req.body;
    let ok = true, msg = '';

    if(!body.name){
        msg = 'TODO 이름을 입력해주세요.';
        ok = false;
        return res.json({
            ok
            , msg
        });
    }
    
    models.todo_list.create({
        name: body.name
        , wrt_date: today.format('YYYY-MM-DD')
        , end_date: body.end_date
    })
    .then( result => {
        console.log(result);
        msg = "데이터 추가 완료";
        return res.json({
            ok
            , msg
        });
    })
    .catch( err => {
        ok = false;
        msg = "데이터 추가 실패";
        console.log(err)
        return res.json({
            ok
            , msg
        });
    });
});

//todo name edit
router.put("/todo/:id", (req, res) => {
    let params = req.params;
    let body = req.body;

    let ok = true, msg = '';
    
    if(!params.id){
        msg = 'todo를 받아오지 못했습니다.';
        ok = false;
        return res.json({
            ok
            , msg
        });
    }

    if(!body.name){
        msg = 'TODO 이름을 입력해주세요.';
        ok = false;
        return res.json({
            ok
            , msg
        });
    }

    models.todo_list.update({
        name: body.name
        , edit_date: today.format('YYYY-MM-DD')
    },{
        where: {id: params.id}
    })
      .then( result => {
        msg = "데이터 수정 완료";
        return res.json({
            ok
            , msg
        });
    })
      .catch( err => {
        ok = false;
        msg = "데이터 수정 실패";
        console.log(err)
        return res.json({
            ok
            , msg
        });
    });
    
});

//todo remove(update flag)
router.delete("/todo/:id", (req, res) => {
    let params = req.params;

    let ok = true, msg = '';
    
    if(!params.id){
        msg = 'todo를 받아오지 못했습니다.';
        ok = false;
        return res.json({
            ok
            , msg
        });
    }

    models.todo_list.update({
        use_flag: 0
    },{
        where: {id: params.id}
    })
      .then( result => {
        msg = "데이터 삭제 완료";
        return res.json({
            ok
            , msg
        });
    })
      .catch( err => {
        ok = false;
        msg = "데이터 삭제 실패";
        console.log(err)
        return res.json({
            ok
            , msg
        });
    });
    
});

//todo name edit
router.put("/todo/end/:id", (req, res) => {
    let params = req.params;
    let body = req.body;

    let ok = true, msg = '';
    
    if(!params.id){
        msg = 'todo를 받아오지 못했습니다.';
        ok = false;
        return res.json({
            ok
            , msg
        });
    }

    models.todo_list.update({
        end_flag: body.end_flag
        , edit_date: today.format('YYYY-MM-DD')
    },{
        where: {id: params.id}
    })
      .then( result => {
        msg = "데이터 수정 완료";
        return res.json({
            ok
            , msg
        });
    })
      .catch( err => {
        ok = false;
        msg = "데이터 수정 실패";
        console.log(err)
        return res.json({
            ok
            , msg
        });
    });
    
});

module.exports = router;
