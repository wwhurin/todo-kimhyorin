const btnHandler = () => {
    //input으로 바꿀 경우 true, 다시 text일 경우 false
    let editType = true;

    const btnAdd = $('.todo-add');
    const btnEdit = $('.todo-edit');
    const btnSave = $('.edit-save');
    const btnDel = $('.todo-del');

    btnAdd.click(function() {
        //TODO: add api 호출

        //다시 그리기
    });

    btnEdit.click(function() {
        if(editType){
            const nameHtml = btnEdit.closest('.todo-item').find('.todo-name');
            const name = nameHtml.text().trim();
            console.log(name)
            nameHtml.html(`
            <input type='text' class="form-control" value='${name}'></input>
            <button class="btn btn-outline-primary edit-save">저장하기</button>
            `);

            editType = false;
        } else {
            const nameHtml = btnEdit.closest('.todo-item').find('.todo-name');
            const nameValHtml = btnEdit.closest('.todo-item').find('.todo-name input');
            const name = nameValHtml.val();
            console.log(name)
            nameHtml.html(`${name}`);

            editType = true;
        } 
    });

    btnSave.click(function() {
        //TODO: 수정 api 호출

        //다시 그리기

        //저장 시 수정여부 초기화
        editType = true;
    });

    btnDel.click(function(){
        //TODO: 삭제 api 호출

        //다시 그리기
    });
};

//TODO: 갱신 시 다시 list 받아와 그리는 함수
const reDraw = () => {

};

$( document ).ready(function() {
    $('#datetimepicker').datetimepicker({ format: 'L' });  

    btnHandler();
});