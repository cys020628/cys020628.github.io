import Link from 'next/link';

type Work = {
  id: string;
  title: string;
  summary: string;
  stack: string;
};

type Contact = {
  label: string;
  href: string;
};

const heroKeywords = ['Compose', 'Clean Architecture', 'TalkBack', 'Serial / BLE'] as const;

const works: readonly Work[] = [
  {
    id: '01',
    title: '엘리베이터 LCD 시스템',
    summary: 'Serial 패킷 분석, 실시간 층수 동기화, USB 콘텐츠 업데이트를 담당했습니다.',
    stack: 'Kotlin · Java · Device',
  },
  {
    id: '02',
    title: '치매 예방 스마트 운동 앱',
    summary: 'BLE 운동 데이터 수집, OAuth/API 연동, 운동 기록 차트 흐름을 구현했습니다.',
    stack: 'BLE · Retrofit · Chart',
  },
];

const contacts: readonly Contact[] = [
  { label: 'Email', href: 'mailto:cys020628@naver.com' },
  { label: 'GitHub', href: 'https://github.com/cys020628' },
  { label: 'Tech Blog', href: 'https://velog.io/@cys020628' },
];

export function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[34rem] w-full max-w-5xl flex-col justify-center px-5 py-22 sm:px-8 lg:py-30">
      <p className="text-caption font-bold text-accent">Android Developer</p>
      <h1 className="mt-5 max-w-3xl text-[2.5rem] font-extrabold leading-[1.12] text-gray-900 sm:text-display">
        사용자가 오래 머무는
        <br />
        Android 경험을 만듭니다.
      </h1>
      <p className="mt-6 max-w-2xl text-body text-gray-600">
        Compose UI, 앱 아키텍처, 접근성, BLE/Serial 통신까지 제품의 흐름을 끊기지 않게 설계하고 구현합니다.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {heroKeywords.map((keyword) => (
          <span key={keyword} className="rounded-full bg-gray-100 px-4 py-2 text-caption text-gray-700">
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-18 sm:px-8 lg:py-22">
      <div className="mb-8">
        <p className="text-caption font-bold text-accent">Selected Work</p>
        <h2 className="mt-2 text-headline text-gray-900">업무 프로젝트</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {works.map((work) => (
          <article
            key={work.id}
            className="group rounded-toss bg-gray-0 p-7 shadow-card transition duration-300 ease-toss hover:-translate-y-1 hover:scale-[1.015] hover:shadow-card-hover"
          >
            <p className="text-caption text-gray-500">{work.id}</p>
            <h3 className="mt-5 text-title text-gray-900">{work.title}</h3>
            <p className="mt-3 text-body text-gray-600">{work.summary}</p>
            <p className="mt-8 text-caption text-gray-500 transition-colors group-hover:text-accent">{work.stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  const primaryContact = contacts[0];
  const secondaryContacts = contacts.slice(1);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-22 sm:px-8 lg:py-30">
      <div className="rounded-toss bg-gray-900 px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-caption font-bold text-accent">Contact</p>
        <h2 className="mt-3 max-w-2xl text-headline text-white">앱의 구조와 사용성을 함께 개선할 Android 개발자가 필요하다면 이야기해요.</h2>
        <p className="mt-5 max-w-xl text-body text-gray-400">
          화면 구현만이 아니라 상태 관리, 접근성, 디바이스 연동까지 함께 정리합니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryContact.href}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-7 text-base font-bold text-white shadow-cta transition duration-200 ease-toss hover:bg-accent-pressed"
          >
            {primaryContact.label}
          </Link>
          {secondaryContacts.map((contact) => (
            <Link
              key={contact.href}
              href={contact.href}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-white/10 px-7 text-base font-bold text-white transition duration-200 ease-toss hover:bg-white/20"
            >
              {contact.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioPageSections() {
  return (
    <main className="bg-gray-50">
      <HeroSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
