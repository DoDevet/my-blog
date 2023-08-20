## 3주차

3주차에는 Redux 수업과 과제가 있었다.

## 3주차 과제

특정 깃헙 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

- [GitHub REST API](https://docs.github.com/en/rest)
- token을 발급하지 않으면 시간 당 60회로 API 호출 횟수 제한 됨
- 개발 시에는 access token을 발급받아 60회 제한 없이 개발 권장
- 이후 과제 제출 및 배포단계에서는 access token이 노출되지 않도록 주의

### 과제 범위

1. 이슈 목록 화면

   - 이슈 목록 가져오기 API 활용
   - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
   - 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
   - 다섯번째 셀마다 광고 이미지 출력
     - 이미지![image](/images/wanted/wanted-pre-onboarding-3_2.webp)
     - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
   - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

2. 이슈 상세 화면
   - 이슈의 상세 내용 표시
   - ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
3. 공통 헤더
   - 두 페이지는 공통 헤더를 공유합니다.
   - 헤더에는 Organization Name / Repository Name이 표시됩니다.

### 요구 사항

- 필수 요구 사항

  - 이슈 목록 및 상세 화면 기능 구현
  - Context API를 활용한 API 연동
  - 데이터 요청 중 로딩 표시
  - 에러 화면 구현
  - 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

- 선택 사항
  - CSS-in-JS 적용

### 개발 조건 및 환경

- 기간: 07/11 화요일 세션 종료 후(17:00) ~ 07/14 금요일 자정(24:00)
- 언어 : JavaScript / TypeScript
- 필수 기술: React, Context API
- 선택 기술:
  - Redux와 같은 전역 상태 관리 기술(toolkit 사용 가능, RTK-Query는 사용제한)
  - 스타일 관련 라이브러리(styled-components, emotion, ui kit 등)
  - 라우팅 관련 라이브러리(react-router-dom)
  - HTTP Client(axios 등)
  - 마크다운 렌더링 라이브러리
- 위에 기재된 라이브러리 외 사용 불가

## 회의

과제가 발표된 후 팀원들끼리 모여 회의를 진행했다.

참고로 과제는 주어진 과제에 대해 각자 개인이 구현하는것을 원칙으로 하며,  
그 이후 각자 개발한것의 Best Practice를 차출하여 병합하는 형식으로 진행된다.

3주차에 배웠던 Redux에 대한 적용은 선택사항이기도 하고 이틀내로 구현해야 하는 부담감과  
Redux의 어려움,이틀내로 구현해야 하는 부담감, Context API로도 충분히 구현 가능하다고 판단하였기에  
팀원들 모두 사용하지 않는것으로 합의를 했다.

또, 지난 과제 수행시 발생했던 문제점들을 최소화 하기 위해 최대한 동일한 환경을 맞추고자 진행했다.

- ### 컨벤션
  github의 commit 메세지에 대한 컨벤션과 prettier, eslint, husky는 1주차와 동일하게 설정하였다.
- ### API 요청

  ![image](/images/wanted/wanted-pre-onboarding-3_3.png)
  ![image](/images/wanted/wanted-pre-onboarding-3_4.png)

  Issue List를 불러오는 api documents를 보았는데 Javascript 예제에서는 octokit을 사용했어야 됐다.

  해당 과제의 요구사항에 octokit 사용할 수 없으므로 cURL을 보고 fetch로 불러올 수 있어야 했다.

  Happy hash 프로젝트의 image upload 기능에서 cURL을 보고 fetch로 요청을 보냈던 경험이 있어 무리없이 구현할 수 있었고 이 방식을 공유하였다.

- ### 파일트리

- ### 페이지 디테일
  issueList 안에 body 정보(페이지 디테일)가 있었기에 issueList에 대한 API를 불러와서 디테일페이지를 채우는 식으로 결정했다.

## 문제

회의가 끝나고 곰곰히 생각해보니 페이지 디테일쪽 로직에 문제가 있다는걸 알게 되었다.  
이슈 리스트에서 디테일 정보를 받아오게 된다면 새로고침, URL 접속시 불러왔던 issueList가 전부 날아가버리는 문제를 뒤늦게 알아차렸고  
페이지 디테일을 불러오는 Get an issue API 사용이 필요하다는것을 팀원들에게 알렸다.

아무래도 장시간 교육을 받고 바로 과제에 대한 토론을 하려다 보니 다들 정신이 없었던 거 같다.  
localStorage를 통해서 불러온 Issue List를 저장하자는 의견도 나왔지만, 클라이언트에 저장하게 되는것이므로  
클라이언트마다 접속 가능한 페이지가 달라지기 때문에 이슈 디테일 페이지를 링크로 공유하게 된다면 같은 문제가 일어날것이기 때문에  
결국 Get an issue API를 사용하는 방향으로 정해졌다.

Context API의 Provider와 이로인한 파일트리의 구조 변경에 대해 다시 의논해야 할 필요성을 느꼈지만  
다시 회의를 하기엔 시간이 늦기도 하였고 구현 시간과 코드 병합을 고려하면 시간이 없었기에 이부분에 대해선 각자 구현하는것으로 마무리 되었다.

## 구현
