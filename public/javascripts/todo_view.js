const btnHandler = () => {
    //input으로 바꿀 경우 true, 다시 text일 경우 false
    let editType = true;

    const btnAdd = $('.todo-add');
    const btnSearch = $('.search-btn');

    //검색 이벤트 ========================================================
    btnSearch.click(function() {
        console.log("search")
        search();
    });

    //등록 이벤트 ========================================================
    btnAdd.click(function() {
        const name = $('.todo-new').val();
        let dateStr = $('.todo-end').val();

        //태그 리스트 얻어오기
        let tagIdArr = [];
        $('.tag-view span').each(function() {
            const id = $(this).data('id');
            tagIdArr.push(id);
        });
        const tagId = tagIdArr.join(',');
        if(!name){
            alert("TODO 이름을 입력해주세요.");
            return;
        }

        if(!dateStr){
            alert("종료 날짜를 입력해주세요.");
            return;
        }
        
        try{
            const dateArr = dateStr.split('/');
            dateStr = dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];
            //TODO: 날짜 유효성 검사
        }catch(e){
            alert('날짜 형식이 맞지 않습니다.');
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
                , tag_todo: tagId
                , end_date: dateStr
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
    });

    //체크 시 완료로 변경 이벤트 ========================================================
    $(document).on('click', '.todo-ck', function() {
        const id = $(this).closest('.todo-item').data('id');
        let todoCk = $(this).is(":checked");
        let end_flag = 0;

        //미완료 => 완료
        if(todoCk){
            end_flag = 1;

            //tag 완료 여부 체크
            let endTagCk = true;
            const nowData = LIST.reduce((acc, val) => {
                if(val['id'] === id) acc = val['tag_todo'];
                return acc;
            }, '');
            
            if(nowData){ //tag 된 항목 있을 경우 
                const tagArr = nowData.split(',');
                for(let i=0; i<LIST.length; i++){
                    if(tagArr.indexOf(LIST[i]['id']+"") !== -1){
                        if(LIST[i]['end_flag'] === 0 || LIST[i]['end_flag'] === null){
                            endTagCk = false;
                            break;
                        }
                    }
                }
            }

            if(!endTagCk){
                alert('태그 된 TODO가 끝나야 완료 가능합니다.');
                $(this).prop("checked", false);
                return;
            }
        }

        const link = "/api/todo/end/"+id;
        $.ajax({
            url: link,
            dataType: 'json',
            type: 'PUT',
            data: {
                end_flag: end_flag
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
    });
};

//todo list 받아오는 함수
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

            LIST = result.data;
            //다시 그리기
            reDraw(result.data);
            pagination(result.data.length, result.data);
        }
        , fail: function(err){
            console.log(err);
        }
    });
}

//태그 리스트 받아와서 
const tagList = (listString, data) => {
    let listArr = [], resultArr = [], resultString = '';

    //태그 된 항목 없을 경우 예외처리
    if(listString === '' || !listString){
        return false;
    }

    if(listString.indexOf(',') !== -1){
        listArr = listString.split(',');
    }
    
    for(let i=0; i<listArr.length; i++){
        for(let j=0; j<data.length; j++){
            if(data[j]['id']*1 === listArr[i]*1){
                resultArr.push(data[j]['id']+"/"+data[j]['name']);
            }
        }
    }
    
    resultString = resultArr.reduce((str, val, index) => {
        str += "@" + val;
        
        if(index !== resultArr.length-1){
            str += ',';
        }

        return str;
    }, '');

    return resultString;
}

//list 받아와 그리는 함수
const reDraw = (data) => {
    const list = $(".list-group");
    list.html('');

    let html = ''; 

    //url 페이지 예외처리 
    if(Math.ceil(data.length/5) < page) location.href = '/1';

    for(let i=(page*5) - 5; i<(page*5); i++){
        if(i === data.length) break;
        const now = data[i];

        //tag list 만들기
        now.tagList = tagList(now.tag_todo, data);

        html = `
            <li class="list-group-item">
                <div class="todo-item row" data-id="${now.id}"> 
                    <div class="form-check-label todo-top col-10"> 
                        <input class="checkbox todo-ck" type="checkbox" ${now.end_flag? 'checked': ''}> 
                        <label class="todo-name ${now.end_flag? 'todo-end-text': ''}">
                            ${now.name}
                        </label>
                        <span class="badge badge-primary badge-pill">
                            ${now.end_date? now.end_date : '-'}
                        </span>
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

                    <div class="todo-tag" style="display: ${now.tagList ? 'block' : 'none'}">
                        <span class="badge badge-pill badge-secondary">TAG</span>
                        <span>${now.tagList}</span>
                    </div>
                </div> 
            </li>
        `;

        list.append(html);
    }
};

const pagination = (len, data) => {
    const pagination = $('.pagination');
    let html = '', cnt = 0;

    pagination.html('');
    for(cnt=1; cnt<=parseInt(len/5); cnt++){
        html = `<li class="page-item ${cnt === 1 ? 'active' : ''}"><a class="page-link" data-page="${cnt}">${cnt}</a></li>`;
        pagination.append(html);
    }

    if(len%5 !== 0){
        html = `<li class="page-item ${cnt === 1 ? 'active' : ''}"><a class="page-link" data-page="${cnt}">${cnt}</a></li>`;
        pagination.append(html);
    }

    $('.page-link').click(function(){
        const thisPage = $(this).data('page');

        $('.page-item').removeClass("active");
        
        $(this).closest('li').addClass("active");
        page = thisPage;
        reDraw(data);
        history.pushState(null, null, `/${thisPage}`);
    })
}

const search = () => {
    const isEnd = $('input[name="is_end"]:checked').val();
    const value = $('.todo-search').val();

    let reData = [];
    for(i=0;i<LIST.length;i++){
        if(LIST[i].name.indexOf(value) > -1){
            reData.push(LIST[i]);
        }
    }
    console.log(isEnd)
    if(+isEnd === 2){
        reDraw(reData);
        pagination(reData.length, reData);
        return;
    }

    reData = reData.reduce((acc, val) => { 
        if(+val.end_flag === +isEnd) acc.push(val);
        return acc;
    }, []);

    reDraw(reData);
    pagination(reData.length, reData);
}

const popup = () => {
    const popup = $("#todo-tag-popup .tag-list");
    popup.html('');

    let html = '';
    for(let i=0; i<LIST.length; i++){
        const now = LIST[i];

        html = `
            <li class="list-group-item">
            <div class="todo-item row" data-id="${now.id}"> 
                <div class="form-check-label todo-top col-12"> 
                    <input class="checkbox tag-yn" type="checkbox"> 
                    <label class="todo-name ${now.end_flag? 'todo-end-text': ''}">
                        ${now.name}
                    </label>
                    <span class="badge badge-primary badge-pill">
                        ${now.end_date? now.end_date : '-'}
                    </span>
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

                <div class="todo-tag" style="display: ${now.tagList ? 'block' : 'none'}">
                    <span class="badge badge-pill badge-secondary">TAG</span>
                    <span>${now.tagList}</span>
                </div>
            </div> 
            </li>
        `;

        popup.append(html);
    }
}

const popup_close = () => {
    let arrName = [];
    let arrId = [];
    $('.tag-list input[type="checkbox"]:checked').each(function() {
        const name = $(this).closest('.todo-item').find('.todo-name').text();
        const id = $(this).closest('.todo-item').data('id');
        arrId.push(id)
        arrName.push(name);
    });

    const list = $('.tag-view');
    list.html('');

    let html = '';
    for(let i=0; i<arrName.length; i++){
        html = `<span class="badge badge-dark" data-id="${arrId[i]}">${arrName[i]}</span>&nbsp;`
        list.append(html);
    }
}

$( document ).ready(function() {
    $('#datetimepicker').datetimepicker({ format: 'L' });  
    $('#todo-tag-popup').on('show.bs.modal', function (e) {
        popup();
    });

    $(document).on("click", "#tood-tag-add-view", function(){
        popup_close();
    })

    getList();
    btnHandler();
});