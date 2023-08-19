## 2주차

2주차에는 과제가 없던 대신 1주차 과제의 피드백과 수업이 있었다.

## 과제 피드백

클린코드 피드백 중 **하나의 함수에서는 하나의 일만 구현해야 한다** 라는 피드백과 그 예시에 의문을 느꼈다.

로그인과 로그아웃 기능 둘 다 동일한 form을 사용하고 있고, **중복을 최소화 하는것도 클린코드**로 알고있다.

게다가 나는 API 호출 자체를 간편하게 사용할 수 있도록 useMutation이라는 custom hook을 만들었다.  
로그인, 로그아웃 뿐만 아니라 전반적인 create update delete 기능들을 하나의 함수에서 처리할 수 있게 하였는데  
내가 **하나의 일** 에 대한 해석을 잘못한 것인지, 클린코드에 예외사항이 있는건지 궁금해졌다.

여유가 된다면 클린코드 책을 구매해 내가 어느것을 놓치고 있는지 알아봐야 겠다는 생각이 들었다.

## 수업

- ### 렌더링 최적화

  리액트는 state가 변할 경우 해당 컴포넌트와 하위의 컴포넌트들을 모두 리렌더링 한다.  
   크게 4단계를 거치게 된다.

  1. 기존 컴포넌트의 UI를 재사용할 지 확인한다.
  2. 함수 컴포넌트: 컴포넌트 함수를 호출한다 / Class 컴포넌트: `render` 메소드를 호출한다.
  3. 2의 결과를 통해서 새로운 VirtualDOM을 생성한다.
  4. 이전의 VirtualDOM과 새로운 VirtualDOM을 비교해서 실제 변경된 부분만 DOM에 적용한다.

  해당 수업에서는 **기존 컴포넌트의 UI를 재사용할 수 있는가** 에 대한 렌더링 최적화에 대해 집중적으로 다뤘다.

- ### React.memo

  React.memo로 감싸진 컴포넌트의 경우에는 상위 컴포넌트가 리렌더링 될 경우 무조건 리렌더링 되는 것이 아니라 컴포넌트의 이전의 Props와 다음 렌더링 때 사용될 Props를 비교해서 차이가 있을 경우에만 리렌더링을 수행한다.

  만약 차이가 없다면 리렌더링을 수행하지 않고 기존의 렌더링 결과를 재사용한다.  
  이를 통해 컴포넌트에서 불필요하게 리렌더링이 되는 경우를 막을 수 있다.

  React.memo는 기본적으로 props의 변화를 이전 prop와 새로운 prop를 각각 **shallow compare** 해서 판단한다.

  비교 로직을 커스텀 하고싶다면 **React memo의 두번째 인자**로 커스텀 함수를 넘겨주면 된다.  
  해당 함수는 첫번째 인자로 이전의 props, 두번째 인자로 다음의 props를 받으며 return 값이 true일때 이전 결과를 재사용한다.

  참고로 매번 렌더링시 function이나 object는 다시 생성된다.  
  **shallow compare** 특성과 렌더링 방식을 알고 사용해야 잘못된 사용을 피할수 있다.

- ### useMemo

  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

  useMemo는 리액트에서 값을 memoization 할 수 있도록 해주는 함수다.

  첫번째 인자는 콜백함수이며 이 함수에서 리턴하는 값이 메모된다.  
  두번째 인자는 의존성 배열로, 의존성 배열에 있는 값 중 하나라도 이전 렌더링과 비교했을 때 변경되었다면 메모된 값을 활용하는 것이 아니라 새로운 값을 다시 계산한다.

- ### useCallback

  ```jsx
  const memorizedFunction = useMemo(() => () => console.log("Hello World"), []);
  const memorizedFunction = useCallback(() => console.log("Hello World"), []);
  ```

  useCallback은 useMemo를 조금 더 편리하게 사용할 수 있도록 만든 버전이다.  
  함수의 경우에는 useMemo를 사용해서 메모하게 되면 콜백함수에서 또다른 함수를 리턴하는 형태가 되는데 이게 영 보기 좋지 않다.

- ### useEffect

  **의존성 배열**

  - useEffect에 두번째 인자로 넘기는 배열.
  - 두번째 인자를 넘기지 않으면 Effect는 매번 실행되고, 빈 배열을 넘긴다면 컴포넌트의 첫번째 렌더링 이후에만 실행.
  - 모든 의존성을 빼먹지 말고 의존성 배열에 명시해라
  - 가능하다면 의존성을 적게 만들어라

  간단한 일반 변수, state, props의 경우에는 의존성을 빼먹지 않고 의존성 배열에 명시하기가 쉽다.  
  다만, useEffect는 사용에 따라 함수나 object를 의존성 배열에 넣을때도 있다.  
  함수나 Object 같은 경우 리렌더링 되는 경우에 다시 만들어지는데  
  이때 의존성 배열의 값이 계속해서 변경하게 되면서 무한루프에 빠질때가 있다.

  이를 위한 솔루션은

  1. 메모이제이션 활용
  2. useEffect 내부에 함수 선언
  3. 함수를 컴포넌트 바깥에 선언

  등이 있다.

- ### Context API

  React에서 제공하는 내장 API로서 컴포넌트들에게 동일한 Context를 전달하는데 사용할 수 있다.  
   일반적으로 리액트에서 데이터를 전달하는 방식은 부모 컴포넌트에서 자식 컴포넌트 방향으로만 데이터를 전달할 수 있다.(단방향성)

  단방향성은 애플리케이션의 안정성을 높이고 흐름을 단순화 하는데 유용하지만 Props Driling의 문제가 있다.  
   컴포넌트의 구조를 잘 설계하고 합성을 적극적으로 활용해 데이터를 계속해서 넘겨줘야 하는 상황을 안만드는 것이 가장 좋겠지만 그러지 못할때엔 Context API를 사용한다.

  #### createContext

  Context API를 사용하기 위해서는 먼저 공유할 Context를 만들어줘야 한다.  
   Context는 createContext 라는 함수를 통해서 사용할 수 있다.

  ```jsx
  const UserContext = createContext(null);
  ```

  defaultValue는 Context Value의 초기값이 아닌, 다른 컴포넌트에서 Context에 접근하려고 하지만 Provider로 감싸져 있지 않은 상황에서 사용될 값을 의미한다.

  #### Provider

  만들어진 Context를 통해서 특정한 값을 전달하기 위해서는 Provider 컴포넌트를 이용해야 한다.

  Context 객체에는 Provider라는 프로퍼티가 있으며 이는 리액트 컴포넌트다.

  Provider 컴포넌트는 value라는 props을 가지고 있으며, value에 할당된 값을 Provider 컴포넌트 하위에 있는 어떤 컴포넌트든 접근할 수 있게 해주는 기능을 가지고 있다.

  ```jsx
  const UserContext = createContext(null);
  const user = { name: "yeonuk" };

  <UserContext.Provider value={user}>
    <Child />
  </UserContext.Provider>;
  ```

  #### useContext

  함수 컴포넌트에서는 useContext라는 내장 Hook을 이용해 Context Value에 접근할 수 있다.

  ```jsx
  const UserContext = createContext(null);

  const user = { name: "yeonuk" };

  <UserContext.Provider value={user}>
    <Child />
  </UserContext.Provider>;

  function Child() {
    const user = useContext(UserContext);

    return <h1>{user.name}</h1>;
  }
  ```

## 후기

개인 프로젝트에 자주 써왔던 익숙한 기능들을 심층있게 다뤄 유익함을 느꼈고,  
좋은 예시들을 보며 많은걸 배울수 있었다.
