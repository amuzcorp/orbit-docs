# CMS-Orbit 아티즌 명령어

CMS-Orbit는 다양한 아티즌 명령어를 제공하여 개발 과정을 단순화합니다. 이 문서에서는 `cms:`로 시작하는 모든 명령어와 그 사용법을 설명합니다.

## 콘텐츠 관리 명령어

### `cms:document`
문서를 생성하는 명령어입니다.

```bash
php artisan cms:document {documentName?}
```

옵션:
- `documentName`: 생성할 문서의 이름 (선택사항)

이 명령어는 다음을 생성합니다:
- 문서 모델
- Orchid 리소스
- 마이그레이션 파일
- 관련 스크린 및 행

### `cms:entity`
엔티티를 생성하는 명령어입니다.

```bash
php artisan cms:entity {entityName?}
```

옵션:
- `entityName`: 생성할 엔티티의 이름 (선택사항)

이 명령어는 다음을 생성합니다:
- 엔티티 모델
- Orchid 리소스
- 마이그레이션 파일
- 관련 스크린 및 행

### `cms:model`
모델을 생성하는 명령어입니다.

```bash
php artisan cms:model {name}
```

옵션:
- `name`: 생성할 모델의 이름

이 명령어는 다음을 생성합니다:
- 모델 클래스
- Orchid 리소스
- 마이그레이션 파일

## 관리자 패널 명령어

### `cms:admin`
관리자 계정을 생성하는 명령어입니다.

```bash
php artisan cms:admin {name?} {email?} {password?} {--id=}
```

옵션:
- `name`: 관리자 이름 (선택사항)
- `email`: 관리자 이메일 (선택사항)
- `password`: 관리자 비밀번호 (선택사항)
- `--id`: 기존 관리자 ID (선택사항)

### `cms:fresh-super-admin-role`
슈퍼 관리자 역할을 새로고침하는 명령어입니다.

```bash
php artisan cms:fresh-super-admin-role
```

## 테마 관련 명령어

### `cms:theme`
테마를 생성하는 명령어입니다.

```bash
php artisan cms:theme
```

### `cms:build-theme-scripts`
테마 스크립트를 빌드하는 명령어입니다.

```bash
php artisan cms:build-theme-scripts
```

## 다국어 지원 명령어

### `cms:generate-lang`
언어 파일을 생성하는 명령어입니다.

```bash
php artisan cms:generate-lang {langCode?}
```

옵션:
- `langCode`: 생성할 언어 코드 (선택사항)

## 리소스 생성 명령어

### `cms:screen`
Orchid 스크린을 생성하는 명령어입니다.

```bash
php artisan cms:screen
```

### `cms:rows`
Orchid 행을 생성하는 명령어입니다.

```bash
php artisan cms:rows
```

### `cms:presenter`
Orchid 프레젠터를 생성하는 명령어입니다.

```bash
php artisan cms:presenter
```

### `cms:filter`
Orchid 필터를 생성하는 명령어입니다.

```bash
php artisan cms:filter
```

### `cms:chart`
Orchid 차트를 생성하는 명령어입니다.

```bash
php artisan cms:chart
```

### `cms:tab-menu`
Orchid 탭 메뉴를 생성하는 명령어입니다.

```bash
php artisan cms:tab-menu
```

### `cms:table`
Orchid 테이블을 생성하는 명령어입니다.

```bash
php artisan cms:table
```

### `cms:selection`
Orchid 선택을 생성하는 명령어입니다.

```bash
php artisan cms:selection
```

### `cms:listener`
Orchid 리스너를 생성하는 명령어입니다.

```bash
php artisan cms:listener
```

## 유틸리티 명령어

### `cms:favicon-generator`
파비콘을 생성하는 명령어입니다.

```bash
php artisan cms:favicon-generator
```

### `cms:migration`
마이그레이션 파일을 생성하는 명령어입니다.

```bash
php artisan cms:migration {name}
```

옵션:
- `name`: 마이그레이션의 이름

## 사용 팁

1. 모든 명령어는 `--help` 옵션을 사용하여 자세한 도움말을 볼 수 있습니다.
2. 명령어를 실행하기 전에 필요한 옵션을 확인하세요.
3. 일부 명령어는 다른 명령어를 내부적으로 호출할 수 있습니다.
