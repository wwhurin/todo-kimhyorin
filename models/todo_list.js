module.exports = function(sequelize, DataTypes){
    let todo_list = sequelize.define("todo_list", {
        userID: {
            filed: "id"
            , type: DataTypes.INTEGER
            , primaryKey: true
            , unique: true
            , autoIncrement: true
            , allowNull: false
        }
        , wrt_date: {
            field: "wrt_date"
            , type: DataTypes.TEXT
        }
        , edit_date: {
            field: "edit_date"
            , type: DataTypes.TEXT
        }
        , end_date: {
            field: "end_date"
            , type: DataTypes.TEXT
        }
        , use_flag: {
            field: "use_flag"
            , type: DataTypes.INTEGER
        }
        , end_flag: {
            field: "end_flag"
            , type: DataTypes.INTEGER
        }
        , tag_todo: {
            field: "tag_todo"
            , type: DataTypes.TEXT
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "todo_list"
    });
    return todo_list;
}