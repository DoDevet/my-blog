[Github](https://github.com/DoDevet/happy-hash)  
[배포](https://happy-hash-wine.vercel.app/)

## 소개

해시태그를 그룹화 하여 참여할 수 있는 커뮤니티 사이트.  
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

파일 업로드 스토리지

- Cloudflare Image

스타일

- tailwind css, sass(gray matter style 용)

hook

- useSWR
- react-hook-form
- useMutation (커스텀 훅)

전역관리

- Recoil

라이브러리

- heroicons
- gray matter
- next-themes
- Framer
- **iron-session**
  - https://github.com/vvo/iron-session
  - 서명, 암호화된 쿠키를 사용하는 nodejs stateless 세션 도구
  - JWT는 암호화되지 않고 서명이 되어있음
  - 유저가 안에 있는 정보를 볼 수 없음
  - 세션을 위한 백엔드 구축이 필요 없음

파일 구조

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

twillo 서비스를 사용하여 테스트 하였으나 금전적인 문제로 배포에선 구현하지 않았다  
대신 테스트에 용이하게 token 값을 전송하여 input에 바로 채워질 수 있도록 구현하였다.

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
Create와 Edit은 서로 컴포넌트를 공유한다.

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

scroll 이벤트를 사용하여 무한 스크롤 구현  
데이터 페칭(로딩시) 추가 요청을 하지 않게 throttle 최적화를 해주었다.

![image](/images/happyhashImages/hash-comu-2.png)

하단의 별 표시는 필터링으로 게시글의 좋아요 갯수, 조회수, 댓글 수를 필터링 할 수 있는 옵션을 제공한다.  
좋아요 개수만 필터링 하도록 세팅하였으며, 기본 세팅은 10으로 되어있다.  
해당 기능은 state로 관리되어 페이지를 새로고침 하면 초기화 된다.

### 6. Post

- #### 1. Create

  ![image](/images/happyhashImages/post-crud-1.png)

  홈에서 pencil 아이콘을 누르면 글쓰기 form이 열린다.  
   앨범 아이콘을 클릭하면 이미지를 업로드 한다.

  이미지, 30자 이상의 제목, 내용을 작성해야 하며 하단의 해시태그 리스트는 커뮤니티에 입장할때 state로 제공된다.  
   만약 새로고침 등의 이유로 state가 존재하지 않을시에는 url상에 query로 존재하는 숏컷 해시태그(혹은 단일 해시태그)의 id를 api 요청을 통해서 해당 영역을 채운다.

  ```jsx
  // /api/community/index.ts
  async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const {
      session: { user },
      query: { comuId, hashId },
    } = req;
    if (comuId) {
      // 숏컷 해시태그의 id, 숏컷 해시태그는 편의상 community로 명칭합니다.
      const scHash = await client.shortcutTag.findFirst({
        where: { AND: [{ id: +comuId! }, { userId: +user?.id! }] },
        select: {
          userId: true,
          customName: true,
          hashtags: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      if (!scHash || user?.id !== scHash?.userId) {
        return res.json({ ok: false, error: "Nope" });
      }
      return res.json({
        ok: true,
        hashArr: scHash.hashtags,
        title: scHash.customName,
      });
    }
    if (hashId) {
      const hashArr = await client.hashtag.findUnique({
        where: { id: hashId ? +hashId : undefined },
        select: { name: true, id: true },
      });
      if (!hashArr) {
        return res.status(401).send("BAD REQUEST");
      }
      return res.json({
        ok: true,
        hashArr: [{ name: hashArr.name, id: hashArr.id }],
      });
    }
  }
  }
  ```

  클라이언트 호출

  ```jsx
  //client 호출 훅, 단일 해시태그는 url query에 hashId, 숏컷 해시태그는 comuId가 제공됩니다.
  export default function getHashTags({
    comuId,
    hashId,
  }: GetHashForm): IComuHashsInfo[] {
    const hash = useRecoilValue(comuHashsInfo);
    if (hash && hash.length !== 0) {
      return hash;
    }
    const { data } = useSWR(
      comuId
        ? `/api/community?comuId=${comuId}`
        : hashId
        ? `/api/community?hashId=${hashId}`
        : null
    );

    return data?.hashArr;
  }
  ```

  **이미지 업로드**는 **Cloudflare Images** 를 사용하여 구현.  
   해당 서비스가 제공하는 API 중 **Direct Creator Upload** API는  
   이미지를 업로드할 API 주소를 요청하고 받은 주소에 formdata를 넘겨주면  
   파일을 서버에 경유할 필요 없이 바로 storage에 파일 업로드를 가능하게 해준다.  
   https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload/

  **Direct URL 요청**

  ```jsx
  // /api/files.ts
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
      result: { uploadURL, id },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CF_TOKEN}`,
          },
        }
      )
    ).json();
    res.json({ uploadURL });
  }
  ```

  **Upload Image**

  ```jsx
  const { uploadURL } = await (await fetch("/api/files")).json();

  // Ajax로 form 전송을 가능하게 해주는 FormData 객체를 생성
  const form = new FormData();
  // append(name, value, filename)
  form.append("file", image[0], `post-${user?.id}-${Date.now()}`);
  const {
    result: { id }, //이 id 값이 업로드 된 후 Cloudfalre Storage에 저장된 이미지 경로이다.
  } = await (
    await fetch(uploadURL, {
      method: "POST",
      body: form,
    })
  ).json();
  // 해당 경로는 post db에 생성 요청시 image 속성에 반영한다.
  postMutation({
    title,
    payload,
    selectedHash: selectedHash?.name,
    imageURL: id,
    postId,
  });
  ```

- #### 2. Read

  ![image](/images/happyhashImages/post-crud-2.png)  
  글을 클릭시 조회수가 1 증가하며, 글의 내용과 댓글을 조회할 수 있다.  
  세션에 저장되어 있는 유저의 id와 해당 글의 유저id가 같다면 자신이 작성한것으로 간주  
  우측 최상단에 ellipsis 아이콘을 보여준다.

- #### 3. Update

  ![image](/images/happyhashImages/post-crud-3.png)

  해당 글이 자신이 작성한 글이라면 edit과 delete를 할 수 있다.  
  edit과 write는 서로 컴포넌트를 공유한다.

  ![image](/images/happyhashImages/post-crud-4.png)

  edit 클릭시 해당 post의 제목, 내용, 이미지 링크를 props로 전달받아 바로 반영될 수 있도록 구현.  
  image Preview라는 state를 따로 만들어 이미지를 교체하지 않았을때를 구분할 수 있도록 구현하여 불필요한 이미지 업로드 호출을 막았다.

  이미지 교체 및 삭제시 Cloudfalre Storage에서 삭제될 수 있게 처리하였다.

  ```jsx
    // api/community/posts/[id]
  if (req.method === "PATCH") {
    const {
      session: { user },
      body: { imageURL, payload, title, selectedHash },
      query: { id },
    } = req;

    const prevPostData = await client.post.findUnique({
      where: { id: +id! },
    });
    if (prevPostData && prevPostData.userId !== +user?.id!) {
      return res.json({ ok: false, error: "InValidate" });
    }
    if (!imageURL) {
      await client.post.update({
        where: {
          id: +id!,
        },
        data: {
          payload,
          title,
          hashtag: { connect: { name: selectedHash } },
        },
      });
    } else {
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/${prevPostData?.image}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.CF_TOKEN}`,
          },
        }
      );
      await client.post.update({
        where: {
          id: +id!,
        },
        data: {
          payload,
          title,
          hashtag: { connect: { name: selectedHash } },
          image: imageURL,
        },
      });
    }
    res.json({ ok: true, postId: +id! });
  }
  ```

- #### 4. Delete

  ![image](/images/happyhashImages/post-crud-4.png)

  useSWR의 mutate 기능을 활용하여 캐시를 통해 해당 PostFeed를 불러온 데이터를 즉시 삭제하고  
  요청의 결과는 기다리지 않고 숏컷해시 홈으로 replace 요청을 보낸다.

  ```jsx
  //useMutation hook, /libs/client/useMutation.ts

    const [deletePost, { data: deleteResponse, loading: DeleteLoading }] =
    useMutation<DeleteMutation>({
      url: `/api/community/posts/${postId}`,
      method: "DELETE",
    });
  //삭제 이벤트
  const onDeleteValid = () => {
    if (DeleteLoading) return;

    // 캐시데이터를 건드려 즉각적으로 삭제된
    mutate((prev) => {
      return (
        prev &&
        prev.map((prev) => {
          return {
            ok: true,
            posts: prev.posts.filter((post) => post.id !== +postId!),
          };
        })
      );
    }, false);
    deletePost({}); // 삭제 요청
    setPostMenu((prev) => !prev); //modal 닫기

    // 해시 커뮤니티 홈으로 replace
    router.replace(
      `/community/posts?${comuId ? `comuId=${comuId}` : `hashId=${hashId}`}`,
      undefined,
      { scroll: false, shallow: true }
    );
  };
  ```

### 7. Post Detail

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
