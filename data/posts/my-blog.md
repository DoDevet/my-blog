[Github](https://github.com/DoDevet/my-blog)

스타일링:

- tailwind css

사용 라이브러리:

- react-icons
- react-markdown
- react-syntax-highlighter
- remark-gfm
- react-multi-carousel
- next-themes
- nodemailer

## Page Router와의 차이점

Page Router로 만든 happy-hash 프로젝트와 많은 차이점이 있었다.

1. 서버 컴포넌트

- Page Router에서는 페이지 단위로 렌더링이 되지만, App Router에선 컴포넌트 단위로 렌더링 된다.
- 서버 컴포넌트는 js 번들링 사이즈를 줄이는데 효과적이며, 컴포넌트 단위로 구분이 되기에 사용하기 용이해졌다.
- 서버측과 클라이언트측에서 처리해주어야 하는 일들을 명확히 구분해야 한다.

2. Routing 방식

- App Router에서 Route를 추가하려면 폴더를 생성해야 한다.
- api 는 폴더 생성후 route.tsx를 만들어 Method 별 기능을 구현하도록 변경되었다.

3. route 구성요소

- 404, loading, error, layout 등 개발에 필요한 것들을 쉽게 만들 수 있게 되었다.

4. SSR, ISR, SSG 적용

- Page Router에서는 각 페이지별로 설정해주어야 했다.
- App Router에서는 fetch로 데이터 요청시 cache 옵션에 따라 변경됨.

## 구현 기능

1. 다크모드
   ![image](/images/blogImages/darkmode-2.png)
   ![image](/images/blogImages/darkmode-1.png)
   우측 상단 아이콘을 눌러 테마 변경 가능

2. 반응형 웹 디자인.  
   `tailwind css`를 통해 쉽게 구현할 수 있었다.  
   크기에 따라 보여지는 Posts의 갯수도 조절하였다.

   - Full screen
     ![image](/images/blogImages/responsive-web-1.png)
   - md size screen  
     사라진 header는 메뉴 아이콘이 대체한다.
     ![image](/images/blogImages/responsive-web-2.png)

3. CarouselPosts
   ![image](/images/blogImages/carousel.png)
   `react-multi-carousel` 라이브러리를 사용하여 만들었다.
   click 이벤트가 있기에 최상단에 'use client' 를 적어주어야 한다.

4. Post Categories
   ![image](/images/blogImages/categories.png)

   state로 filtering을 하게 되면 브라우저 이동시 기존값을 기억하지 못하고  
   카테고리별 SEO를 적용할 수 없어 중첩 Layout를 통해 구현해보았다.

   중첩 레이아웃이 되어 Post Detail Page에선 보여지지 않도록 hidden 옵션을 사용했는데  
   이게 과연 좋은 접근인지는 잘 모르겠다.

5. Post Navigation
   ![image](/images/blogImages/post-navi.png)

   PostDetail 페이지의 하단에 prev Post, next Post navigation을 구현하였다.

## 후기

[디자인을 참고한 블로그](https://www.craftz.dog/)  
[카테고리 구현에 아이디어를 준 블로그](https://www.braydoncoyer.dev/)

렌더링 기준이 변경되어 서버측에서 처리해야할 로직들을 좀 더 구체적으로 구분해야할 필요성을 느꼈다.

happy hash 프로젝트에선 SEO 최적화와 markdown 작성을 제대로 하지 않았었다.  
원티드 프리온보딩 인턴십에서 동료학습을 통해 좋은 markdown 라이브러리를 알게 되었고,  
블로그 프로젝트 특성상 정적인 웹페이지를 제공하기 때문에 SSG와 SEO도 적절하게 잘 활용하게 된거 같아 만족스럽다.

이번 프로젝트의 경험으로 기능, 디자인적으로 많은것을 배웠고, 기존 프로젝트들의 보완점들을 느끼게 되었다.
