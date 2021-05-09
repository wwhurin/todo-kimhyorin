# TODO 페이지 과제

목표 기능

- [x] TODO LIST 띄우기/갱신하기
- [x] TODO 수정하기 (이름, 완료상태)
- [x] TODO 삭제하기
- [x] TODO 등록하기
- [x] TODO 검색하기
- [x] TODO 수정/등록일 표시 (YYYY-MM-DD)
- [ ] TODO 태그하기
- [ ] TODO 페이징 하기


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


# 실행 화면
![report_gif](https://user-images.githubusercontent.com/26541563/117570698-52159b80-b106-11eb-83f3-b7cfc3964e2c.gif)
