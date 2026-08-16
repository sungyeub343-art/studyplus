const regions = {
  서울: {
    districts: {
      강남구: ['개원초등학교', '개일초등학교', '개포초등학교', '구룡초등학교', '논현초등학교', '대곡초등학교', '대도초등학교', '대모초등학교', '대왕초등학교', '대치초등학교', '도곡초등학교', '매헌초등학교', '봉은초등학교', '삼성초등학교', '세명초등학교', '수서초등학교', '언북초등학교', '언주초등학교', '역삼초등학교', '왕북초등학교', '자곡초등학교', '청담초등학교', '학동초등학교', '압구정초등학교', '포이초등학교', '개원중학교', '개포중학교', '구룡중학교', '단국대학교사범대학부속중학교', '대명중학교', '대왕중학교', '대청중학교', '대치중학교', '도곡중학교', '세곡중학교', '수서중학교', '신구중학교', '신사중학교', '압구정중학교', '언남중학교', '언주중학교', '역삼중학교', '청담중학교', '휘문중학교', '중동중학교', '봉은중학교', '숙명여자중학교', '진선여자중학교', '은성중학교', '삼성중학교', '경기고등학교', '개포고등학교', '국립국악고등학교', '단국대학교사범대학부속고등학교', '경기여자고등학교', '서울세종고등학교', '수도전기공업고등학교', '숙명여자고등학교', '압구정고등학교', '언남고등학교', '영동고등학교', '은광여자고등학교', '중동고등학교', '중산고등학교', '진선여자고등학교', '청담고등학교', '휘문고등학교', '현대고등학교', '세화고등학교', '세화여자고등학교', '풍문고등학교', '서울로봇고등학교', '서울컨벤션고등학교', '대진디자인고등학교', '서울공연예술고등학교', '경기상업고등학교', '서울전자고등학교', '서초고등학교', '양재고등학교', '반포고등학교'],
      서초구: ['서울교육대학교부설초등학교', '반원초등학교', '방배초등학교', '방일초등학교', '방현초등학교', '서래초등학교', '서원초등학교', '서이초등학교', '서초초등학교', '신동초등학교', '신중초등학교', '양재초등학교', '언남초등학교', '우면초등학교', '원명초등학교', '원촌초등학교', '잠원초등학교', '청계초등학교', '방현초등학교', '반포초등학교', '서울방배초등학교', '서울서초초등학교', '서울잠원초등학교', '서울원촌초등학교', '경원중학교', '동덕여자중학교', '반포중학교', '방배중학교', '서운중학교', '서문여자중학교', '서초중학교', '신동중학교', '신반포중학교', '언남중학교', '원촌중학교', '이수중학교', '세화여자중학교', '서울고등학교', '서초고등학교', '양재고등학교', '반포고등학교', '세화고등학교', '세화여자고등학교', '서문여자고등학교', '상문고등학교', '언남고등학교', '서울전자고등학교', '한국외국인학교', '서초문화예술정보학교'],
      송파구: ['가동초등학교', '가락초등학교', '가원초등학교', '가주초등학교', '거여초등학교', '거원초등학교', '남천초등학교', '마천초등학교', '문덕초등학교', '문정초등학교', '문현초등학교', '방이초등학교', '방산초등학교', '삼전초등학교', '석촌초등학교', '송례초등학교', '송전초등학교', '송파초등학교', '신가초등학교', '신천초등학교', '오금초등학교', '오륜초등학교', '잠동초등학교', '잠실초등학교', '잠전초등학교', '풍납초등학교', '풍성초등학교', '해누리초등학교', '위례별초등학교', '버들초등학교', '가락중학교', '거여중학교', '거원중학교', '문정중학교', '문현중학교', '방산중학교', '방이중학교', '배명중학교', '보인중학교', '삼전중학교', '석촌중학교', '송례중학교', '송정중학교', '송파중학교', '신천중학교', '오륜중학교', '오주중학교', '잠신중학교', '잠실중학교', '잠실여자중학교', '정신여자중학교', '풍납중학교', '풍성중학교', '한산중학교', '해누리중학교', '위례솔중학교', '마천중학교', '서울체육중학교', '가락고등학교', '문정고등학교', '보성고등학교', '보인고등학교', '방산고등학교', '배명고등학교', '서울체육고등학교', '영동일고등학교', '영파여자고등학교', '오금고등학교', '잠신고등학교', '잠실고등학교', '잠실여자고등학교', '잠일고등학교', '정신여자고등학교', '한림연예예술고등학교', '창덕여자고등학교', '일신여자고등학교', '문현고등학교', '송파공업고등학교', '서울인공지능고등학교', '강동고등학교', '한영고등학교', '배재고등학교', '선사고등학교', '대명중학교', '성내중학교', '한영중학교', '성덕여자중학교', '위례초등학교', '위례솔초등학교', '서울컨벤션고등학교'],
      강동구: ['한영고', '배재고', '강동고', '선사고'],
      마포구: ['서울여고', '숭문고', '광성고', '성산중'],
      강서구: ['명덕고', '덕원고', '경복여고', '마곡중'],
      영등포구: ['여의도고', '영등포고', '당산서중', '문래중'],
      노원구: ['대진고', '서라벌고', '상계고', '중계중'],
      도봉구: ['도봉고', '창동고', '누원고', '노곡중'],
      강북구: ['신일고', '혜화여고', '영훈고', '수유중'],
      성북구: ['경희초등학교', '고려대사대부고', '경동고', '성신여고', '길음중'],
      동대문구: ['경희고', '휘경여고', '청량고', '전농중'],
      중랑구: ['송곡고', '면목고', '신현고', '중화중'],
      광진구: ['건대부고', '대원고', '광남고', '자양중'],
      성동구: ['한양대사대부고', '무학여고', '경일고', '성수중'],
      용산구: ['용산고', '중경고', '신광여고', '후암중'],
      종로구: ['경복고', '중앙고', '덕성여고', '서울사대부중'],
      서대문구: ['연세대사대부고', '인창고', '이화여고', '연희중'],
      은평구: ['대성고', '숭실고', '예일여고', '불광중'],
      양천구: ['서울목동초등학교', '목동고', '양정고', '진명여고', '목동중'],
      구로구: ['구일고', '신도림고', '경인고', '구로중'],
      금천구: ['독산고', '문일고', '금천고', '시흥중'],
      관악구: ['서울문영여고', '삼성고', '봉천고', '관악중'],
      동작구: ['숭실고', '경문고', '수도여고', '동작중']
    }
  },
  경기도: {
    districts: {
      '성남시 분당구': ['분당중앙고', '서현고', '수내고', '늘푸른중'],
      '수원시 영통구': ['영덕고', '태장고', '광교고', '영일중'],
      '용인시 수지구': ['수지고', '홍천고', '죽전고', '이현중'],
      '고양시 일산서구': ['대화고', '주엽고', '일산대진고', '오마중'],
      '안양시 동안구': ['평촌고', '신성고', '동안고', '귀인중'],
      '부천시 원미구': ['중흥고', '상일고', '부천여고', '중원중']
    }
  },
  인천: { districts: { 남동구: ['인천고', '인제고', '논현고', '구월중'], 연수구: ['연수고', '송도고', '옥련여고', '신송중'] } },
  부산: { districts: { 해운대구: ['센텀고', '해운대고', '대천중', '동백중'], 부산진구: ['부산진고', '개성고', '가야고', '초읍중'] } },
  대전: { districts: { 서구: ['둔산여고', '대전고', '충남고', '삼천중'], 유성구: ['대덕고', '노은고', '전민고', '노은중'] } },
  대구: { districts: { 수성구: ['경북고', '대구여고', '대륜고', '범어중'], 달서구: ['대건고', '대구상원고', '월서중', '월암중'] } },
  광주: { districts: { 서구: ['광주고', '광덕고', '상일여고', '화정중'], 북구: ['전남고', '광주숭일고', '일곡중', '용봉중'] } },
  강원도: { districts: { 춘천시: ['춘천고', '춘천여고', '남춘천중'], 원주시: ['원주고', '대성고', '원주중'] } },
  충청북도: { districts: { 청주시: ['청주고', '충북고', '청주여고', '서원중'], 충주시: ['충주고', '충주여고', '충주중'] } },
  충청남도: { districts: { 천안시: ['천안고', '복자여고', '천안중'], 아산시: ['온양고', '온양여고', '온양중'] } },
  전라북도: { districts: { 전주시: ['전주고', '전주여고', '전주중'], 익산시: ['이리고', '남성고', '익산중'] } },
  전라남도: { districts: { 순천시: ['순천고', '순천여고', '순천중'], 여수시: ['여수고', '여수여고', '여수중'] } },
  경상북도: { districts: { 포항시: ['포항고', '포항여고', '포항중'], 구미시: ['구미고', '금오고', '구미중'] } },
  경상남도: { districts: { 창원시: ['창원고', '창원여고', '창원중'], 진주시: ['진주고', '진주여고', '진주중'] } },
  제주도: { districts: { 제주시: ['제주제일고', '제주여고', '제주중'], 서귀포시: ['서귀포고', '삼성여고', '서귀포중'] } }
};

const schoolMeta = {
  경기초등학교: { level: '초등학교', subjects: '국어 · 수학 · 영어 · 독서', tag: '초등 기초 전담' },
  경희초등학교: { level: '초등학교', subjects: '국어 · 수학 · 영어 · 과학', tag: '초등 기초 전담' },
  휘문중학교: { level: '중학교', subjects: '국어 · 수학 · 영어 · 과학 · 사회', tag: '중등 내신 전담' },
  휘문고: { level: '고등학교', subjects: '국어 · 수학 · 영어 · 과학 · 사회 · 역사', tag: '고등 내신 전담' },
  경기고: { level: '고등학교', subjects: '국어 · 수학 · 영어 · 과학 · 논술', tag: '고등 내신 전담' },
  숙명여고: { level: '고등학교', subjects: '국어 · 수학 · 영어 · 과학 · 사회', tag: '여고 내신 전담' }
};

const app = document.querySelector('#school-app');
const regionNames = Object.keys(regions);
const schoolInfoUrl = 'https://www.schoolinfo.go.kr/ei/ss/pneiss_a08_s0.do';
let activeLevel = '전체';
let activeDistrict = '';
const districtCounts = {
  경기도: { 성남시: 67, 남양주시: 127, 화성시: 168, 평택시: 126, 시흥시: 93, 안산시: 108, 파주시: 112, 의정부시: 70, 김포시: 89, 광주시: 55, 구리시: 32, 하남시: 47, 오산시: 45, 군포시: 47, 의왕시: 29, 광명시: 48, 분당구: 87, 수지구: 58, 기흥구: 72, 영통구: 64, 덕양구: 79, 일산동구: 46, 일산서구: 49 },
  서울: { 강남구: 80, 서초구: 49, 송파구: 90, 강동구: 62, 마포구: 45, 강서구: 119, 영등포구: 44, 노원구: 93, 도봉구: 45, 강북구: 34, 성북구: 60, 동대문구: 47, 중랑구: 47, 광진구: 42, 성동구: 39, 용산구: 34, 종로구: 36, 서대문구: 40, 은평구: 66, 양천구: 63, 구로구: 54, 금천구: 33, 관악구: 55, 동작구: 44 }
};
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const slugify = (region, district, school) => encodeURIComponent(`${region}|${district}|${school}`);
const getSchoolLevel = (school) => schoolMeta[school]?.level || (school.includes('초등학교') ? '초등학교' : school.includes('중학교') || school.endsWith('중') ? '중학교' : '고등학교');

function findSchool(value) {
  if (!value) return null;
  const [region, district, school] = decodeURIComponent(value).split('|');
  if (!regions[region]?.districts[district]?.includes(school)) return null;
  return { region, district, school, meta: schoolMeta[school] || { level: getSchoolLevel(school), subjects: '국어 · 수학 · 영어 · 과학', tag: '학교별 내신 전담' } };
}

function schoolLink(region, district, school) {
  return `school.html?school=${slugify(region, district, school)}`;
}

function renderDirectory(selectedRegion = '서울') {
  app.innerHTML = `<section class="school-hero section-wrap"><div class="school-hero-copy"><p class="eyebrow">SCHOOL SPECIALIZED TUTORING</p><h1>우리 학교 내신에<br /><em>딱 맞는 과외</em>를 찾아보세요.</h1><p>학교별 시험 범위와 출제 경향을 분석한<br />1:1 맞춤 수업으로 성적의 방향을 바꿉니다.</p></div><div class="school-hero-note"><span>01</span><strong>지역 선택</strong><small>시도, 시군구, 학교급을 고르면<br />맞춤 수업을 바로 확인할 수 있어요.</small></div></section>
  <section class="school-directory section-wrap"><div class="directory-top"><div><p class="eyebrow">FIND YOUR SCHOOL</p><h2>학교별 과외 수업</h2></div><label class="school-search"><span>⌕</span><input id="school-search" type="search" placeholder="학교 이름으로 검색" aria-label="학교 이름 검색" /></label></div><div class="region-tabs" role="tablist">${regionNames.map((region) => `<button class="region-tab${region === selectedRegion ? ' active' : ''}" data-region="${escapeHtml(region)}" role="tab">${escapeHtml(region)}</button>`).join('')}</div><div class="level-tabs" role="group" aria-label="학교급 선택">${['전체', '초등학교', '중학교', '고등학교'].map((level) => `<button class="level-tab${level === '전체' ? ' active' : ''}" data-level="${level}">${level}</button>`).join('')}</div><div id="district-content"></div></section><section class="school-callout"><div class="section-wrap callout-inner"><div><p class="eyebrow">READY TO START?</p><h2>학교를 골라도 고민이 남는다면,<br /><em>무료 상담</em>으로 먼저 물어보세요.</h2></div><a class="primary-button" href="index.html#apply">맞춤 상담 신청하기 <span>→</span></a></div></section>`;
  document.querySelectorAll('.region-tab').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.region-tab').forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    activeDistrict = '';
    renderDistricts(button.dataset.region);
  }));
  document.querySelectorAll('.level-tab').forEach((button) => button.addEventListener('click', () => {
    activeLevel = button.dataset.level;
    document.querySelectorAll('.level-tab').forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    renderDistricts(document.querySelector('.region-tab.active').dataset.region, document.querySelector('#school-search').value);
  }));
  document.querySelector('#school-search').addEventListener('input', (event) => renderDistricts(document.querySelector('.region-tab.active').dataset.region, event.target.value));
  renderDistricts(selectedRegion);
}

function renderDistricts(regionName, query = '') {
  const content = document.querySelector('#district-content');
  const normalizedQuery = query.trim().toLowerCase();
  const districts = Object.entries(regions[regionName].districts).map(([district, schools]) => [district, schools.filter((school) => school.toLowerCase().includes(normalizedQuery) && (activeLevel === '전체' || getSchoolLevel(school) === activeLevel))]).filter(([, schools]) => schools.length);
  if (!districts.length) {
    content.innerHTML = '<p class="empty-result">검색한 학교가 없습니다. 다른 학교 이름으로 찾아보세요.</p>';
    return;
  }
  if (!activeDistrict && !normalizedQuery) {
    content.innerHTML = `<div class="directory-region-heading"><h2>${escapeHtml(regionName)} <em>지역</em></h2><span>${districts.length}개 시군구</span></div><div class="district-grid">${districts.map(([district, schools]) => `<button class="district-card" data-district="${escapeHtml(district)}"><strong>${escapeHtml(district.replace(/시$/, ''))}</strong><span>${districtCounts[regionName]?.[district] || schools.length}개</span><b>›</b></button>`).join('')}</div>`;
    document.querySelectorAll('.district-card').forEach((button) => button.addEventListener('click', () => {
      activeDistrict = button.dataset.district;
      renderDistricts(regionName);
    }));
    return;
  }
  const visibleDistricts = activeDistrict ? districts.filter(([district]) => district === activeDistrict) : districts;
  const levelOrder = ['초등학교', '중학교', '고등학교'];
  const renderLevelSection = (district, schools, level) => {
    const levelSchools = schools.filter((school) => getSchoolLevel(school) === level);
    if (!levelSchools.length) return '';
    const icon = level === '초등학교' ? '📕' : level === '중학교' ? '📚' : '🎓';
    return `<section class="school-level-section"><div class="school-level-badge"><span>${icon}</span>${level}</div><div class="school-grid">${levelSchools.map((school) => `<a class="school-card" href="${schoolLink(regionName, district, school)}"><strong>${escapeHtml(school)}</strong><span class="school-card-arrow">↗</span></a>`).join('')}</div></section>`;
  };
  content.innerHTML = `<div class="school-list-heading"><button class="back-districts" type="button">← ${escapeHtml(regionName)} 시군구</button><h2>${escapeHtml(activeDistrict || '학교 검색')} <em>학교</em></h2></div>${visibleDistricts.map(([district, schools]) => `<section class="district-block"><div class="district-heading"><h3>${escapeHtml(district)}</h3><span>${schools.length}개 학교</span></div>${levelOrder.map((level) => renderLevelSection(district, schools, level)).join('')}</section>`).join('')}`;
  document.querySelector('.back-districts').addEventListener('click', () => { activeDistrict = ''; document.querySelector('#school-search').value = ''; renderDistricts(regionName); });
}

function renderDetail(schoolData) {
  const { region, district, school, meta } = schoolData;
  document.title = `${region} ${school} 과외 | studyplus.kr`;
  app.innerHTML = `<section class="school-detail-hero section-wrap"><a class="back-link" href="school.html">← 학교 목록으로</a><div class="breadcrumb">학교별 과외 <span>/</span> ${escapeHtml(district)} <span>/</span> ${escapeHtml(school)}</div><div class="detail-label"><span>✓ 학교별 분석 완료</span><small>${escapeHtml(meta.level)} · ${escapeHtml(meta.tag)}</small></div><h1>${escapeHtml(district)} <em>${escapeHtml(school)}</em> 과외</h1><p>학교 시험의 흐름을 읽고, 학생의 현재 위치에서<br />다음 등급까지 이어지는 1:1 전담 수업을 시작합니다.</p><a class="primary-button" href="index.html#apply">${escapeHtml(school)} 맞춤 상담 신청 <span>→</span></a></section><section class="detail-facts section-wrap"><div><span>학교</span><strong>${escapeHtml(school)}</strong></div><div><span>지역</span><strong>${escapeHtml(region)} ${escapeHtml(district)}</strong></div><div><span>대상</span><strong>${escapeHtml(meta.level)} 재학생</strong></div><div><span>과목</span><strong>${escapeHtml(meta.subjects)}</strong></div></section><section class="detail-content section-wrap"><div class="detail-main"><p class="eyebrow">WHY SCHOOL-SPECIALIZED</p><h2>${escapeHtml(school)} 내신에<br /><em>맞춰야 하는 이유</em></h2><p class="detail-lead">같은 학년이어도 학교마다 진도, 교과서, 서술형의 기준이 다릅니다. ${escapeHtml(school)}의 시험 범위와 자주 나오는 유형을 기준으로 학습 계획을 세우고, 학생의 약점은 기초부터 다시 연결합니다.</p><div class="detail-points"><article><span>01</span><h3>시험 범위 진단</h3><p>이번 시험의 범위와 지난 시험 오답을 함께 확인해 꼭 필요한 단원부터 시작합니다.</p></article><article><span>02</span><h3>학교 맞춤 풀이</h3><p>학교의 문제 스타일에 맞춰 서술형, 고난도, 시간 관리까지 단계별로 연습합니다.</p></article><article><span>03</span><h3>수업 후 관리</h3><p>수업 기록과 복습 루틴을 남겨 혼자 공부하는 시간까지 이어지도록 돕습니다.</p></article></div></div><aside class="detail-aside"><p class="eyebrow">SUBJECTS</p><h3>과목별 전담 수업</h3><ul>${meta.subjects.split(' · ').map((subject) => `<li><span>${subject}</span><b>→</b></li>`).join('')}</ul><a href="index.html#apply" class="outline-button">선생님 추천받기 <span>↗</span></a></aside></section><section class="detail-source"><div class="section-wrap"><span>학교 정보 기준</span><p>학교명과 학교급은 학교알리미 전국학교현황 공개 목록을 참고했습니다. 주소, 학생 수, 설립 구분 등 최신 공시 정보는 원문에서 확인해 주세요.</p><a href="${schoolInfoUrl}" target="_blank" rel="noreferrer">학교알리미 전국학교현황 확인 <span>↗</span></a></div></section><section class="detail-bottom"><div class="section-wrap"><p class="eyebrow">A BETTER START</p><h2>지금 ${escapeHtml(school)}<br /><em>전담 선생님</em>을 만나보세요.</h2><p>무료 체험 수업 후 아이와 맞는지 천천히 결정할 수 있습니다.</p><a class="primary-button" href="index.html#apply">무료 상담 신청 <span>→</span></a></div></section>`;
}

const selectedSchool = new URLSearchParams(window.location.search).get('school');
const selectedSchoolData = findSchool(selectedSchool);
const selectedRegion = new URLSearchParams(window.location.search).get('a');
if (selectedSchoolData) renderDetail(selectedSchoolData); else renderDirectory(regions[selectedRegion] ? selectedRegion : '서울');

document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('mobile-open'));
