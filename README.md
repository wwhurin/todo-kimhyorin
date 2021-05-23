# TODO 페이지 과제

목표 기능

- [x] TODO LIST 띄우기/갱신하기
- [x] TODO 수정하기 (이름, 완료상태)
- [x] TODO 삭제하기
- [x] TODO 등록하기
- [x] TODO 검색하기
- [x] TODO 수정/등록일 표시 (YYYY-MM-DD)
- [x] TODO 태그하기
- [x] TODO 페이징 하기
- [ ] 기타 예외처리


# 실행 방법 및 사용 기술

```
npm init
npm start run
```

BackEnd : Nodejs (Express), SQLite, Sequelize

FrontEnd: ejs, BootStrap, JQuery 


# TABLE 구조
![image](https://user-images.githubusercontent.com/26541563/117570809-dd8f2c80-b106-11eb-80b3-65811ea81551.png)

- id : PK. 자동으로 1씩 증가하는 컬럼.
- name : TODO 이름.
- wrt_date : 작성 날짜.
- edit_date : 수정 날짜. 갱신되는 컬럼.
- end_date : TODO 마감 기한.
- use_flag : 삭제 유무 컬럼.
- end_flag : 완료 유무 컬럼.
- tag_todo : tag한 TODO 기록하는 컬럼.


# 폴더 구조
```
📂bin
┃ ┗ 📜www
┣ 📂config
┃ ┗ 📜config.json
┣ 📂migrations
┃ ┗ 📜2021050917281000-create-todo_list.js
┣ 📂models
┃ ┣ 📜index.js
┃ ┗ 📜todo_list.js
┣ 📂public
┃ ┣ 📂images
┃ ┣ 📂javascripts
┃ ┃ ┗ 📜todo_view.js
┃ ┗ 📂stylesheets
┃ ┃ ┣ 📜style.css
┃ ┃ ┗ 📜todo_view.css
┣ 📂routes
┃ ┣ 📂apiController
┃ ┃ ┗ 📜index.js
┃ ┣ 📂viewController
┃ ┃ ┗ 📜index.js
┃ ┗ 📜index.js
┣ 📂seeders
┣ 📂views
┃ ┣ 📜error.ejs
┃ ┗ 📜index.ejs
┣ 📜.gitignore
┣ 📜app.js
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┗ 📜todo_db.db
 
 ```
- models : sequelize 세팅과 table 모델이 담겨 있습니다.
- routes : view와 api의 router가 담겨 있습니다. 
- view : ejs 파일이 담겨 있습니다.
- public : js, image, css 파일이 담겨 있습니다.


# api 리스트
```
모든 api들은 /api 로 시작됩니다.
```

1. [GET] /todo - 삭제되지 않은 todo list를 받아옵니다.

2. [POST] /todo - todo를 신규 생성합니다.

3. [PUT] /todo/:id - todo의 id값을 받아 해당 todo의 이름을 업데이트 합니다. 업데이트 시간도 함께 기록합니다.

4. [DELETE] /todo/:id - todo의 id값을 받아 해당 todo의 use_flag를 변경합니다. update를 진행하나 삭제와 동일한 의미로 사용하므로 DELETE로 구현했습니다.

5. [PUT] /todo/end/:id - todo의 id값을 받아 해당 todo를 완료처리 합니다. 완료된 시각도 함께 기록합니다.



# 실행 화면
![report_gif](https://user-images.githubusercontent.com/26541563/117570698-52159b80-b106-11eb-83f3-b7cfc3964e2c.gif)
