## 사전과제

조건은 회원가입, 로그인, 로그인 이후 todo list CRUD  
**단, 기능 구현과 직접적인 연관이 있는 라이브러리는 사용하지 않고 구현**  
사용 가능한 라이브러리는 react router dom, css 관련 라이브러리, axios 등이 전부였다.

## 구현

[구현 영상](https://www.youtube.com/watch?v=9nXQnHhwC_Y)  
[Github](https://github.com/DoDevet/wanted-pre-onboarding-frontend/tree/8cfe6dba26e4be72308912fb1a4fed92fbeebd1e)  
사용 라이브러리

- React
- React Router
- tailwind css

상태관리 api를 사용할 수 없어 약간의 prop drilling 을 감수해야 했다.

기능구현을 끝낸 후에 리팩토링을 하는 편인데,  
범용적인 커스텀훅을 작성하고 싶었으나 해야할것도 많고 일찍 제출하면 가산점을 준다 하길래 제출했다.

## 합격

합격 통보를 받아 기뻤고, 동시에 막막했다.  
혼자서만 개발하던 내가 다른 사람과 팀을 이뤄 과제를 해나가야 한다는것이 부담스러웠고 민폐를 끼치고 싶지 않았다.

Strand 프로젝트에 사용했던 GraphQL의 useQuery, useMutation을 참고하여  
보다 범용적인, 앞으로 나올 모든 프로젝트에서 어느정도는 사용할 수 있도록,  
내가 발목을 잡을일도, 잡힐일도 없도록 커스텀 훅을 만들어보았다.

### useQuery

```jsx
export default function useQuery<T>({ type }: { type: "todos" }) {
  const [state, setState] =
    useState <
    UseQueryState <
    T >>
      {
        error: undefined,
        data: undefined,
        loading: false,
        status: undefined,
      };
  useEffect(() => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos`, {
      method: "GET",
      headers: {
        Authorization: type === "todos" ? `Bearer ${isLoggedInFN()}` : "",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setState((prev) => ({ ...prev, status: res.status }));
        return res.json();
      })
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [type]);

  return {
    ...state,
  };
}
```

### useMutation

```jsx
export default function useMutation<T>(
  method: Method,
  type: "todos" | "signin" | "signup",
  id?: number
): UseMutationReturnType<T> {
  const [state, setState] =
    useState <
    UseMuataionForm <
    T >>
      {
        data: undefined,
        loading: false,
        status: 0,
        errorMessage: "",
      };

  function handler(data: any) {
    const body = JSON.stringify({ ...data });
    setState((prev) => ({ ...prev, loading: true }));
    fetch(
      `https://www.pre-onboarding-selection-task.shop/${
        type !== "todos" ? "auth/" + type : "todos" + (id ? `/${id}` : "")
      }`,
      {
        method,
        headers: {
          Authorization: type === "todos" ? `Bearer ${isLoggedInFN()}` : "",
          "Content-Type": "application/json",
        },
        body: method === "GET" ? null : body,
      }
    )
      .then((res) => {
        setState((prev) => ({ ...prev, status: res.status }));
        return res.json();
      })
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
      })
      .catch((error) => setState((prev) => ({ ...prev, errorMessage: error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [handler, state];
}
```

## 1주차

### 수업

readme의 중요성, ESlint, prettier를 커스텀 하는 방법을 배웠다.  
또, Git hooks를 위한 husky 모듈을 배웠다.

### 1주차 과제

한 팀에 6~7명씩, 총 17팀이 만들어졌다.

1주차 과제는 각자 구현한 사전과제의 Todo list의 기능 중에서 팀원끼리 best practice를 차출하여 병합하는것이였다.

- #### 코드 리뷰

  최소한 파일트리는 맞춰야 하기 때문에 각자 코드를 설명하는 시간을 가졌다.  
  도저히 납득할 수 없는 코드도 있었고, 훌륭한 코드도 있었다.

  하지만 병합이 불가능한 수준으로 전부 다 다른 구조를 지니고 있었기 때문에  
  **기술스택이 다 겹치는 한 분의 코드를 클론**하여 각자 기능 개선을 하는 형식으로 구현했다.

- #### 리팩토링

  클론한 코드가 너무 난해했다.

  한번의 props drilling으로도 충분한 기능들을 3,4번 넘게 넘기거나  
  난해한 구조로 렌더링이 되지 않아 DOM을 통해서 새로고침을 하는 등 많은 문제가 있었다.

  todo 컴포넌트들을 메모이제이션 해도 prop으로 계속 넘기던 함수들이 많아 계속해서 리렌더링이 되었다.

  결국 이것저것 많은것을 뜯어고치다 보니 또 병합을 할 수 없을 수준으로 많이 달라졌다.

  일단 merge를 해야하기 떄문에 그중에서 가장 코드의 변화가 적은 한분의 PR을 merge 시켜 다시 리팩토링을 하는 형식으로 진행되었다.

- #### Best Practice

  1. 폴더 구조 개선

  2. 대부분 기능에서 중복되거나 불필요한 로직 삭제

- #### 나의 Best Practice

  todo-list의 수정 기능을 개선.  
  입력한 todo의 값이 기존의 todo의 값과 같다면 수정하지 않은걸로 간주하여 불필요한 api 통신 방지하도록 구현했다.

## 배운점

- ### Readme의 중요성

  그동안 readme를 전혀 작성하지 않았었다.  
  readme보단 자신이 만든 포트폴리오, 즉 결과물을 보는것이 더 효과적이라 생각했다.

  하지만 이는 큰 착각이자 오만이였다.

  지원자가 많은데 아무런 명세도 없는 의미불명의 포트폴리오를 일일이 살펴보는 기업은 없을것이다.

- ### 파일 트리

  내가 만든 todo-list의 폴더 구조는 매우 단순하고 폴더의 네이밍 센스도 일관적이지 못했다.  
  단순한 만큼 직관적이기도 했지만, 규모가 커지는 프로젝트일수록 관리가 힘들어지는 구조일것이 느껴졌다.

  팀원들의 파일 트리는 단순하지 않았고, 매우 복잡하게 나뉘어진 파일 트리도 있었지만 다들 공통적으로 작성한 것들이 있었다.  
  적어도 공용 컴포넌트, 전용 컴포넌트에 대한 분리, hooks, utils, libs 폴더 등 나름의 컨벤션과 각자 어떤것을 넣어야 하는지 등 많은것을 배웠다.

- ### React Router

  나는 프론트엔드 개발자로서 나름의 정석 루트를 밟지 않았었다.

  원래는 어플리케이션에 관심이 있었고, **Expo 프레임워크**를 통해서 **Android, Ios 어플리케이션을 빌드**할 수 있다는 것을 보고 **React native** 프로젝트 진행, 이후 DOM 이벤트 등 **기초가 필요**하다는 생각에 **바닐라 JS** 프로젝트를, **최신 기술 동향**을 따라잡기 위해 **Next.js 프레임워크**를 사용하여 프로젝트를 진행했다.

  **React native**는 **Stack Navigator**, **Tab Navigator** 등을 통해서 컴포넌트를 불러오는 방식이고,  
  **Next.js**는 **폴더 구조**를 통해 Routing을 처리하는 차이가 있어 React의 라우팅 방식에 익숙하지 않았다.

  나름대로 공통 컴포넌트를 사용하여 좋은 구조를 가지고 있다고 생각했지만  
  동료들의 코드를 보고 난 후 **React Router Dom v6**에서 제공하는 **Outlet** 컴포넌트를 사용하여 좀 더 좋은 코드를 만들 수 있었다는걸 자각하게 되었다.

- ### Github 이해도

  혼자 개발하던 내게 있어서 git과 github란 그저

  ```bash
  git add .
  ```

  ```bash
  git commit -m ""
  ```

  ```bash
  git push origin main
  ```

  이 일련의 행위가 전부였다.

  어떠한 상황 때문에 컴퓨터가 꺼지거나 고장났을때를 대비한 백업 툴 이상의 가치를 지니지 않았다.  
  그 결과 팀원들간의 회의시간에 organization, pr, merge, 스쿼시 등의 git과 관련된 얘기가 나왔을때 아무런 이해도 할 수 없었다.

  git 컨벤션도 일관적이지 못했다.  
  커밋 자체를 별로 하지 않는데다 브랜치를 따로 파서 기능구현을 하는것에 익숙하지 않았기에 모든것이 서툴렀다.

  남에게 민폐끼치고 싶지 않은 마음과 인정 욕구가 심한 나에게 있어 내 자신이 너무 부끄러웠다.  
  그 굴욕을 원동력 삼아 중간에 코로나에 걸렸음에도 협업툴에 대해 열심히 공부했다.

- ### 협업 과정

  상의도 없이 마음에 들지 않는 구조와 기능들을 고쳤다.  
  기능개선에 도움이 되더라도 협업에 있어서 그다지 도움되지 않는 행동이란걸 자각하게 되었다.

## 후기

협업을 해본적이 없는 내게 있어서 굉장히 귀중한 경험이였다.  
모든 팀원들이 다양한 시각에서 나에게 배움을 주었다고 생각한다.
