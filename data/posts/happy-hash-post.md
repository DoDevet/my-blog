Next.js Page Router + Typescript

## 소개

해시태그를 그룹화 하여 참여할 수 있는 커뮤니티 사이트.  
SMS 인증 로그인 방식은 현재 닫아놓은 상태이며  
Guide 페이지는 SSG를 통해 구현.

DB

- Prisma ORM
- Mysql
- planet scale

스타일

- tailwind css, sass(gray matter style 용)

라이브러리

- heroicons
- gray matter
- next-themes

[배포](https://happy-hash-wine.vercel.app/)  
[깃허브](https://github.com/DoDevet/happy-hash)

파일 구조 :

- ```bash
   📦libs
   ┣ 📂client >> 클라이언트 훅
   ┗ 📂server >> 서버 훅

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

## Declarative

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

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
