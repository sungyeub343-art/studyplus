#!/usr/bin/env node
// 검색 노출용 학교별 정적 페이지와 사이트맵을 생성합니다.
// 학교 데이터(school.js, *-schools.js)를 바꾼 뒤 `node tools/build-seo-pages.js`를 실행하세요.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const SITE = 'https://studyplus.kr';
const PHONE = '010-2928-3614';
const URLS_PER_SITEMAP = 10000;
const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
// 페이지가 생성할 때마다 바뀌지 않도록 CSS 내용 해시로 캐시 버전을 정합니다.
const cssVersion = crypto.createHash('md5').update(read('styles.css')).digest('hex').slice(0, 8);

const context = { window: {}, document: { querySelector: () => null }, URLSearchParams, URL };
vm.createContext(context);
['gyeonggi-schools.js', 'incheon-schools.js', 'nationwide-schools.js'].forEach((file) => vm.runInContext(read(file), context, { filename: file }));
vm.runInContext(`${read('school.js')}
globalThis.__site = { regions, subjectRoutes, subjectNames, staticSubjects, getSubjectDetails, getSchoolName, getSchoolLevel, schoolPagePath, districtPagePath, schoolLink, districtLink, findSchool, slugify, escapeHtml, toFileName };`, context, { filename: 'school.js' });
const {
  regions, subjectRoutes, subjectNames, staticSubjects, getSubjectDetails, getSchoolName, getSchoolLevel,
  schoolPagePath, districtPagePath, schoolLink, districtLink, findSchool, slugify, escapeHtml, toFileName
} = context.__site;

const levels = [['초등학교', '🎒'], ['중학교', '📚'], ['고등학교', '🎓']];
const regionPagePath = (region) => `/tutor/${toFileName(region)}/`;
const absoluteUrl = (pagePath) => `${SITE}${encodeURI(pagePath)}`;
// 내부 링크는 한글 경로를 그대로 써서 페이지 용량을 줄입니다 (canonical·사이트맵은 인코딩).
const href = (link) => {
  const absolute = link.startsWith('/') ? link : `/${link}`;
  return absolute.startsWith('/tutor/') ? decodeURI(absolute) : absolute;
};
const xmlEscape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const shortDistrict = (district) => district.replace(/(시|군|구)$/, '') || district;

const regionFooter = `<nav class="footer-regions section-wrap" aria-label="지역별 과외"><a href="/tutor/">전국 학교별 과외</a>${Object.keys(regions).map((region) => `<a href="${href(regionPagePath(region))}">${escapeHtml(region)} 과외</a>`).join('')}</nav>`;

function layout({ title, description, pagePath, jsonLd = [], body }) {
  const canonical = absoluteUrl(pagePath);
  const structuredData = jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="상상코칭" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/tutoring-landing-page.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  ${structuredData}
  <link rel="icon" type="image/svg+xml" href="/logo-mark.svg?v=20260818" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css?v=${cssVersion}" />
</head>
<body class="school-page">
  <header class="site-header school-header">
    <a class="brand" href="/" aria-label="상상코칭 홈"><img class="brand-logo" src="/logo-mark.svg" alt="" width="29" height="29" /><span>상상<span>코칭</span></span></a>
    <nav class="nav-links" aria-label="주요 메뉴">
      <a href="/#process">매칭 시스템</a>
      <a href="/#teachers">선생님 찾기</a>
      <a class="active" href="/school.html">과외 수업</a>
      <a href="/academy.html">학원 수업</a>
      <a href="/#stories">수강 후기</a>
    </nav>
    <a class="header-cta" href="/#apply">무료 상담 신청 <span>↗</span></a>
    <button class="menu-button" aria-label="메뉴 열기">☰</button>
  </header>
  <main>${body}</main>
  <footer>${regionFooter}<div class="section-wrap footer-inner"><a class="brand" href="/"><img class="brand-logo" src="/logo-mark.svg" alt="" width="29" height="29" /><span>상상<span>코칭</span></span></a><p>학교 내신에 맞춘 1:1 맞춤 과외</p><small>© 2026 상상코칭. All rights reserved.</small></div></footer>
  <script src="/script.js" defer></script>
</body>
</html>
`;
}

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, pagePath], index) => ({ '@type': 'ListItem', position: index + 1, name, item: absoluteUrl(pagePath) }))
});
const faqPage = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
});

function renderSchoolPage(region, district, schoolKey, subject, nearbySchools) {
  const { school, meta } = findSchool(slugify(region, district, schoolKey));
  const detail = subject ? getSubjectDetails(school, meta)[subject] : null;
  const subjectName = detail ? detail.name : '';
  const pagePath = schoolPagePath(region, district, schoolKey, subject);
  const basePath = schoolPagePath(region, district, schoolKey);
  const label = subjectName ? `${subjectName}과외` : '과외';
  const title = `${school} ${label} | ${region} ${district} 1:1 내신 과외 - 상상코칭`;
  const description = `${region} ${district} ${detail ? detail.description : `${school} 학생을 위한 ${meta.level} 학교별 내신 과외. 시험 범위와 출제 경향에 맞춘 1:1 맞춤 수업을 상상코칭에서 상담받아보세요.`}`;
  const lead = detail ? escapeHtml(detail.lead) : `같은 학년이어도 학교마다 진도, 교과서, 서술형의 기준이 다릅니다. ${escapeHtml(school)}의 시험 범위와 자주 나오는 유형을 기준으로 학습 계획을 세우고, 학생의 약점은 기초부터 다시 연결합니다.`;
  const points = detail ? detail.points : '<article><span>01</span><h3>시험 범위 진단</h3><p>이번 시험의 범위와 지난 시험 오답을 함께 확인해 꼭 필요한 단원부터 시작합니다.</p></article><article><span>02</span><h3>학교 맞춤 풀이</h3><p>학교의 문제 스타일에 맞춰 서술형, 고난도, 시간 관리까지 단계별로 연습합니다.</p></article><article><span>03</span><h3>수업 후 관리</h3><p>수업 기록과 복습 루틴을 남겨 혼자 공부하는 시간까지 이어지도록 돕습니다.</p></article>';
  const subjectList = meta.subjects.split(' · ').map((name) => {
    const route = subjectRoutes[name];
    if (!route) return `<li><span>${name}</span><b>→</b></li>`;
    const active = route === subject;
    return `<li><a class="subject-link${active ? ' active' : ''}" href="${href(schoolLink(region, district, schoolKey, route))}"${active ? ' aria-current="page"' : ''}><span>${name}과외</span><b>→</b></a></li>`;
  }).join('');
  const faqs = [
    [`${school} ${label}는 어떻게 진행되나요?`, `${school} 재학생의 시험 범위와 현재 실력을 먼저 진단한 뒤, 학생에게 맞는 선생님이 1:1 방문 또는 화상 수업으로 진행합니다.`],
    [`${school} 시험 범위와 출제 유형에 맞춰 수업하나요?`, `네. ${school}의 교과서와 진도, 지난 시험의 출제 유형을 기준으로 ${subjectName || '과목별'} 내신 대비 계획을 세우고 수업 후 복습까지 관리합니다.`],
    [`${region} ${district}에서 방문 과외도 가능한가요?`, `${region} ${district} 지역은 방문 과외와 화상 과외 모두 상담할 수 있습니다. 선생님 배정 가능 여부는 무료 상담에서 바로 안내해 드립니다.`],
    ['상담이나 체험 수업에 비용이 드나요?', '상담은 무료이며, 무료 체험 수업 후 아이와 맞는지 확인하고 천천히 결정하실 수 있습니다.']
  ];
  const crumbs = [['상상코칭', '/'], ['학교별 과외', '/school.html'], [`${region} 과외`, regionPagePath(region)], [`${district} 과외`, districtPagePath(region, district)], [`${school} 과외`, basePath]];
  if (subjectName) crumbs.push([`${school} ${subjectName}과외`, pagePath]);
  const nearby = nearbySchools.map((key) => `<a class="gangdong-school-card" href="${href(schoolLink(region, district, key, subject))}"><strong>${escapeHtml(getSchoolName(key))} ${label}</strong><span>↗</span></a>`).join('');
  const body = `<section class="school-detail-hero section-wrap"><a class="back-link" href="${subjectName ? href(schoolLink(region, district, schoolKey)) : href(districtLink(region, district))}">← ${subjectName ? `${escapeHtml(school)} 과외` : `${escapeHtml(district)} 학교 목록`}</a><nav class="breadcrumb" aria-label="현재 위치"><a href="/school.html">학교별 과외</a> <span>/</span> <a href="${href(regionPagePath(region))}">${escapeHtml(region)}</a> <span>/</span> <a href="${href(districtLink(region, district))}">${escapeHtml(district)}</a> <span>/</span> ${subjectName ? `<a href="${href(schoolLink(region, district, schoolKey))}">${escapeHtml(school)}</a> <span>/</span> ${subjectName}` : escapeHtml(school)}</nav><div class="detail-label"><span>✓ ${subjectName ? `${subjectName} 내신 분석 완료` : '학교별 분석 완료'}</span><small>${escapeHtml(meta.level)} · ${subjectName ? `${subjectName} 1:1 전담` : escapeHtml(meta.tag)}</small></div><h1>${escapeHtml(district)} <em>${escapeHtml(school)}</em> ${label}</h1><p>${detail ? detail.intro : '학교 시험의 흐름을 읽고, 학생의 현재 위치에서<br />다음 등급까지 이어지는 1:1 전담 수업을 시작합니다.'}</p><div class="school-detail-actions"><a class="primary-button" href="/#apply">${escapeHtml(school)} ${subjectName ? `${subjectName} ` : ''}맞춤 상담 신청 <span>→</span></a><a class="outline-button" href="tel:${PHONE.replace(/-/g, '')}">전화 상담 ${PHONE}</a></div></section>
<section class="detail-facts section-wrap"><div><span>학교</span><strong>${escapeHtml(school)}</strong></div><div><span>지역</span><strong>${escapeHtml(region)} ${escapeHtml(district)}</strong></div><div><span>대상</span><strong>${escapeHtml(meta.level)} 재학생</strong></div><div><span>과목</span><strong>${subjectName || escapeHtml(meta.subjects)}</strong></div></section>
<section class="school-landing-image section-wrap"><img src="/tutoring-landing-page.jpg" alt="${escapeHtml(school)} ${label} - 초중고 전과목 1대1 맞춤 과외, 학습 과정, 후기 및 무료 상담 안내" loading="lazy" decoding="async" /></section>
<section class="detail-content section-wrap"><div class="detail-main"><p class="eyebrow">${detail ? detail.eyebrow : 'WHY SCHOOL-SPECIALIZED'}</p><h2>${escapeHtml(school)} ${subjectName ? `${subjectName} ` : ''}내신에<br /><em>맞춰야 하는 이유</em></h2><p class="detail-lead">${lead}</p><div class="detail-points">${points}</div></div><aside class="detail-aside"><p class="eyebrow">SUBJECTS</p><h3>${escapeHtml(school)} 과목별 과외</h3><ul>${subjectList}</ul><a href="/#apply" class="outline-button">${subjectName ? `${subjectName} ` : ''}선생님 추천받기 <span>↗</span></a></aside></section>
<section class="detail-faq section-wrap"><p class="eyebrow">FAQ</p><h2>${escapeHtml(school)} ${label} <em>자주 묻는 질문</em></h2><div class="detail-faq-list">${faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div></section>
${nearby ? `<section class="detail-nearby section-wrap"><p class="eyebrow">NEARBY SCHOOLS</p><h2>${escapeHtml(district)} 다른 ${escapeHtml(meta.level)} <em>${label}</em></h2><div class="gangdong-school-grid">${nearby}</div><a class="back-link" href="${href(districtLink(region, district))}">${escapeHtml(district)} 전체 학교 보기 →</a></section>` : ''}
<section class="detail-source"><div class="section-wrap"><span>학교 정보 기준</span><p>학교명과 학교급은 학교알리미 전국학교현황 공개 목록을 참고했습니다. 주소, 학생 수, 설립 구분 등 최신 공시 정보는 원문에서 확인해 주세요.</p><a href="https://www.schoolinfo.go.kr/ei/ss/pneiss_a08_s0.do" target="_blank" rel="noreferrer">학교알리미 전국학교현황 확인 <span>↗</span></a></div></section>
<section class="detail-bottom"><div class="section-wrap"><p class="eyebrow">A BETTER START</p><h2>지금 ${escapeHtml(school)}<br /><em>${subjectName ? `${subjectName} ` : ''}전담 선생님</em>을 만나보세요.</h2><p>무료 체험 수업 후 아이와 맞는지 천천히 결정할 수 있습니다.</p><a class="primary-button" href="/#apply">무료 상담 신청 <span>→</span></a></div></section>`;
  return { pagePath, html: layout({ title, description, pagePath, jsonLd: [breadcrumb(crumbs), faqPage(faqs)], body }) };
}

function renderDistrictPage(region, district, schools) {
  const pagePath = districtPagePath(region, district);
  const groups = levels.map(([level, icon]) => [level, icon, schools.filter((school) => getSchoolLevel(school) === level)]).filter(([, , list]) => list.length);
  const title = `${district} 과외 | ${region} ${district} 초중고 학교별 내신 과외 - 상상코칭`;
  const description = `${region} ${district} 초등학교·중학교·고등학교 ${schools.length}곳의 학교별 시험 범위와 내신 흐름에 맞춘 1:1 수학·영어 과외를 찾아보세요. 무료 상담과 체험 수업을 신청할 수 있습니다.`;
  const body = `<section class="gangdong-hero"><div class="section-wrap gangdong-hero-inner"><div><p class="eyebrow">SCHOOL-SPECIALIZED TUTORING</p><h1><em>${escapeHtml(shortDistrict(district))}</em> 학교별 과외</h1><p>${escapeHtml(region)} ${escapeHtml(district)} 초·중·고 학교별 시험 범위와<br />학습 흐름에 맞춘 1:1 맞춤 과외 상담</p><div class="gangdong-actions"><a class="primary-button" href="/#apply">무료 상담 신청 <span>→</span></a><a class="back-link" href="${href(regionPagePath(region))}">← ${escapeHtml(region)} 지역 선택</a></div></div><div class="gangdong-hero-stat"><strong>${schools.length}<small>개</small></strong><span>${escapeHtml(district)} 학교</span><i>학교별 내신 전담 선생님</i></div></div></section><section class="gangdong-directory section-wrap"><div class="directory-top"><div><p class="eyebrow">FIND YOUR SCHOOL</p><h2>${escapeHtml(district)} ${schools.length}개 학교 과외</h2></div></div><div class="gangdong-school-groups">${groups.map(([level, icon, list]) => `<section class="gangdong-school-group"><div class="gangdong-group-heading"><span>${icon}</span><h3>${escapeHtml(district)} ${level} 과외</h3><small>${list.length}개 학교</small></div><div class="gangdong-school-grid">${list.map((school) => `<a class="gangdong-school-card" href="${href(schoolLink(region, district, school))}"><strong>${escapeHtml(getSchoolName(school))}</strong><span>↗</span></a>`).join('')}</div></section>`).join('')}</div></section><section class="school-callout"><div class="section-wrap callout-inner"><div><p class="eyebrow">READY TO START?</p><h2>학교를 골라도 고민이 남는다면,<br /><em>무료 상담</em>으로 먼저 물어보세요.</h2></div><a class="primary-button" href="/#apply">맞춤 상담 신청하기 <span>→</span></a></div></section>`;
  const crumbs = [['상상코칭', '/'], ['학교별 과외', '/school.html'], [`${region} 과외`, regionPagePath(region)], [`${district} 과외`, pagePath]];
  return { pagePath, html: layout({ title, description, pagePath, jsonLd: [breadcrumb(crumbs)], body }) };
}

function renderRegionPage(region, districts) {
  const pagePath = regionPagePath(region);
  const total = districts.reduce((sum, [, schools]) => sum + schools.length, 0);
  const title = `${region} 과외 | ${region} 지역별·학교별 초중고 내신 과외 - 상상코칭`;
  const description = `${region} ${districts.length}개 지역, 초중고 ${total}개 학교의 학교별 내신 과외를 찾아보세요. 학교 시험 범위에 맞춘 1:1 수학·영어·국어 과외 무료 상담.`;
  const body = `<section class="gangdong-hero"><div class="section-wrap gangdong-hero-inner"><div><p class="eyebrow">SCHOOL-SPECIALIZED TUTORING</p><h1><em>${escapeHtml(region)}</em> 학교별 과외</h1><p>${escapeHtml(region)} 시군구를 선택하면<br />학교별 1:1 맞춤 과외를 바로 확인할 수 있어요.</p><div class="gangdong-actions"><a class="primary-button" href="/#apply">무료 상담 신청 <span>→</span></a><a class="back-link" href="/tutor/">← 전국 지역 선택</a></div></div><div class="gangdong-hero-stat"><strong>${total}<small>개</small></strong><span>${escapeHtml(region)} 학교</span><i>${districts.length}개 지역</i></div></div></section><section class="gangdong-directory section-wrap"><div class="directory-top"><div><p class="eyebrow">FIND YOUR AREA</p><h2>${escapeHtml(region)} 지역별 과외</h2></div></div><div class="tutor-area-grid">${districts.map(([district, schools]) => `<a class="gangdong-school-card" href="${href(districtLink(region, district))}"><strong>${escapeHtml(district)} 과외</strong><span>${schools.length}개 학교 ↗</span></a>`).join('')}</div></section>`;
  const crumbs = [['상상코칭', '/'], ['학교별 과외', '/school.html'], [`${region} 과외`, pagePath]];
  return { pagePath, html: layout({ title, description, pagePath, jsonLd: [breadcrumb(crumbs)], body }) };
}

function renderHubPage() {
  const pagePath = '/tutor/';
  const title = '전국 지역별 학교별 과외 | 초중고 1:1 내신 과외 - 상상코칭';
  const description = '서울, 경기, 인천과 전국 시도별 초등학교·중학교·고등학교의 학교별 내신 과외를 지역과 학교 이름으로 찾아보세요.';
  const body = `<section class="gangdong-hero"><div class="section-wrap gangdong-hero-inner"><div><p class="eyebrow">SCHOOL-SPECIALIZED TUTORING</p><h1><em>전국</em> 학교별 과외</h1><p>시도와 시군구를 선택하면<br />우리 학교 내신에 맞춘 1:1 과외를 확인할 수 있어요.</p><div class="gangdong-actions"><a class="primary-button" href="/#apply">무료 상담 신청 <span>→</span></a><a class="back-link" href="/school.html">학교 이름으로 검색 →</a></div></div></div></section><section class="gangdong-directory section-wrap">${Object.entries(regions).map(([region, { districts }]) => `<div class="directory-top"><div><h2><a href="${href(regionPagePath(region))}">${escapeHtml(region)} 과외</a></h2></div></div><div class="tutor-area-grid">${Object.keys(districts).map((district) => `<a class="gangdong-school-card" href="${href(districtLink(region, district))}"><strong>${escapeHtml(district)} 과외</strong><span>↗</span></a>`).join('')}</div>`).join('')}</section>`;
  return { pagePath, html: layout({ title, description, pagePath, jsonLd: [breadcrumb([['상상코칭', '/'], ['전국 학교별 과외', pagePath]])], body }) };
}

// 같은 학교급 학교를 현재 학교 다음 순서부터 골라 페이지마다 다른 주변 학교 링크를 보여줍니다.
function pickNearby(schools, schoolKey, count = 12) {
  const level = getSchoolLevel(schoolKey);
  const sameLevel = schools.filter((school) => getSchoolLevel(school) === level);
  const start = sameLevel.indexOf(schoolKey);
  const picked = [];
  for (let offset = 1; offset < sameLevel.length && picked.length < count; offset += 1) {
    const school = sameLevel[(start + offset) % sameLevel.length];
    if (getSchoolName(school) !== getSchoolName(schoolKey) && !picked.includes(school)) picked.push(school);
  }
  return picked;
}

const outDir = path.join(root, 'tutor');
fs.rmSync(outDir, { recursive: true, force: true });
const written = new Set();
const pageUrls = [];
const schoolUrls = [];
const writePage = ({ pagePath, html }, list) => {
  if (written.has(pagePath)) return;
  written.add(pagePath);
  const file = path.join(root, ...decodeURI(pagePath).split('/').filter(Boolean), ...(pagePath.endsWith('/') ? ['index.html'] : []));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  list.push(pagePath);
};

writePage(renderHubPage(), pageUrls);
for (const [region, { districts }] of Object.entries(regions)) {
  const districtEntries = Object.entries(districts);
  writePage(renderRegionPage(region, districtEntries), pageUrls);
  for (const [district, schools] of districtEntries) {
    writePage(renderDistrictPage(region, district, schools), pageUrls);
    for (const schoolKey of new Set(schools)) {
      const nearby = pickNearby(schools, schoolKey);
      ['', ...staticSubjects].forEach((subject) => writePage(renderSchoolPage(region, district, schoolKey, subject, nearby), schoolUrls));
    }
  }
}

const urlEntry = (pagePath, priority) => `  <url>\n    <loc>${xmlEscape(absoluteUrl(pagePath))}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
const urlset = (entries) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
fs.readdirSync(root).filter((file) => /^sitemap-.*\.xml$/.test(file)).forEach((file) => fs.rmSync(path.join(root, file)));
const sitemapFiles = ['sitemap-pages.xml'];
fs.writeFileSync(path.join(root, 'sitemap-pages.xml'), urlset([
  urlEntry('/', '1.0'), urlEntry('/school.html', '0.9'), urlEntry('/academy.html', '0.8'),
  ...pageUrls.map((pagePath) => urlEntry(pagePath, pagePath.split('/').length <= 4 ? '0.8' : '0.7'))
]));
for (let index = 0; index * URLS_PER_SITEMAP < schoolUrls.length; index += 1) {
  const file = `sitemap-schools-${index + 1}.xml`;
  sitemapFiles.push(file);
  fs.writeFileSync(path.join(root, file), urlset(schoolUrls.slice(index * URLS_PER_SITEMAP, (index + 1) * URLS_PER_SITEMAP).map((pagePath) => urlEntry(pagePath, pagePath.includes('과외.html') ? '0.6' : '0.7'))));
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles.map((file) => `  <sitemap>\n    <loc>${SITE}/${file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`).join('\n')}\n</sitemapindex>\n`);

console.log(`지역 페이지 ${pageUrls.length}개, 학교 페이지 ${schoolUrls.length}개, 사이트맵 ${sitemapFiles.length + 1}개 생성`);
