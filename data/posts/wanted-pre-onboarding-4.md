## 4주차 과제

4주차 과제는 팀 프로젝트가 아닌 개인 과제로 구성되었다.

### 목표

- 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

### 참고자료

- API 레파지토리
  - https://github.com/walking-sunset/assignment-api

### 구현 목표

- [한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색영역을 클론하기

- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

  ![Untitled](/images/wanted/wanted-pre-onboarding-4_1.png)

  - 검색어가 없을 시 “검색어 없음” 표출

- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
  - expire time을 구현할 경우 가산점
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  - README에 전략에 대한 설명 기술
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
  - 사용법 README에 기술

### 개발 조건 및 환경

- 기간: 7월 16일(일) 12:00 ~ 7월 19일(수) 24:00
- 언어 : JavaScript / TypeScript
- 사용가능한 기술:

  - 전역 상태 관리 툴(필수 사용 X, 필요 시 사용)
  - 스타일 관련 라이브러리(styled-components, emotion, UI kit, tailwind, antd 등)
  - HTTP Client(axios 등)
  - 라우팅 관련 라이브러리(react-router-dom)

## 조사

클론하는 사이트 검색엔진을 조사해봤다.

네트워크 창을 분석한 결과 **API 호출은 글자가 입력되는 대로 호출하기보단 어느정도 텀**이 있었다.

천천히 한글자씩 타이핑 해보니 입력하는대로 API를 호출하는것을 보고 한글 자체에 최적화 기술은 없다는것을 확인했고  
**setInterval 함수를 통해 딜레이를 걸어 호출**하는 식으로 구성했다.

## 구현

[Github 링크](https://github.com/DoDevet/pre-onboarding-11th-4-5)

캐시데이터 기능을 위해 값을 기억할때 자주 사용한 **localstorage**를 사용했고  
expire time을 지원하지 않는 관계로 내부에 expire_time 변수를 만들어 관리하는 식으로 구현해보았다.

Context API를 사용할 필요 없이 매우 간단하고 빠르게 기능을 구현할 수 있었지만  
expire time을 체크하고 이를 비우는 기능은 **자신이 만든 검색엔진 사이트에서만 제공**하기 때문에  
검색을 이용한 사용자는 최소한 **마지막 캐시데이터는 영구적으로 브라우저에 남게 된다는점**이 문제였다.

구현까지 시간이 오래걸리지 않아 **캐시데이터는 state로 관리하고, Context API를 통해서 제공**하는 식으로 다시 만들어보았다.

- ### 캐싱

  Cache를 다루는 Context를 생성하여 구현.

  캐시데이터 구조는 object 형식

  ```bash
  {
    "test2": {  # 키워드
        "data": [], # 키워드에 대한 결과
        "expire": 1689749294835 # expire time
    },
    "test1": {
        "data": [],
        "expire": 1689749296800
    },
    "test4": {
        "data": [],
        "expire": 1689749297900
    },
    "test3": {
        "data": [],
        "expire": 1689749298942
    },
    "test6": {
        "data": [],
        "expire": 1689749299912
    }
  }
  ```

  - 캐시 저장

    ```jsx
    const setCacheData = useCallback((data: ISearchData[], keyword: string) => {
      setCache((prev) => {
        return {
          ...prev,
          [keyword]: { data, expire: Date.now() + EXPIRE_TIME },
        };
      });
    }, []);
    ```

    API 호출을 통해 얻은 data와 keyword를 매개변수로 받아 keyword를 키값으로 하여 저장한다.

  - 캐시 호출

    ```jsx
    const getCacheData = useCallback(
      (keyword: string) => {
        if (cache) return cache[keyword]?.data;
      },
      [cache]
    );
    ```

    keyword를 입력하면 캐시에 있는 data(관련 검색어 모음)을 return 한다.

  - Expire time

    ```jsx
    useEffect(() => {
      const handleCleanCache = (cache?: IGetSearchCache) => {
        if (cache && Object.keys(cache).length !== 0) {
          const keys = Object.keys(cache).filter(
            (key) => cache[key].expire < Date.now()
          );
          // Expire 데이터들의 키를 수집함
          if (keys.length !== 0) {
            // 캐시 데이터 삭제
            setCache((prev) => {
              const copyObj = { ...prev }; # 불변성
              keys.forEach((key) => delete copyObj[key]);
              return copyObj;
            });
          }
        }
      };
      const interval = setInterval(() => handleCleanCache(cache), 1000); // 매 1초마다 실행
      return () => clearInterval(interval);
    }, [cache]);
    ```

    매 1초마다 expire를 체크하여 해당 캐시데이터를 지우는 훅을 호출한다.

  - Context Provider

    ```jsx
    const GetCacheItem = createContext<{
    (keyword: string): ISearchData[] | undefined;
    } | null>(null);
    const SetCacheItem = createContext<{
    (data: ISearchData[], keyword: string): void;
    } | null>(null);

    const EXPIRE_TIME = 10000;
    export const useGetCache = () => useContext(GetCacheItem);
    export const useSetCache = () => useContext(SetCacheItem);

    const CacheProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
        const [cache, setCache] = useState<IGetSearchCache>();
        const setCacheData = useCallback((data: ISearchData[], keyword: string) => {
                setCache((prev) => {
                    return { ...prev, [keyword]: { data, expire: Date.now() + EXPIRE_TIME } };
                });
        }, []);
        const getCacheData = useCallback(
            (keyword: string) => {
            if (cache) return cache[keyword]?.data;
            },
            [cache]
        );

        useEffect(() => {
            const handleCleanCache = (cache?: IGetSearchCache) => {
            if (cache && Object.keys(cache).length !== 0) {
                const keys = Object.keys(cache).filter(
                (key) => cache[key].expire < Date.now()
                );
                if (keys.length !== 0) {
                console.log("Delete Keys: ", keys);
                setCache((prev) => {
                    const copyObj = { ...prev };
                    keys.forEach((key) => delete copyObj[key]);
                    return copyObj;
                });
                }
            }
            };
            const interval = setInterval(() => handleCleanCache(cache), 1000);
            return () => clearInterval(interval);
        }, [cache]);

        return (
            <SetCacheItem.Provider value={setCacheData}>
            <GetCacheItem.Provider value={getCacheData}>
                {children}
            </GetCacheItem.Provider>
            </SetCacheItem.Provider>
        );
    };
    ```

    Provider의 적용은 index.tsx에서 하였다.

- ### API 호출(useQuery)

  ```jsx
  const DB_URL = "http://localhost:4000/";

  interface useQueryProps {
    keyword: string;
  }

  const useQuery = ({ keyword = "" }: useQueryProps) => {
    const [state, setState] =
      useState <
      IStateProps >
      {
        data: undefined,
        error: undefined,
        loading: true,
      };
    const setCache = useSetCache(); // 캐시 set
    const getCache = useGetCache(); // 캐시 get

    useEffect(() => {
      const data = getCache ? getCache(keyword) : null;
      const handler = () => {
        if (data) setState((prev) => ({ ...prev, data })); // 캐시 데이터가 존재하면 호출하지 않고 그 데이터로 설정함.
        if (keyword === "") setState((prev) => ({ ...prev, data: undefined })); // 키워드가 없다면 호출하지 않음
        if (keyword !== "" && !data && setCache) {
          // 키워드가 존재하고 캐시데이터가 없다면 호출 시작
          console.log("calling api");
          setState((prev) => ({ ...prev, loading: true }));
          fetch(DB_URL + `sick?q=${keyword}`)
            .then((res) => res.json())
            .catch((e) => setState((prev) => ({ ...prev, error: e })))
            .then((data) => {
              setState((prev) => ({ ...prev, data }));
              setCache(data, keyword); // 캐시에 저장
              return data;
            })
            .catch((e) => setState((prev) => ({ ...prev, error: e })))
            .finally(() => setState((prev) => ({ ...prev, loading: false })));
        }
      };
      handler();
    }, [keyword, setCache, getCache]);
    return { ...state };
  };

  export default useQuery;
  ```

  API 호출을 위한 hook이다.

  의존성 배열을 줄이기 위해 useEffect 내부에 함수를 구현하였다.  
  또, setCache와 getCache는 useCallback으로 동등성 보장을 하였으므로 state값이 변경되어도 문제가 없다.

  지금와서 돌이켜보니 호출 훅의 네이밍 센스가 처참하다는걸 느낀다.

- ### API 호출 최적화

  ```jsx
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data, loading } = useQuery({ keyword });
  useEffect(() => {
    return () => clearInterval(interval);
    const interval = setInterval(() => setKeyword(input), DELAY);
  }, [input]);
  ```

  api 호출훅에 keyword를 넘기기 전에 0.5초의 딜레이를 주었다.

- ### 키보드 이동

  input에 한글을 작성한 뒤 버튼을 누르게 되면 버튼이 두번 동작하게 되는데  
  이를 방지하기 위해 isComposing 옵션으로 필터링 하였다.

  단순히 highlight 하는 기능이라면 쉬웠지만, 구글 검색창처럼 키워드 자체가 변했으면 좋겠다는 생각을 하게 되었다.  
  다만 API 호출에 날리는 keyword가 변경되면 키보드 버튼 액션도중 검색어 목록이 갱신될 수 있으므로 listInfo 라는 state를 만들었고  
  input 태그의 value값은 listInfo를 우선시 하도록 설정함으로써 비슷하게 구현을 할 수 있었다.

  data list들은 a태그로 매핑했기에 버튼 이벤트가 발생하게 되면 a태그의 innerText를 가져와 저장하는 식으로 구현하게 되었다.

  ```jsx
  const onKeyControl = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (divRef && divRef.current && data && data.length !== 0) {
      if (e.code === "ArrowDown") {
        setSearchListNum((prev) => prev + 1);
      }
      if (e.code === "ArrowUp") {
        if (searchListNum === -1) setSearchListNum(data.length - 1);
        else setSearchListNum((prev) => prev - 1);
      }
      if (e.code === "Enter") {
        if (listInfo) setInput(listInfo);
        setListInfo("");
        return;
      }
    }
  };

  useEffect(() => {
    const ControlKey = () => {
      if (data?.length && divRef && divRef.current) {
        let nodes = divRef.current.querySelectorAll("a");
        if (nodes[searchListNum]) {
          setListInfo(nodes[searchListNum].innerText);
        } else {
          setSearchListNum(-1);
          setListInfo("");
        }
      }
    };
    ControlKey();
  }, [data, divRef, searchListNum]);
  ```

## 반성

- ### 잘못된 useRef 사용

  Container가 되는 div 태그에 useRef를 달고, 해당 ref를 기준으로 내부에 있는 a 태그들을 골라내었는데  
  굳이 ref를 사용하지 않아도 DOM에 접근하여 꺼내올 수 있다.

- ### API 호출 훅 이름

  **GraqhQL에서 제공하는 useQuery**, **Next.js에서 비슷한 기능을 하는 useSWR**은 보통 GET 요청을 처리할때 쓰인다.  
  두 라이브러리를 많이 애용해왔기 때문에 GET요청을 하는 훅을 만들때엔 useQuery라고 작명해버리는 나쁜 습관이 생겨버렸다.

  나머지 HTTP Method 들에 대한 처리도 마찬가지로 useMutation으로 작성해버리고 만다.

  공통 훅으로 사용할것이 아니기 때문에 이름을 제대로 지정해야 한다.

- ### Context

  createContext를 만들때 getter, setter를 명시하여 두 함수를 한번에 전달하는 방식으로 구축했으면  
  좀 더 깔끔한 코드가 나오지 않았을까 하는 아쉬움이 있다.

  또, Context API를 API 호출에만 사용하였다.  
  App.tsx는 컴포넌트화가 제대로 되지 않아 매우 지저분한 코드가 나왔다.

## 후기

내가 만든 프로젝트에서는 검색어 자동완성 기능이 구현되지 않았다.  
검색 자동완성 서비스는 매우 복잡한 최적화 과정을 거친 결과물일 것이라는 선입견 때문이였다.

막상 과제로 주어지고 나니 그냥 입력할때마다 API 호출을 보내는 단순한 방식이라는것을 알게 되었다.  
물론 딜레이나 캐시데이터 등으로 사이트마다 나름의 디테일한 최적화 방식은 있겠지만...

이번 과제를 마지막으로 4주동안 진행했던 프리온보딩 인턴십 과정이 끝났다.

동료학습의 과정을 통해 많은 영감을 얻을 수 있었고  
다른 팀원들의 코드나 깃허브등을 보면서 나의 미숙한 점을 많이 알게 되었다.

인턴십 과정이 없었다면 이 블로그 조차도, 글의 내용들도 단순한 프로젝트로써 남았을 것이다.
