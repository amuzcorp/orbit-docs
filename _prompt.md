# CMS-Orbit 매뉴얼 작성 가이드

## 기본 구조

### 1. 메타데이터

```markdown
export const metadata = {
  title: '페이지 제목',
  description: '페이지에 대한 간단한 설명 (SEO를 위한 메타 설명)',
}
```

### 2. 섹션 정의

```markdown
export const sections = [
  { title: '섹션 제목', id: 'section-id' },
  // ... 추가 섹션
]
```

### 3. 페이지 구조

```markdown
# 페이지 제목

페이지에 대한 간단한 소개 문단. {{ className: 'lead' }}

## 섹션 제목 \{#section-id\}

섹션 내용 설명

### 하위 섹션 (필요한 경우)

코드 예제나 추가 설명

<div className="not-prose">
  <Button href="/next-page" variant="text" arrow="right">
    <>다음 페이지로 이동</>
  </Button>
</div>
```

## 작성 규칙

### 1. 코드 블록

- 모든 코드 블록에는 제목을 추가
- 언어와 제목을 명시적으로 지정

```markdown
```php {{ title: '예제 제목' }}
// 코드 내용
```

```

### 2. 섹션 구성
- 각 섹션은 명확한 목적을 가져야 함
- 섹션 간의 논리적 흐름 유지
- 하위 섹션은 필요한 경우에만 사용

### 3. 예제 코드
- 실제 사용 가능한 예제 제공
- 주석을 통한 설명 추가
- 일관된 코드 스타일 유지

### 4. 네비게이션
- 각 페이지 끝에 다음 페이지로 이동하는 버튼 추가
- 관련 콘텐츠 간의 연결성 강화

## 스타일 가이드

### 1. 문체
- 명확하고 간결한 문장 사용
- 기술적 용어는 정확하게 사용
- 일관된 톤과 스타일 유지

### 2. 포맷팅
- 중요 내용은 **굵게** 표시
- 코드나 명령어는 `인라인 코드`로 표시
- 목록은 마크다운 리스트 사용

### 3. 시각적 요소
- 표를 사용한 비교 설명
- 단계별 설명은 번호 매기기
- 코드 예제는 구문 강조

## 다국어 지원

### 1. 파일 구조
- 모든 빈 디렉터리에는 page.js 와, `page.{locale}.mdx` 가 같이 있어야 한다.

`page.js` 의 내용
```js
import { notFound } from 'next/navigation'
import {locales} from "@/lib/locales";

export default async function Page({ params: { locale } }) {
  const PageComponent = (await import(`./page.${locale}.mdx`)).default
  if (!PageComponent) {
    notFound()
  }
  return <PageComponent />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

- 각 언어별로 별도의 MDX 파일 생성
- 파일명 규칙: `page.{locale}.mdx`
- 예: `page.ko.mdx`, `page.en.mdx`, `page.js`

### 2. 번역 규칙

- 모든 텍스트 요소 번역
- 코드 주석도 번역
- 문화적 차이 고려

## SEO 최적화

### 1. 메타데이터

- 정확한 title과 description 제공
- 키워드 적절히 포함
- 각 페이지의 고유성 유지

### 2. 콘텐츠 구조

- 명확한 제목 계층 구조
- 관련 키워드 자연스럽게 포함
- 내부 링크 최적화

## 유지보수

### 1. 버전 관리

- 변경사항 추적
- 문서 버전 관리
- 이전 버전과의 호환성 유지

### 2. 검토

- 정기적인 콘텐츠 검토
- 오류 수정
- 최신 정보 반영

## 추가 팁

### 1. 예제 작성

- 실제 사용 사례 기반
- 단계별 설명
- 문제 해결 방법 포함

### 2. 문서화 도구

- 마크다운 에디터 사용
- 프리뷰 기능 활용
- 일관성 검사 도구 사용

### 3. 피드백

- 사용자 피드백 수집
- 지속적인 개선
- 문서 품질 향상

이 가이드는 CMS-Orbit 매뉴얼 작성 시 참고할 수 있는 표준을 제공합니다. 필요에 따라 업데이트하고 확장할 수 있습니다.
