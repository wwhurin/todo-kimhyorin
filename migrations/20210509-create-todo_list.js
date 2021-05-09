'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("todo_list", {
        userID: {
            filed: "id"
            , type: Sequelize.INTEGER
            , primaryKey: true
            , unique: true
            , autoIncrement: true
            , allowNull: false
        }
        , wrt_date: {
            field: "wrt_date"
            , type: Sequelize.TEXT
        }
        , edit_date: {
            field: "edit_date"
            , type: Sequelize.TEXT
        }
        , end_date: {
            field: "end_date"
            , type: Sequelize.TEXT
        }
        , use_flag: {
            field: "use_flag"
            , type: Sequelize.INTEGER
        }
        , end_flag: {
            field: "end_flag"
            , type: Sequelize.INTEGER
        }
        , tag_todo: {
            field: "tag_todo"
            , type: Sequelize.TEXT
        }
    })
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todo_list');
  }
};