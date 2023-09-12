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
4. 와이어 프레임

- ![image](/images/wanted/wanted-pre-onboarding-3_5.png)

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

  Issue List 마다 issue Detail 내용이 있기에 **issue Detail 요청은 요청한 Issue List를 필터링** 하는 형식으로 구현하기로 했다.

- ### 파일트리

  ```bash
  src
  ┣ apis
  ┃ ┣ axiosInstance.ts
  ┃ ┗ getIssueList.ts
  ┣ components
  ┃ ┣ IssueDetail
  ┃ ┃ ┣ Content.tsx
  ┃ ┃ ┗ index.tsx
  ┃ ┣ IssueList
  ┃ ┃ ┣ Advertisement.tsx
  ┃ ┃ ┗ index.tsx
  ┃ ┗ common
  ┃ ┃ ┣ Error.tsx
  ┃ ┃ ┣ Header.tsx
  ┃ ┃ ┣ IssueItem.tsx
  ┃ ┃ ┗ Loading.tsx
  ┣ constants
  ┃ ┗ common.ts
  ┣ contexts
  ┃ ┗ issueContext.ts
  ┣ pages
  ┃ ┣ DetailPage.tsx
  ┃ ┣ Layout.tsx
  ┃ ┗ ListPage.tsx
  ┣ types
  ┃ ┗ issue.ts
  ┣ App.css
  ┣ App.test.tsx
  ┣ App.tsx
  ┣ index.css
  ┣ index.tsx
  ┣ logo.svg
  ┣ react-app-env.d.ts
  ┣ reportWebVitals.ts
  ┗ setupTests.ts
  ```

- ### 무한 스크롤

  intersectionObserver API를 사용하여 무한 스크롤을 구현하기로 하였다.  
  무한스크롤은 지금까지 브라우저에서 제공하는 scroll API를 사용하여 구현해왔기 때문에 흥미로웠다.

- ### 마크다운 라이브러리
  API로 불러온 detail 데이터들은 마크다운 형식으로 날아오기 때문에 라이브러리 선택이 필수였다.  
  내가 아는 markdown 라이브러리는 gray matter가 유일하였지만 각종 플러그인들을 사용할 수 있는 react markdown 이라는 라이브러리를 알게 되었고 이를 사용하기로 하였다.

## 문제

회의가 끝나고 곰곰히 생각해보니 Issue Detail의 로직에 문제가 있다는걸 알게 되었다.  
이슈 리스트에서 디테일 정보를 받아오게 된다면 새로고침, URL 접속시 불러왔던 issueList가 전부 날아가버리는 문제를 뒤늦게 알아차렸고  
페이지 디테일을 불러오는 Get an issue API 사용이 필요하다는것을 팀원들에게 알렸다.

localStorage를 통해서 불러온 Issue List를 저장하자는 의견도 나왔지만, 클라이언트마다 접속 가능한 페이지가 달라진다.  
접근한적이 없는 이슈 디테일 페이지를 링크로 공유하게 된다면 같은 문제가 일어날것이기 때문에 결국 Get an issue API를 사용하는 방향으로 정해졌다.

Context API의 Provider와 이로인한 파일트리의 구조 변경에 대해 다시 의논해야 할 필요성을 느꼈지만  
다시 회의를 하기엔 시간이 늦기도 하였고 구현 시간과 코드 병합의 과정을 고려한다면 시간이 없었기에 이부분에 대해선 각자 구현하는것으로 마무리 되었다.

## 구현

```bash
git clone https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5.git

cd pre-onboarding-11th-3-5

git reset --hard 358ce5c0cd4fa964bb4de4c59c12b0191f9e66eb

npm i && npm start
```

[Github](https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/tree/dodevet)

![image](/images/posts/wanted-pre-onboarding-3.png)

![image](/images/wanted/wanted-pre-onboarding-3_6.png)

- ### 구조

  ```bash
  src
  ┣ apis
  ┃ ┣ axiosInstance.ts
  ┃ ┗ getIssueList.ts
  ┣ components
  ┃ ┣ IssueDetail
  ┃ ┃ ┣ Content.tsx
  ┃ ┃ ┗ index.tsx
  ┃ ┣ IssueList
  ┃ ┃ ┣ Advertisement.tsx
  ┃ ┃ ┗ index.tsx
  ┃ ┗ common
  ┃ ┃ ┣ Error.tsx
  ┃ ┃ ┣ Header.tsx
  ┃ ┃ ┣ IssueItem.tsx
  ┃ ┃ ┗ Loading.tsx
  ┣ constants
  ┃ ┗ common.ts
  ┣ contexts
  ┃ ┗ issueContext.tsx
  ┣ pages
  ┃ ┣ DetailPage.tsx
  ┃ ┣ Layout.tsx
  ┃ ┗ ListPage.tsx
  ┣ types
  ┃ ┗ issue.ts
  ┣ App.css
  ┣ App.tsx
  ┣ index.tsx
  ┗ react-app-env.d.ts
  ```

- ### API 요청 기능

  ```jsx
  const IssueStateContext = createContext<IssueState>({
    data: null,
    loading: false,
    error: null,
  });
  const IssueDispatchContext = createContext<{ (): void } | null>(null);

  const IssueDetailStateContext = createContext<DetailIssueState>({
    data: null,
    loading: false,
    error: null,
  });

  const IssueDetailDispatchContext = createContext<{ (id: string): void } | null>(
    null,
  );

  export const useIssue = () => useContext(IssueStateContext);
  export const useIssueDispatch = () => useContext(IssueDispatchContext);
  export const useIssueDetail = () => useContext(IssueDetailStateContext);
  export const useIssueDetailDIspatch = () =>
    useContext(IssueDetailDispatchContext);

  const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<IssueState>({
      data: null,
      loading: false,
      error: null,
    });
    const [detailData, setDetailData] = useState<DetailIssueState>({
      data: null,
      loading: false,
      error: null,
    });

    const [page, setPage] = useState(1);
    const [endPage, setEndPage] = useState(false);

    const dispatchIssue = () => {
      if (endPage) return;
      setData((prev) => ({ ...prev, loading: true }));
      client({ params: { page, per_page: 30, sort: "comments" } })
        .then((res) => res.data)
        .then((data) =>
          setData((prev) => {
            if (data.length !== 30) setEndPage(true);
            return {
              ...prev,
              data: prev.data ? [...prev.data, ...data] : [...data],
            };
          }),
        )
        .catch((e) => setData((prev) => ({ ...prev, error: e })))
        .finally(() => setData((prev) => ({ ...prev, loading: false })));
      setPage((prev) => prev + 1);
    };

    const dispatchDetailIssue = (id: string) => {
      setDetailData((prev) => ({ ...prev, error: null, loading: true }));
      client
        .get(id)
        .then((res) => res.data)
        .then((data) =>
          setDetailData((prev) => ({
            ...prev,
            data,
          })),
        )
        .catch((e) =>
          setDetailData((prev) => ({ ...prev, data: null, error: e })),
        )
        .finally(() => setDetailData((prev) => ({ ...prev, loading: false })));
    };

    return (
      <IssueStateContext.Provider value={data}>
        <IssueDispatchContext.Provider value={dispatchIssue}>
          <IssueDetailDispatchContext.Provider value={dispatchDetailIssue}>
            <IssueDetailStateContext.Provider value={detailData}>
              {children}
            </IssueDetailStateContext.Provider>
          </IssueDetailDispatchContext.Provider>
        </IssueDispatchContext.Provider>
      </IssueStateContext.Provider>
    );
  };

  export default IssueProvider;

  ```

- ### 홈페이지(무한 스크롤 및 광고)

  ```jsx
  function IssueList() {
    const pageEnd = useRef < HTMLDivElement > null;
    const { data, loading, error } = useIssue();
    const dispatch = useIssueDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // 무한 스크롤
      if (!error && dispatch && pageEnd.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(
            (entry) => {
              if (entry.isIntersecting && !loading) {
                dispatch();
              }
            },
            { threshold: 0.7 }
          );
        });
        observer.observe(pageEnd.current);
      }
    }, [dispatch, error, loading]);

    return (
      <Container>
        {error ? (
          <div>Error</div>
        ) : (
          data?.map((issue, index) => (
            <section key={issue?.number}>
              <List
                style={{
                  borderBottom:
                    (index + 1) % 4 === 0 ? "0px" : "1px solid gray",
                }}
                onClick={() => navigate(`/${issue?.number}`)}
              >
                <IssueItem
                  comments={issue?.comments}
                  title={issue?.title}
                  createdAt={issue?.created_at}
                  login={issue?.user?.login}
                  number={issue?.number}
                />
              </List>
              {(index + 1) % 4 === 0 && <Advertisement />} // 광고
            </section>
          ))
        )}
        {loading ? <Loading /> : <div ref={pageEnd} />}
      </Container>
    );
  }

  export default IssueList;
  ```

- ### 디테일 페이지

  ```jsx
  function IssueDetail() {
    const location = useLocation();
    const { data, loading, error } = useIssueDetail();
    const dispatch = useIssueDetailDIspatch();
    const diffPage = data?.number !== +location.pathname.replace(/[^0-9]/, "");

    const callbackDispatch = useCallback(
      (pathname: string) => {
        if (dispatch && !loading) dispatch(pathname);
      },
      [dispatch, loading]
    );

    useEffect(() => {
      if (!error && (diffPage || !data)) {
        callbackDispatch(location.pathname);
      }
    }, [callbackDispatch, diffPage, data, location.pathname, error]);

    return (
      <IssueDetailContainer>
        {error ? (
          <div>Error</div>
        ) : loading || diffPage ? (
          <Loading />
        ) : (
          <Items>
            <IssueItem
              comments={data.comments}
              createdAt={data.created_at}
              login={data.user.login}
              number={data.number}
              title={data.title}
              avatar={data.user.avatar_url}
            />
            <Content body={data.body} />
          </Items>
        )}
      </IssueDetailContainer>
    );
  }
  export default IssueDetail;
  ```

## 2차 회의

해당주차 목요일 오후 5시까지 각자 구현하고, 병합을 위한 회의를 진행하기로 했다.

약속한 시간까지 완전히 구현한 사람은 나와 팀원 한 분 뿐이였다.  
그 팀원분의 파일구조와 코드는 매우 정갈하고 깔끔했다.

그에 비해 나의 결과물은 요구사항만을 맞춰 어떻게든 돌아가게 만든것일 뿐  
잘못된 Context API, useCallBack 사용, 난잡한 코드구조 등 비교를 통해 많은 문제를 알게 되었다.

### 내 코드의 문제

- 해당 과제의 와이어프레임은 모바일 페이지에 가깝다.

  개인적으로 모바일 페이지에는 뒤로가기 네비게이션이 있어야한다고 생각하여 구현해봤는데 React의 Link 컴포넌트를 통해 라우팅을 하게 되면 state값이 남고 이전 페이지를 기억하게 됨으로 갱신이 되지 않는다.

  이는 **Context API의 Provider를 한곳에서 처리**하기 때문에 Detail Page에 빠져나가게 되어도 **페이지 detail의 값이 유지**가 되는 점과 **React Link는 a 태그와 다르게 라우팅시 새로고침 대신 필요한 부분만 리렌더링** 되는 방식으로 인해 생기는 일이다.

- 이전에 방문했던 페이지를 다시 재방문 한다면 API 호출을 줄일 수 있도록하여 이점을 살리고자 했으나 useCallback의 잘못된 사용으로 **API 호출 훅이 동등성을 보장하지 않아 API 무한 호출**의 문제가 생겼다.

## 병합

완전히 구현한 사람은 2명밖에 없고 내 코드는 너무 지저분하였기에  
결국 1주차와 비슷하게 한 사람의 코드를 클론하여 각자 기능을 보완하기로 하였다.

## Best Practice

- **IssueList, an issue context (관심사 분리)**  
  issue list context와 issue context를 다른 파일로 분리하고 Provider도 분리하여 관심사 분리
- **Issue context 내부에서 useParam id관리**  
  이슈 번호를 url의 path variable로 받아와서 issue context의 초기 데이터 로딩에 사용
- **useInfiniteIssue**  
  무한 스크롤을 위해 다음 페이지 데이터를 가져오는 로직을 커스텀 훅으로 분리
- **avatar 이미지 layout shift**

## 나의 Best Practice

- **Issue 컴포넌트 react.memo 최적화**  
  Issue List를 불러올때 각각의 Issue 컴포넌트들이 리렌더링 됨으로  
  Issue 컴포넌트를 메모이제이션을 함으로써 렌더링 성능을 개선했다.

- **Issue Detail api 호출 최적화**

  [Happy Hash 프로젝트](https://jihuns-blog.vercel.app/posts/happy-hash-post)에서 **Post Modal Routing** 구현과 **로딩없는 즉각적인 피드백**을 구현하기 위해  
   **게시글 목록을 불러오는 API**에 **각각의 게시물 body 정보**를 포함하여 보낸적이 있었다.

  Github API의 Issue List 요청에도 Issue Detail에 대한 정보들이 들어있는 비슷한 구조에  
   **React**는 SPA 특성상 페이지 이동시 **state**로 특정값을 보낼 수 있다.

  ![image](/images/wanted/best-practice.gif)

  이를 통해 이슈 리스트에서 이슈 클릭시 해당 이슈의 body 정보를 재사용하여 Get an issue api 호출을 방지할 수 있었다.  
  새로고침, 링크로 접속하여 state 정보가 없을때에만 api 호출을 하도록 구현하여 API 호출 횟수를 줄일 수 있도록 개선하였다.

  - State 저장

  ```jsx
  function IssueList() {
    const { data, error, loading, hasNextPage } = useIssueList();
    const fetchNextPage = useIssueListDispatch();
    const observeTargetRef = useInfiniteIssue<HTMLDivElement>();

    return (
      <IssueListBox>
        {data.flatMap((issue, index) => {
          const nodes = [
            <li key={issue.number}>
              <Link to={`/${issue.number}`} state={issue}> // Issue 데이터 state로 보냄
                <IssueItem
                  comments={issue.comments}
                  number={issue.number}
                  title={issue.title}
                  created_at={issue.created_at}
                  login={issue.user.login}
                />
              </Link>
            </li>,
          ];
          const isAdvertisement = (index + 1) % 4 === 0;
          isAdvertisement &&
            nodes.push(
              <li key={`ad#${index}`}>
                <Advertisement />
              </li>,
            );
          return nodes;
        })}
        <div ref={hasNextPage && !error ? observeTargetRef : null}></div>
        <Error error={error} refetch={fetchNextPage} />
        <Loading loading={loading} />
      </IssueListBox>
    );
  }
  ```

  - Post Detail 처리

  ```jsx
  const IssueDetailProvider: React.FC<React.PropsWithChildren> = ({
    children,
  }) => {
    const { state: issue } = useLocation();
    const [data, setData] =
      useState <
      IssueDetailState >
      {
        data: issue,
        loading: issue ? false : true,
        error: null,
      };
    const { id } = useParams();

    const fetchIssueDetail = useCallback(async () => {
      if (!id || isNaN(parseInt(id))) {
        setData((prev) => ({ ...prev, error: { message: "Invalid id" } }));
        return;
      }
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const { data } = await getIssue(parseInt(id));
        setData((prev) => ({ ...prev, data }));
      } catch (e) {
        if (isAxiosError < ErrorResponse > e && e.response) {
          const {
            data: { message },
          } = e.response;
          setData((prev) => ({
            ...prev,
            error: { message },
          }));
        } else if (isAxiosError(e)) {
          const { message } = e;
          setData((prev) => ({
            ...prev,
            error: { message },
          }));
        }
      } finally {
        setData((prev) => ({ ...prev, loading: false }));
      }
    }, [id]);

    useEffect(() => {
      if (!data.data) fetchIssueDetail();
    }, [fetchIssueDetail, data.data]);

    return (
      <IssueDetailStateContext.Provider value={data}>
        <IssueDetailDispatchContext.Provider value={fetchIssueDetail}>
          {children}
        </IssueDetailDispatchContext.Provider>
      </IssueDetailStateContext.Provider>
    );
  };
  ```

## 후기

[Github 링크](https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5)  
[배포 사이트](https://pre-onboarding-11th-3-5-fork.vercel.app/)

1주차와는 다르게 Git에 대해 나름대로 학습을 했기 때문에 회의 시간에 적극적으로 참여할 수 있었다.  
또, 뛰어난 동료의 코드를 보고 기초적인 부분에서 상당히 많은것들을 배울 수 있었다.

내가 제시한 아이디어들이 좋은 평가를 받은것에 대해 뿌듯함을 느꼈고,  
만드는 과정에서도 동료의 피드백 덕분에 간결하고 좋은 코드를 빠르게 작성할 수 있었다.

처음에는 부담스럽게 생각했던 동료 학습의 과정이 상당히 유익했고 재밌었다.
