const btnHandler = () => {
    //input으로 바꿀 경우 true, 다시 text일 경우 false
    let editType = true;

    const btnAdd = $('.todo-add');

    //등록 이벤트 ========================================================
    btnAdd.click(function() {
        const name = $('.todo-new').val();

        if(!name){
            alert("TODO 이름을 입력해주세요.");
            return;
        }

        //add api 호출
        const link = "/api/todo";
        $.ajax({
            url: link,
            dataType: 'json',
            type: 'POST',
            data: {
                name: name
                , wrt_date: '2021-05-09'
                , end_date: '2021-05-09'
            },
            success: function(result) {
                console.log(result);
                if(!result.ok){
                    alert(result.msg);
                    return;
                }
                //다시 그리기
            }
            , fail: function(err){
                console.log(err);
            }
        });
        
    });

    //수정창 띄우는 이벤트 ========================================================
    //새로 그려지는 것들은 document에 event 넣기 
    $(document).on('click', '.todo-edit', function() {
        if(editType){
            const nameHtml = $(this).closest('.todo-item').find('.todo-name');
            const name = nameHtml.text().trim();
            nameHtml.html(`
            <input type='text' class="form-control" value='${name}'></input>
            <button class="btn btn-outline-primary edit-save">저장하기</button>
            `);

            editType = false;
        } else {
            const nameHtml = $(this).closest('.todo-item').find('.todo-name');
            const nameValHtml = $(this).closest('.todo-item').find('.todo-name input');
            const name = nameValHtml.val();
            nameHtml.html(`${name}`);

            editType = true;
        } 
    });

    //수정사항 저장 이벤트 ========================================================
    $(document).on('click', '.edit-save', function() {
        //수정 api 호출
        const id = $(this).closest('.todo-item').data('id');
        const nameValHtml = $(this).closest('.todo-item').find('.todo-name input');
        const name = nameValHtml.val();

        const link = "/api/todo/"+id;
        $.ajax({
            url: link,
            dataType: 'json',
            type: 'PUT',
            data: {
                name: name
            },
            success: function(result) {
                console.log(result);
                if(!result.ok){
                    alert(result.msg);
                    return;
                }
                //다시 그리기
                getList();
            }
            , fail: function(err){
                console.log(err);
            }
        });

        editType = true;
    });

    //삭제 이벤트 ========================================================
    $(document).on('click', '.todo-del', function() {
        //TODO: 삭제 api 호출
        const id = $(this).closest('.todo-item').data('id');

        const link = "/api/todo/"+id;
        $.ajax({
            url: link,
            dataType: 'json',
            type: 'DELETE',
            data: {},
            success: function(result) {
                console.log(result);
                if(!result.ok){
                    alert(result.msg);
                    return;
                }

                alert('TODO가 삭제되었습니다.');
                
                //다시 그리기
                getList();
            }
            , fail: function(err){
                console.log(err);
            }
        });

        //다시 그리기
    });
};

const getList = () => {
    const link = "/api/todo";
    $.ajax({
        url: link,
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(result) {
            if(!result.ok){
                alert(result.err);
                return;
            }
            //다시 그리기
            reDraw(result.data)
        }
        , fail: function(err){
            console.log(err);
        }
    });
}

//TODO: 갱신 시 다시 list 받아와 그리는 함수
const reDraw = (data) => {
    const list = $(".list-group");
    list.html('');

    let html = '';
    for(let i=0; i<data.length; i++){
        const now = data[i];
        html = `
            <li class="list-group-item">
                <div class="todo-item row" data-id="${now.id}"> 
                    <div class="form-check-label todo-top col-10"> 
                        <input class="checkbox todo-ck" type="checkbox"> 
                        <label class="todo-name">
                            ${now.name}
                        </label>
                        <span class="badge badge-primary badge-pill">2021.05.09</span>
                    </div> 
                    <div class="col-2 todo-btn">
                        <span class="todo-edit">✏</span>
                        <span class="todo-del">✖</span>
                    </div>

                    <div class="todo-date">
                        <span class="badge badge-pill badge-secondary">MAKE</span>
                        <span class="orm-check-label todo-make">
                            ${now.wrt_date? now.wrt_date : '-'}
                        </span>
                        &nbsp;
                        <span class="badge badge-pill badge-secondary">EDIT</span>
                        <span class="orm-check-label todo-make">
                            ${now.edit_date ? now.edit_date : '-'}
                        </span>
                    </div>
                </div> 
            </li>
        `;

        list.append(html);
    }
};

$( document ).ready(function() {
    $('#datetimepicker').datetimepicker({ format: 'L' });  

    getList();
    btnHandler();
});