export default function AboutPage(props: any) {
    return (
        <div className="md:pl-10 flex flex-col space-y-4 text-lg">
            <span>안녕하세요! 저는 조용하면서도 활발히 활동하길 좋아하는 아마추어 개발자 Yoony입니다!</span>
            <span>저에 대한 정보는 다음과 같아요!</span>
            <br />
            <hr className="h-px border-0 bg-gray-300 dark:bg-gray-600" />
            {/* =====Goals===== */}
            <h2 className="font-bold text-gray-500">GOALS</h2>
            <ul>
                <li>콘솔 게임 개발자: 한국 게임 업계 부족한 콘솔 게임 산업의 인력으로 성장하기</li>
                <li>풀스택 개발자: 웹에서는 프론트엔드와 백엔드, 게임에서는 백엔드 서버와 API 관련 전문 인력으로 성장하기</li>
            </ul>
            <br />
            <hr className="h-px border-0 bg-gray-300 dark:bg-gray-600" />
            {/* =====Toy Projects===== */}
            <h2 className="font-bold text-gray-500">TOY PROJECTS</h2>
            <ul>
                <li>
                    2020: <a 
                        href="https://www.leveragehub.co.kr/#/" 
                        target="_blank"
                        className="italic underline"
                    >LeverageHub</a>: 주식 정보 공유 웹 커뮤니티<span className="text-gray-500">(Vue.js + AWS)</span>
                </li>
                <li>
                    2023: <a 
                        href="https://yoonylim.github.io/project-khu-map/#/" 
                        target="_blank"
                        className="italic underline"
                    >KHU-Map</a>: 경희대학교 국제캠퍼스 3D Interactive 지도<span className="text-gray-500">(Vue.js + Three.js)</span>
                </li>
            </ul>
            <br />
            <hr className="h-px border-0 bg-gray-300 dark:bg-gray-600" />
            <h2 className="font-bold text-gray-500">SKILLS</h2>
            <ul>
                <li>Front-end: JavaScript, TypeScript, Vue.js, Next.js</li>
                <li>Back-end: Node.js, Express.js, Django<span className="text-gray-500">(Novice)</span></li>
                <li>Game-dev: Unity<span className="text-gray-500">(Novice)</span>, Unreal Engine 5<span className="text-gray-500">(Novice)</span></li>
            </ul>
            <br />
            <hr className="h-px border-0 bg-gray-300 dark:bg-gray-600" />
            <h2 className="font-bold text-gray-500">EDUCATION</h2>
            <ul>
                <li>2016.09-2019.05: Calvary Baptist Schools<span className="text-gray-500">(accepted to UC Irvine - Biomedical Engineering, UC Davis - Biomedical Engineering afterward)</span></li>
                <li>2021.03-PRESENT: 경희대학교 소프트웨어융합학과 / Kyunghee University - Software Convergence</li>
            </ul>
            <br />
            <hr className="h-px border-0 bg-gray-300 dark:bg-gray-600" />
            {/* =====Interests===== */}
            <h2 className="font-bold text-gray-500">INTERESTS</h2>
            <ul className="space-y-4">
                <li>취미: 콘솔 및 스팀 게임 플레이, 애니메이션 시청, 웹 및 게임 개발 공부</li>
                <li>최애 영화: 
                    <ul className="indent-8">
                        <li>Cinema Paradiso<span className="text-gray-500">(1988)</span></li>
                        <li>The Silence of the Lambs<span className="text-gray-500">(1991)</span></li>
                        <li>Schindler's List<span className="text-gray-500">(1993)</span></li>
                        <li>Forrest Gump<span className="text-gray-500">(1994)</span></li>
                        <li>The Shawshank Redemption<span className="text-gray-500">(1994)</span></li>
                        <li>Pulp Fiction<span className="text-gray-500">(1994)</span></li>
                        <li>Good Will Hunting<span className="text-gray-500">(1997)</span></li>
                        <li>Life Is Beautiful<span className="text-gray-500">(1997)</span></li>
                        <li>A Beautiful Mind<span className="text-gray-500">(2001)</span></li>
                        <li>Catch Me If You Can<span className="text-gray-500">(2002)</span></li>
                        <li>Oppenheimer<span className="text-gray-500">(2023)</span></li>
                    </ul>
                </li>
                <li>최애 TV 프로그램:
                    <ul className="indent-8">
                        <li>The Office<span className="text-gray-500">(2005)</span></li>
                        <li>Community<span className="text-gray-500">(2009)</span></li>
                        <li>응답하라 1988<span className="text-gray-500">(2015)</span></li>
                        <li>Unnatural<span className="text-gray-500">(2018)</span></li>
                    </ul>
                </li>
                <li>최애 애니메이션: 
                    <ul className="indent-8">
                        <li>신세기 에반게리온<span className="text-gray-500">(1995)</span></li>
                        <li>카우보이 비밥<span className="text-gray-500">(1998)</span></li>
                        <li>바라카몬<span className="text-gray-500">(2014)</span></li>
                        <li>나만이 없는 거리<span className="text-gray-500">(2016)</span></li>
                        <li>바이올렛 에버가든<span className="text-gray-500">(2018)</span></li>
                        <li>봇치 더 록!<span className="text-gray-500">(2022)</span></li>
                        <li>장송의 프리렌<span className="text-gray-500">(2023)</span></li>
                    </ul>
                </li>
                <li>플레이한 게임:</li>
                    <ul className="indent-8">
                        <li>젤다의 전설<span className="text-gray-500">(1986)</span></li>
                        <li>링크의 모험<span className="text-gray-500">(1987)</span></li>
                        <li>젤다의 전설: 신들의 트라이포스<span className="text-gray-500">(1991)</span></li>
                        <li>젤다의 전설: 이상한 모자<span className="text-gray-500">(2004)</span></li>
                        <li>젤다의 전설: 몽환의 모래시계<span className="text-gray-500">(2007)</span></li>
                        <li>젤다의 전설: 대지의 기적<span className="text-gray-500">(2009)</span></li>
                        <li>젤다의 전설: 시간의 오카리나 3D<span className="text-gray-500">(2011)</span></li>
                        <li>젤다의 전설: 바람의 지휘봉 HD<span className="text-gray-500">(2013)</span></li>
                        <li>젤다의 전설: 신들의 트라이포스 2<span className="text-gray-500">(2013)</span></li>
                        <li>젤다의 전설: 무쥬라의 가면 3D<span className="text-gray-500">(2015)</span></li>
                        <li>젤다의 전설: 황혼의 공주 HD<span className="text-gray-500">(2016)</span></li>
                        <li>젤다의 전설: 브레스 오브 더 와일드<span className="text-gray-500">(2017)</span></li>
                        <li>젤다의 전설: 꿈꾸는 섬<span className="text-gray-500">(2019)</span></li>
                        <li>젤다무쌍: 대재앙의 시대<span className="text-gray-500">(2020)</span></li>
                        <li>젤다의 전설: 스카이워드 소드 HD<span className="text-gray-500">(2021)</span></li>
                        <li>젤다의 전설: 티어스 오브 더 킹덤<span className="text-gray-500">(2023)</span></li>
                        <li>포켓몬스터 금/은<span className="text-gray-500">(1999)</span></li>
                        <li>포켓몬스터 DP<span className="text-gray-500">(2006)</span></li>
                        <li>포켓몬스터 플레티넘<span className="text-gray-500">(2008)</span></li>
                        <li>포켓몬스터 하트골드/소울실버<span className="text-gray-500">(2009)</span></li>
                        <li>포켓몬스터 블랙/화이트<span className="text-gray-500">(2010)</span></li>
                        <li>포켓몬스터 블랙2/화이트2<span className="text-gray-500">(2012)</span></li>
                        <li>포켓몬스터 X/Y<span className="text-gray-500">(2013)</span></li>
                        <li>포켓몬스터 오메가루비/알파사파이어<span className="text-gray-500">(2014)</span></li>
                        <li>포켓몬스터 울트라썬/울트라문<span className="text-gray-500">(2017)</span></li>
                        <li>포켓몬스터 레츠고!피카츄/레츠고!이브이<span className="text-gray-500">(2018)</span></li>
                        <li>포켓몬스터 소드/실드 + Expansion Pass<span className="text-gray-500">(2019 + 2020)</span></li>
                        <li>포켓몬 유나이트<span className="text-gray-500">(2021): 17 시즌 기준 Master 등급</span></li>
                        <li>포켓몬스터 브릴리언트 다이아몬드/샤이닝 펄<span className="text-gray-500">(2021)</span></li>
                        <li>Pokemon LEGENDS 아르세우스<span className="text-gray-500">(2022)</span></li>
                        <li>포켓몬스터 스칼렛/바이올렛 + 제로의 비보<span className="text-gray-500">(2022 + 2024)</span></li>
                        <li>슈퍼 마리오 브라더스<span className="text-gray-500">(1985)</span></li>
                        <li>슈퍼 마리오 USA<span className="text-gray-500">(1988)</span></li>
                        <li>슈퍼 마리오 브라더스 3<span className="text-gray-500">(1985)</span></li>
                        <li>슈퍼 마리오 월드<span className="text-gray-500">(1990)</span></li>
                        <li>슈퍼 마리오 64<span className="text-gray-500">(1996)</span></li>
                        <li>뉴 슈퍼 마리오 브라더스<span className="text-gray-500">(2006)</span></li>
                        <li>슈퍼 마리오 오디세이<span className="text-gray-500">(2017)</span></li>
                        <li>마리오 카트 DS<span className="text-gray-500">(2005)</span></li>
                        <li>마리오 카트 8 디럭스<span className="text-gray-500">(2017)</span></li>
                        <li>요시 아일랜드 DS<span className="text-gray-500">(2006)</span></li>
                        <li>별의 커비<span className="text-gray-500">(1992)</span></li>
                        <li>별의 커비: 꿈의 샘 이야기<span className="text-gray-500">(1993)</span></li>
                        <li>별의 커비: 도팡 일당의 습격<span className="text-gray-500">(2006)</span></li>
                        <li>별의 커비 디스커버리<span className="text-gray-500">(2022)</span></li>
                        <li>놀러오세요 동물의 숲<span className="text-gray-500">(2005)</span></li>
                        <li>모여봐요 동물의 숲<span className="text-gray-500">(2020)</span></li>
                        <li>역전재판 5<span className="text-gray-500">(2013)</span></li>
                        <li>슈퍼 스매시브라더스 얼티밋<span className="text-gray-500">(2018)</span></li>
                        <li>닌텐도 스위치 스포츠<span className="text-gray-500">(2022)</span></li>
                        <li>용과 같이 제로<span className="text-gray-500">(2015)</span></li>
                        <li>용과 같이 극<span className="text-gray-500">(2016)</span></li>
                        <li>콜 오브 듀티: 모던 워페어 Remastered<span className="text-gray-500">(2016)</span></li>
                        <li>배틀필드 1<span className="text-gray-500">(2016)</span></li>
                        <li>호라이즌 제로 던 + 더 프로즌 와일즈<span className="text-gray-500">(2017)</span></li>
                        <li>레드 데드 리뎀션 2<span className="text-gray-500">(2018)</span></li>
                        <li>마인크래프트<span className="text-gray-500">(2011)</span></li>
                        <li>언더테일<span className="text-gray-500">(2015)</span></li>
                        <li>델타룬 챕터 1&2<span className="text-gray-500">(2021)</span></li>
                        <li>오리와 눈먼 숲<span className="text-gray-500">(2015)</span></li>
                        <li>오리와 도깨비불<span className="text-gray-500">(2020)</span></li>
                        <li>문명 VI<span className="text-gray-500">(2016)</span></li>
                        <li>컵헤드 + DLC<span className="text-gray-500">(2017 + 2022)</span></li>
                        <li>딥 락 갤럭틱<span className="text-gray-500">(2018)</span></li>
                        <li>스피릿페어러<span className="text-gray-500">(2020)</span></li>
                        <li>레디 오어 낫<span className="text-gray-500">(2023)</span></li>
                    </ul>
            </ul>
        </div>
    );
}