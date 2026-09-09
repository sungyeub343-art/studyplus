const app = document.querySelector('#academy-app');
const centers = Array.isArray(window.WAWA_CENTERS) ? window.WAWA_CENTERS : [];
const regionOrder = ['전체', '경기', '서울', '대구', '인천', '대전', '광주', '충북', '강원', '충남', '경북', '부산', '울산', '전북', '경남', '제주', '세종'];
const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const centerKey = (center) => center.page.replace(/^c\//, '').replace(/\.html$/, '');
const centerLink = (center) => `academy.html?center=${encodeURIComponent(centerKey(center))}`;
const schoolList = (value) => String(value || '').split(/,|\.|\s{2,}/).map((school) => school.trim()).filter(Boolean);
const allSchools = (center) => [...schoolList(center.elem), ...schoolList(center.mid), ...schoolList(center.high)];

function findCenter(value) {
  if (!value) return null;
  const key = decodeURIComponent(value);
  return centers.find((center) => centerKey(center) === key) || null;
}

function renderDirectory() {
  const regionCounts = centers.reduce((counts, center) => {
    counts[center.region] = (counts[center.region] || 0) + 1;
    return counts;
  }, {});

  app.innerHTML = `<section class="academy-hero"><div class="section-wrap academy-hero-inner"><div><p class="eyebrow">LOCAL LEARNING COACHING</p><h1>가까운 센터에서<br /><em>학원 수업</em>을 시작하세요.</h1><p>우리 동네 205개 학습코칭센터의 위치와<br />주변 학교를 한 번에 확인할 수 있습니다.</p></div><div class="academy-hero-stat"><strong>${centers.length}<small>개</small></strong><span>전국 학습코칭센터</span></div></div></section>
  <section class="academy-directory section-wrap"><div class="directory-top"><div><p class="eyebrow">FIND YOUR CENTER</p><h2>전국 센터 찾기</h2></div><label class="school-search"><span>⌕</span><input id="center-search" type="search" placeholder="센터명, 지역, 학교명 검색" aria-label="센터 검색" /></label></div><div class="region-tabs" role="tablist">${regionOrder.map((region) => `<button class="region-tab${region === '전체' ? ' active' : ''}" data-region="${region}" role="tab">${region}<small>${region === '전체' ? centers.length : regionCounts[region] || 0}</small></button>`).join('')}</div><div class="academy-results-head"><h2>전체 <em>센터</em></h2><span>총 ${centers.length}개</span></div><div id="center-grid" class="center-grid"></div><p class="empty-result" hidden>검색한 센터가 없습니다. 다른 지역이나 학교명으로 찾아보세요.</p></section>
  <section class="school-callout"><div class="section-wrap callout-inner"><div><p class="eyebrow">READY TO START?</p><h2>어떤 센터가 맞을지 고민된다면,<br /><em>무료 상담</em>으로 먼저 물어보세요.</h2></div><a class="primary-button" href="index.html#apply">맞춤 상담 신청하기 <span>→</span></a></div></section>`;

  let activeRegion = '전체';
  const renderCenters = () => {
    const query = document.querySelector('#center-search').value.trim().toLowerCase();
    const visibleCenters = centers.filter((center) => {
      const searchable = [center.name, center.region, center.addr, center.dong, center.elem, center.mid, center.high].join(' ').toLowerCase();
      return (activeRegion === '전체' || center.region === activeRegion) && searchable.includes(query);
    });
    document.querySelector('.academy-results-head h2').innerHTML = `${escapeHtml(activeRegion)} <em>센터</em>`;
    document.querySelector('.academy-results-head span').textContent = `총 ${visibleCenters.length}개`;
    document.querySelector('#center-grid').innerHTML = visibleCenters.map((center) => `<article class="center-card"><div class="center-card-top"><span>${escapeHtml(center.region)}</span><small>${escapeHtml(center.dong)}</small></div><h3>${escapeHtml(center.name)}</h3><p>${escapeHtml(center.addr)}</p><div class="center-school-preview"><span>주변 학교</span><strong>${escapeHtml(allSchools(center).slice(0, 4).join(' · ') || '상담 시 안내')}</strong></div><a href="${centerLink(center)}">센터 수업 보기 <b>↗</b></a></article>`).join('');
    document.querySelector('.empty-result').hidden = visibleCenters.length !== 0;
  };

  document.querySelectorAll('.region-tab').forEach((button) => button.addEventListener('click', () => {
    activeRegion = button.dataset.region;
    document.querySelectorAll('.region-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
    renderCenters();
  }));
  document.querySelector('#center-search').addEventListener('input', renderCenters);
  renderCenters();
}

function renderDetail(center) {
  const schools = [
    ['초등학교', center.elem],
    ['중학교', center.mid],
    ['고등학교', center.high]
  ].filter(([, value]) => schoolList(value).length);
  const schoolCount = schools.reduce((total, [, value]) => total + schoolList(value).length, 0);
  document.title = `${center.name} 와와학습코칭센터 학원 수업 | 스터디플러스`;
  document.querySelector('meta[name="description"]').setAttribute('content', `${center.name} 학원 수업과 학습코칭 상담. ${center.addr} 인근 초중고 학생을 위한 맞춤 학습을 확인하세요.`);
  app.innerHTML = `<section class="academy-detail-hero"><div class="section-wrap"><a class="back-link" href="academy.html">← 전국 센터 목록</a><div class="breadcrumb">학원 수업 <span>/</span> ${escapeHtml(center.region)} <span>/</span> ${escapeHtml(center.name)}</div><div class="detail-label"><span>✓ 지역별 학습코칭</span><small>${schoolCount}개 주변 학교 · 초중고 맞춤 수업</small></div><h1><em>${escapeHtml(center.name)}</em><br />와와학습코칭센터 학원 수업</h1><p>${escapeHtml(center.addr)}<br />학생의 현재 학습 상태에 맞춘 코칭 수업을 시작합니다.</p><div class="academy-detail-actions"><a class="primary-button" href="index.html#apply">${escapeHtml(center.name)} 상담 신청 <span>→</span></a><a class="outline-button" href="tel:${escapeHtml(center.phone.replace(/[^0-9]/g, ''))}">전화 상담 ${escapeHtml(center.phone)}</a></div></div></section>
  <section class="detail-facts section-wrap"><div><span>센터명</span><strong>${escapeHtml(center.name)}</strong></div><div><span>지역</span><strong>${escapeHtml(center.region)} · ${escapeHtml(center.dong)}</strong></div><div><span>주변 학교</span><strong>${schoolCount}개 학교</strong></div><div><span>상담 전화</span><strong>${escapeHtml(center.phone)}</strong></div></section>
  <section class="academy-detail-content section-wrap"><div><p class="eyebrow">NEARBY SCHOOLS</p><h2>${escapeHtml(center.name)} 주변<br /><em>학교별 맞춤 학습</em></h2><p class="detail-lead">학교별 진도와 시험 범위를 고려해 필요한 과목과 학습 습관을 함께 관리합니다.</p><div class="academy-school-groups">${schools.map(([level, value]) => `<section><div><h3>${level}</h3><span>${schoolList(value).length}개</span></div><ul>${schoolList(value).map((school) => `<li>${escapeHtml(school)}</li>`).join('')}</ul></section>`).join('')}</div></div><aside class="detail-aside"><p class="eyebrow">CENTER INFO</p><h3>센터 안내</h3><dl><dt>주소</dt><dd>${escapeHtml(center.addr)}</dd><dt>전화</dt><dd>${escapeHtml(center.phone)}</dd></dl><a class="outline-button" href="https://map.kakao.com/?q=${encodeURIComponent(`${center.name} ${center.addr}`)}" target="_blank" rel="noopener">지도에서 위치 보기 <span>↗</span></a></aside></section>
  <section class="detail-bottom"><div class="section-wrap"><p class="eyebrow">A BETTER START</p><h2>지금 ${escapeHtml(center.name)}에서<br /><em>맞춤 학습코칭</em>을 시작하세요.</h2><p>상담 후 학생에게 필요한 수업 방향을 안내해 드립니다.</p><a class="primary-button" href="index.html#apply">무료 상담 신청 <span>→</span></a></div></section>`;
}

const selectedCenter = findCenter(new URLSearchParams(window.location.search).get('center'));
if (selectedCenter) renderDetail(selectedCenter); else renderDirectory();

document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('mobile-open'));