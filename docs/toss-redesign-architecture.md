---
title: Toss-style Portfolio Redesign Architecture
project: cys020628.github.io
date: 2026-07-07
tags:
  - architecture
  - ux-writing
  - tailwind
  - framer-motion
---

# Toss-style Portfolio Redesign Architecture

## 0. 구현 메모

현재 배포 화면은 GitHub Pages 정적 호스팅을 유지하기 위해 `index.html`을 Tailwind CDN 기반으로 재작성했다. 전역 `style.css` 의존은 제거했고, 주요 섹션은 Tailwind utility class와 짧은 DOM 인터랙션으로 구성했다.

Next.js 전환 시에는 아래 제안 아키텍처를 기준으로 `data/portfolio.ts`와 섹션 컴포넌트로 분리한다.

## 1. 현재 아키텍처 문제

기존 사이트는 `index.html` 하나에 콘텐츠, 화면 구조, 모달 데이터, 인터랙션 스크립트가 함께 들어 있었다. `style.css`도 전역 클래스 기반이라 섹션이 늘어날수록 스타일 충돌 가능성이 컸다.

### 문제점
- 콘텐츠와 UI 구조가 분리되어 있지 않아 프로젝트, 스택, 연락처 문구를 수정할 때 HTML 전체를 직접 건드려야 한다.
- Header, WorkCard, Contact 같은 반복 가능한 UI가 컴포넌트로 분리되어 있지 않다.
- 모달 상세 데이터가 DOM 스크립트 내부에 있어 타입 안정성, 재사용성, 테스트가 어렵다.
- 현재 CSS는 토큰이 일부 있지만 Tailwind 기반 디자인 시스템으로 완전히 연결되어 있지 않다.
- 인터랙션이 DOM 직접 조작 중심이라 Framer Motion 기반의 선언적 애니메이션으로 확장하기 어렵다.

### UX 관점
포트폴리오는 채용 담당자나 협업자가 짧은 시간 안에 “이 개발자가 어떤 문제를 잘 푸는지” 판단해야 한다. 따라서 콘텐츠는 데이터로 분리하고, UI는 `Hero -> Proof -> Work -> Apps -> Stack -> Contact` 흐름으로 명확하게 설계해야 한다.

## 2. 제안 아키텍처

Next.js App Router 기준으로 다음 구조를 권장한다.

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    Header.tsx
    Footer.tsx
  sections/
    HeroSection.tsx
    ProofSection.tsx
    WorkSection.tsx
    AppsSection.tsx
    StackSection.tsx
    ContactSection.tsx
  ui/
    Button.tsx
    Section.tsx
    WorkCard.tsx
    Tag.tsx
    MotionReveal.tsx
data/
  portfolio.ts
styles/
  theme.ts
tailwind.config.js
```

### 설계 이유
- `data/portfolio.ts`: 경력, 프로젝트, 링크를 데이터로 분리해 문구 수정과 UI 수정을 분리한다.
- `components/sections`: 각 섹션을 독립적으로 개선할 수 있어 UX 실험과 순서 변경이 쉽다.
- `components/ui`: Button, WorkCard, Tag를 재사용하면 토스식 일관성이 유지된다.
- `MotionReveal`: Framer Motion을 섹션/카드 단위로 캡슐화해 인터랙션 정책을 한 곳에서 관리한다.

## 3. UX 라이팅 제안

### Hero
기존 문구:
> Android 앱을 제품답게 설계하고 구현합니다.

제안 문구:
> 사용자가 오래 머무는 Android 경험을 만듭니다.

보조 문구:
> Compose UI, 앱 아키텍처, 접근성, BLE/Serial 통신까지 제품의 흐름을 끊기지 않게 설계하고 구현합니다.

### Contact
기존 문구:
> Android 앱 개발 관련 연락을 기다립니다.

제안 문구:
> 앱의 구조와 사용성을 함께 개선할 Android 개발자가 필요하다면 이야기해요.

보조 문구:
> 화면 구현만이 아니라 상태 관리, 접근성, 디바이스 연동까지 함께 정리합니다.

### UX 이유
토스식 문구는 기술 나열보다 사용자가 얻는 결과를 먼저 말한다. Hero에서는 “무엇을 할 수 있는 개발자인가”를 한 문장으로 보여주고, Contact에서는 “왜 연락해야 하는가”를 구체적으로 제안한다.

## 4. 디자인 시스템 토큰

```ts
const rem = (px: number) => `${px / 16}rem`;

export const theme = {
  color: {
    gray0: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f2f4f6',
    gray200: '#e5e8eb',
    gray500: '#8b95a1',
    gray600: '#6b7684',
    gray800: '#333d4b',
    gray900: '#191f28',
    accent: '#3182f6',
    accentPressed: '#1b64da',
    accentSoft: '#e8f3ff',
  },
  space: {
    pageX: rem(20),
    pageXDesktop: rem(32),
    sectionY: rem(72),
    sectionYDesktop: rem(104),
    card: rem(28),
  },
  font: {
    display: rem(56),
    headline: rem(40),
    title: rem(24),
    body: rem(17),
    caption: rem(14),
  },
};
```

## 5. 주요 컴포넌트 구조

### Header

```tsx
const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Apps', href: '#apps' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50/85 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="text-[1rem] font-extrabold text-gray-900">
          YoungSeok
        </a>
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.875rem] font-bold text-gray-600 transition hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
```

UX 이유: Header는 탐색을 돕는 도구이지 주인공이 아니다. 모바일에서는 메뉴를 단순화하고, 데스크톱에서만 보조 탐색을 노출해 첫 화면의 메시지 집중도를 높인다.

### WorkCard

```tsx
type WorkCardProps = {
  index: string;
  title: string;
  summary: string;
  stack: string;
};

export function WorkCard({ index, title, summary, stack }: WorkCardProps) {
  return (
    <motion.article
      initial={{ y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
      className="rounded-[1.5rem] bg-white p-7 shadow-card"
    >
      <p className="text-[0.875rem] font-semibold text-gray-500">{index}</p>
      <h3 className="mt-5 text-[1.5rem] font-bold leading-[1.34] text-gray-900">{title}</h3>
      <p className="mt-3 text-[1.0625rem] font-medium leading-[1.7] text-gray-600">{summary}</p>
      <p className="mt-8 text-[0.875rem] font-semibold text-gray-500">{stack}</p>
    </motion.article>
  );
}
```

UX 이유: WorkCard는 “기술 목록”보다 “해결한 문제”를 먼저 읽게 해야 한다. hover scale은 클릭 가능성과 깊이감을 주지만, 과한 장식 없이 토스식으로 짧고 부드럽게 유지한다.

### Footer

```tsx
export function Footer() {
  return (
    <footer className="border-t border-gray-200 px-5 py-10 text-center sm:px-8">
      <p className="text-[0.875rem] font-medium text-gray-500">
        © 2026 최영석. Android Developer Portfolio.
      </p>
    </footer>
  );
}
```

UX 이유: Footer는 신뢰 정보를 남기는 최소 영역이다. Contact CTA가 행동을 담당하므로 Footer는 시각적으로 조용해야 한다.

## 6. 구현 로드맵

### Phase 1. 구조 전환
- Next.js App Router 도입.
- `index.html`의 콘텐츠를 `data/portfolio.ts`로 분리.
- `Header`, `Footer`, `Section`, `Button`, `Tag` 기본 컴포넌트 생성.

### Phase 2. 디자인 시스템 연결
- `tailwind.config.js`의 gray/accent/spacing/font 토큰 확정.
- 전역 CSS는 font import와 base reset만 남긴다.
- 모든 레이아웃과 스타일은 Tailwind utility로 이동한다.

### Phase 3. 핵심 섹션 재구성
- Hero: 결과 중심 문구, 핵심 역량 chip, primary CTA.
- Work: 회사 프로젝트를 문제/역할/결과 중심 카드로 재작성.
- Apps: 출시 앱을 별도 증거 섹션으로 구성.
- Stack: 퍼센트 바보다 실제 사용 맥락 중심으로 재배치.
- Contact: 능동형 CTA 문구와 Email primary button.

### Phase 4. 인터랙션
- `MotionReveal`로 섹션 진입 애니메이션 통일.
- `WorkCard` hover motion 적용.
- 모바일 메뉴는 motion drawer로 구성하고 `aria-expanded`를 유지한다.

### Phase 5. 검증
- 모바일 360px, 390px, 768px, 데스크톱 1280px에서 텍스트 줄바꿈 확인.
- Lighthouse 접근성 확인.
- GitHub Pages 배포 방식에 맞춰 static export 또는 현재 정적 배포 전략 선택.
