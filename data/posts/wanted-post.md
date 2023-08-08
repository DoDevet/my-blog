## 사전과제

조건은 회원가입, 로그인, 로그인 이후 todo list CRUD  
**단, 기능 구현과 직접적인 연관이 있는 라이브러리는 사용하지 않고 구현**  
사용 가능한 라이브러리는 react router dom, 스타일링, axios 등이 전부였다.

## 구현

[구현 영상](https://www.youtube.com/watch?v=9nXQnHhwC_Y)  
[Github](https://github.com/DoDevet/wanted-pre-onboarding-frontend/tree/8cfe6dba26e4be72308912fb1a4fed92fbeebd1e)  
사용 라이브러리

- React
- React Router
- tailwind css

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
또, Githooks를 위한 husky 모듈을 배웠다.

### 1주차 과제

한 팀에 6~7명씩, 총 17팀이 만들어졌다.

1주차 과제는 각자 구현한 사전과제의 Todo list의 기능 중에서 팀원끼리 best practice를 차출하여 병합하는것이였다.

- #### 코드 리뷰

  최소한 파일트리는 맞춰야 하기 때문에 각자 코드를 설명하는 시간을 가졌다.  
  도저히 납득할 수 없는 코드도 있었고, 훌륭한 코드도 있었다.

  하지만 병합이 불가능한 수준으로 전부 다 다른 구조를 지니고 있었기 때문에  
  **기술스택이 다 겹치는 한 분의 코드를 클론**하여 각자 기능 개선을 하는 형식으로 구현했다.

- #### 리팩토링

  각자의 스타일이 확고하기도 하여 결국 또 병합을 할 수 없을 수준으로 많이 달라졌다.

  그중에서 가장 코드의 변화가 적은 한분의 PR을 merge 시켜 다시 리팩토링을 하는 형식으로 진행되었다.

- #### 나의 Best Practice

  todo-list의 수정 기능을 개선하였다.  
  입력한 todo의 값이 기존의 todo의 값과 같다면 수정하지 않은걸로 간주하여 불필요한 api 통신 방지하도록 구현했다.

## 배운점

### Readme의 중요성

그동안 readme를 전혀 작성하지 않았었다.  
 readme보단 자신이 만든 포트폴리오를 보는것이 더 효과적이라 생각했다.

하지만 이는 큰 착각이자 오만이였다.

바쁜 회사일수록 아무런 명세도 없는 의미불명의 포트폴리오를 일일이 살펴보는 기업은 없을것이다.

### 반성

- #### 파일 트리

  팀원들의 파일 트리를 보고 배울점을 느꼈다.

  내가 만든 todo-list의 폴더 구조는 매우 단순하다.  
  단순한 만큼 직관적이기도 했지만, 규모가 커지는 프로젝트일수록 관리가 힘들어지는 구조이다.

  팀원들의 파일 트리는 단순하지 않았다.  
  매우 복잡하게 나뉘어진 파일 트리도 있었지만, 견고하다고 느껴질만한 파일트리도 많았다.

- #### Github 이해도

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
  그렇기에 git의 컨벤션 역시 중요하게 생각하지 않았다.

  그 결과 팀원들간의 회의시간에 organization, pr, merge, 스쿼시 등의 git과 관련된 얘기가 나왔을때 이해조차 할 수 없었다.

  남에게 민폐끼치고 싶지 않은 마음과 인정 욕구가 심한 나에게 있어 너무 굴욕적인 상황이였다.  
  그 굴욕을 원동력 삼아 중간에 코로나에 걸렸음에도 열심히 공부했다.
