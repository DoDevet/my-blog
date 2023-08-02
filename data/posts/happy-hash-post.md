[Github](https://github.com/DoDevet/happy-hash)  
[배포](https://happy-hash-wine.vercel.app/)

## 소개

해시태그를 그룹화 하여 참여할 수 있는 커뮤니티 사이트.  
SMS 인증 로그인 방식은 현재 닫아놓은 상태이며  
Guide 페이지는 SSG를 통해 구현.

**Next.js Page Router + Typescript**

DB

- **Planet scale**

  ![image](/images/happyhashImages/planetScale.png)

  MySQL **Compatible** serverless database platform

  - Vitess는 MySQL을 스케일링하기 위한 데이터베이스 클러스터링 시스템
  - Vitess를 기반으로 하는 관계형 데이터 베이스가 PlanetScale이다.

    **db에 브랜치를 제공**하며, 마치 **git과 같은 cli**를 제공해준다.

- **Prisma ORM**

  ![image](/images/happyhashImages/prismaSchema.png)

  DB ORM으로 데이터베이스 테이블을 객체로 취급하여 데이터베이스 작업을 추상화한다.  
  SQL 쿼리를 작성하지 않고도 데이터베이스 작업을 수행할 수 있으며  
  **타입 안정성**과 **Prisma Client가 제공하는 자동 완성과 IntelliSense** 등의 이점을 취할 수 있다.

- **Prisma ERD**
  ![image](/images/happyhashImages/happyhash-erd.svg)

스타일

- tailwind css, sass(gray matter style 용)

라이브러리

- heroicons
- gray matter
- next-themes
- **iron-session**
  - https://github.com/vvo/iron-session
  - 서명, 암호화된 쿠키를 사용하는 nodejs stateless 세션 도구
  - JWT는 암호화되지 않고 서명이 되어있음
  - 유저가 안에 있는 정보를 볼 수 없음
  - 세션을 위한 백엔드 구축이 필요 없음

파일 구조 :

- ```bash
   📦libs
   ┣ 📂client >> 클라이언트 훅
   ┗ 📂server >> 서버 훅
   📦components >> 컴포넌트
   📦pages
   ┣ 📂api
   ┃ ┣ 📂community
   ┃ ┃ ┣ 📂posts
   ┃ ┃ ┃ ┣ 📂[id]
   ┃ ┃ ┃ ┃ ┣ 📂comments
   ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
   ┃ ┃ ┃ ┃ ┣ 📜fav.ts
   ┃ ┃ ┃ ┃ ┗ 📜index.ts
   ┃ ┃ ┃ ┗ 📜index.ts
   ┃ ┃ ┗ 📜index.ts
   ┃ ┣ 📂hashs
   ┃ ┃ ┗ 📜index.ts
   ┃ ┣ 📂search
   ┃ ┃ ┗ 📜index.ts
   ┃ ┣ 📂user
   ┃ ┃ ┣ 📂me
   ┃ ┃ ┃ ┣ 📜[type].ts
   ┃ ┃ ┃ ┗ 📜index.ts
   ┃ ┃ ┣ 📜confirm.ts
   ┃ ┃ ┣ 📜login.ts
   ┃ ┃ ┗ 📜logout.ts
   ┃ ┣ 📜files.ts
   ┃ ┗ 📜ranking.ts
   ┃ ┃
   ┣ 📂community
   ┃ ┗ 📂posts
   ┃ ┃ ┣ 📂[postId]
   ┃ ┃ ┃ ┣ 📜edit.tsx
   ┃ ┃ ┃ ┗ 📜index.tsx
   ┃ ┃ ┣ 📜index.tsx
   ┃ ┃ ┗ 📜write.tsx
   ┣ 📂guide
   ┃ ┣ 📜[slug].tsx
   ┃ ┗ 📜index.tsx
   ┣ 📂profile
   ┃ ┣ 📂[type]
   ┃ ┃ ┗ 📜index.tsx
   ┃ ┣ 📜edit.tsx
   ┃ ┗ 📜index.tsx
   ┣ 📂search
   ┃ ┗ 📜index.tsx
   ┣ 📜_app.tsx
   ┣ 📜_document.tsx
   ┣ 📜index.tsx
   ┣ 📜login.tsx
   ┗ 📜test.tsx

  📦posts-guide >> Guide 페이지 md 파일
  ```

## 구현 기능

### 1. 로그인

![image](/images/posts/happy-hash.png)

SMS 로그인 방식  
이메일, 또는 폰 번호를 받는다.

로그인 버튼을 누르면 랜덤한 토큰 번호를 생성 후, 입력값을 토대로 유저 db 생성  
이후 메일 혹은 폰 번호로 토큰 number가 발송 된다.

twillo를 사용하여 테스트하였고, 금전적인 문제로 배포에선 구현하지 않았고,  
테스트에 용이하게 token 값을 전송하여 바로 채워질 수 있게 구현하였다.

```jsx
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      body: { email, phone },
    } = req;
    const user = phone ? { phone } : email ? { email } : null;
    if (user === null) return res.status(400).json({ ok: false });
    const payload = Math.floor(10000 + Math.random() * 10000) + "";

    // Prisma ORM 으로 유저 데이터 생성
    const token = await client.token.create({
      data: {
        token: payload,
        user: {
          connectOrCreate: {
            where: {
              ...user,
            },
            create: {
              name: "Anonymos",
              ...user,
            },
          },
        },
      },
    });
    return res.json({ ok: true, token: token.token });
  }
}
```

![image](/images/happyhashImages/login-1.png)
토큰값 입력시 token 테이블에서 해당 토큰을 찾는다.  
해당 토큰을 가진 유저를 찾아 session(iron session)에 저장하고 해당 유저의 토큰값을 전부 삭제한다.

```jsx
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      body: { token },
    } = req;
    const ok = await client.token.findFirst({
      where: { token },
    });
    if (!ok) return res.status(404).end();
    else {
      req.session.user = {
        id: ok.userId,
      };
      await req.session.save();
      await client.token.deleteMany({
        where: {
          userId: ok.userId,
        },
      });
      res.json({ ok: true });
    }
  }
}
```

### 2. 홈 화면

로그인 이후 홈 화면이다.  
관심있는 해시들을 모아 숏컷을 만들거나, 검색, 프로필 편집, 로그아웃 등이 가능하다.  
![image](/images/happyhashImages/home-1.png)

- 숏컷태그 GET 요청

  ```jsx
  if (req.method === "GET") {
    const {
      session: { user },
    } = req;

    const tags = await client.shortcutTag.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        hashtags: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({
      ok: true,
      tags,
    });
  }
  ```

반응형 웹, 다크모드를 지원한다.

![image](/images/happyhashImages/home-2.png)

### 3. 해시태그 등록

![image](/images/happyhashImages/apply-hash-1.png)

' + ' 버튼을 누르면 해시태그를 생성할 수 있다.

![image](/images/happyhashImages/apply-hash-2.png)
띄어쓰기, 특수기호는 생략되고, 하나의 숏컷당 최대 5개의 해시태그를 넣을 수 있다.  
해당 해시태그가 db에 존재하지 않으면 만들어지고, 있으면 숏컷 테이블과 연결한다.

- 숏컷태그 POST 요청

  ```jsx
  if (req.method === "POST") {
    const {
      session: { user },
      body: { hashs, shName },
    } = req;

    const connectHash = hashs.map((name: string) => {
      return { where: { name: name }, create: { name: name } };
    });

    const tags = await client.shortcutTag.create({
      data: {
        customName: shName ? shName : "",
        name: hashs.toString(),
        user: {
          connect: {
            id: user?.id,
          },
        },
        hashtags: {
          connectOrCreate: [...connectHash],
        },
      },
    });

    res.json({
      ok: true,
      tags,
    });
  }
  ```

![image](/images/happyhashImages/apply-hash-3.png)

Enter 버튼을 누르면 해당 숏컷들을 카테고리 형식으로 포함한 페이지로 이동한다.  
숏컷 컴포넌트 내부에 있는 해시태그를 누르면 해당 해시태그만 포함한 페이지로 이동한다.

우측 상단의 불투명한 버튼은 edit 기능으로, 누르게 되면 Edit Form이 나온다.  
![image](/images/happyhashImages/apply-hash-4.png)

삭제와 편집 기능이 존재하고, 삭제시 숏컷 테이블은 삭제되지만, 해시태그들은 삭제되지 않는다.

- 숏컷태그 PATCH 요청

  ```jsx
  if (req.method === "PATCH") {
    const {
      body: { id, hashs, shName },
    } = req;

    const prevHash = await client.shortcutTag.findUnique({
      where: {
        id: id,
      },
      select: {
        hashtags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const prevHs = prevHash?.hashtags.map((hash) => hash.name);
    const createOrConnect = hashs.filter(
      (hash: string) => !prevHs?.includes(hash)
    );
    const disconnectHash = prevHs?.filter((hash) => !hashs.includes(hash));
    await client.shortcutTag.update({
      where: {
        id: id,
      },
      data: {
        customName: shName,
        hashtags: {
          disconnect: disconnectHash
            ? disconnectHash.map((hash) => ({ name: hash }))
            : undefined,
          connectOrCreate: createOrConnect
            ? createOrConnect.map((hash: string) => ({
                where: { name: hash },
                create: { name: hash },
              }))
            : undefined,
        },
        name: hashs.toString(),
      },
    });
    res.json({ ok: true });
  }
  ```

- 숏컷태그 DELETE 요청

  ```jsx
  if (req.method === "DELETE") {
    const {
      session: { user },
      body: { id },
    } = req;

    const deleteValidate = await client.shortcutTag.findFirst({
      where: {
        AND: [{ id: id }, { user: { id: +user?.id! } }],
      },
      select: {
        hashtags: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!Boolean(deleteValidate))
      return res.json({ ok: false, error: "Validate failed" });
    const disconnectHash = deleteValidate?.hashtags?.map((hash) => ({
      id: hash.id,
    }));
    await client.shortcutTag.update({
      where: {
        id: id,
      },
      data: {
        hashtags: {
          disconnect: [...disconnectHash!],
        },
      },
    });

    await client.shortcutTag.delete({
      where: { id },
    });

    res.json({ ok: true });
  }
  ```

### 4. 검색

검색어와 관련된 해시태그나 posts를 보여준다.  
![image](/images/happyhashImages/search-1.png)

### 5. 해시태그 홈

![image](/images/happyhashImages/hash-comu-1.png)

Enter 버튼이나 해시태그를 클릭시 나오는 화면.  
글 조회, 작성, 필터링을 할 수 있다.

### 6. Post, Comment CRUD

### 7. Modal Post Detail

### 8. 반응형 웹

A paragraph with _emphasis_ and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

- Lists
- [ ] todo
- [x] done

## Component-Based

Build encapsulated components that manage their own state, then compose them to make complex UIs.

Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.

## Learn Once, Write Anywhere

We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.

React can also render on the server using Node and power mobile apps using React Native.

![React Office desk](https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)

> The most important addition in React 18 is something we hope you never have to think about: concurrency. We think this is largely true for application developers, though the story may be a bit more complicated for library maintainers.

Concurrency is not a feature, per se. It’s a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time. You can think of concurrency as an implementation detail — it’s valuable because of the features that it unlocks. React uses sophisticated techniques in its internal implementation, like priority queues and multiple buffering. But you won’t see those concepts anywhere in our public APIs.

When we design APIs, we try to hide implementation details from developers. As a React developer, you focus on what you want the user experience to look like, and React handles how to deliver that experience. So we don’t expect React developers to know how concurrency works under the hood.

However, Concurrent React is more important than a typical implementation detail — it’s a foundational update to React’s core rendering model. So while it’s not super important to know how concurrency works, it may be worth knowing what it is at a high level.

A key property of Concurrent React is that rendering is interruptible. When you first upgrade to React 18, before adding any concurrent features, updates are rendered the same as in previous versions of React — in a single, uninterrupted, synchronous transaction. With synchronous rendering, once an update starts rendering, nothing can interrupt it until the user can see the result on screen.

In a concurrent render, this is not always the case. React may start rendering an update, pause in the middle, then continue later. It may even abandon an in-progress render altogether. React guarantees that the UI will appear consistent even if a render is interrupted. To do this, it waits to perform DOM mutations until the end, once the entire tree has been evaluated. With this capability, React can prepare new screens in the background without blocking the main thread. This means the UI can respond immediately to user input even if it’s in the middle of a large rendering task, creating a fluid user experience.

Another example is reusable state. Concurrent React can remove sections of the UI from the screen, then add them back later while reusing the previous state. For example, when a user tabs away from a screen and back, React should be able to restore the previous screen in the same state it was in before. In an upcoming minor, we’re planning to add a new component called `<Offscreen>` that implements this pattern. Similarly, you’ll be able to use Offscreen to prepare new UI in the background so that it’s ready before the user reveals it.

Concurrent rendering is a powerful new tool in React and most of our new features are built to take advantage of it, including Suspense, transitions, and streaming server rendering. But React 18 is just the beginning of what we aim to build on this new foundation.
