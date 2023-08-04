# Next.js Blog

**Next.js 13v App router + Typescript** 로 만든 블로그

스타일:

- tailwind css

사용 라이브러리:

- react-icons
- react-markdown
- react-syntax-highlighter
- remark-gfm
- react-multi-carousel
- next-themes
- nodemailer

파일 구조 :

```
     data
    ┣ posts << 각종 md file
    ┗ posts.json << Posts 정보
    src
     ┣ app
     ┃ ┣ about
     ┃ ┣ api
     ┃ ┃ ┗ contact
     ┃ ┣ contact
     ┃ ┣ posts
     ┃ ┃ ┣ [slug]
     ┃ ┃ ┃ ┗ page.tsx
     ┃ ┃ ┣ categories
     ┃ ┃ ┃ ┗ [slug]
     ┃ ┃ ┃ ┃ ┗ page.tsx
     ┃ ┃ ┣ layout.tsx
     ┃ ┃ ┗ page.tsx
     ┃ ┣ layout.tsx
     ┃ ┣ page.tsx
     ┃ ┗ providers.tsx << theme
     ┣ components  << 공용 컴포넌트
     ┣ constants << route 경로
     ┣ libs
     ┃ ┗ utils.ts << tailwind Hook
     ┗ service
     ┃ ┣ contact.ts
     ┃ ┣ email.ts << nodemailer
     ┃ ┗ posts.ts
```

## Installation

```
npm i && npm run build && npm run start
```

## Info

https://jihuns-blog.vercel.app/posts/my-blog
