# IT-Gun (잇근) 💪

- 배포: **[itgun](https://itgun.me)**
- 테스트 계정: `id: lion@lion.com` / `pwd: lion1234`

<br/>

<p align="center">
<img width="800" height="800" alt="itgun 설명 이미지" src="https://github.com/user-attachments/assets/fa707410-51ee-4ff9-899b-3ce7506ef357" />
</p>

<p align="center">
  <strong>꾸준한 운동 기록을 통해 캐릭터의 근육을 키워나가는 운동기록 서비스</strong>
</p>

<br/>

**itGun**(잇근)은 기존 헬스 어플의 딱딱하고 현실적인 UI에서 벗어나, 운동 기록을 통해 자신만의 캐릭터를 성장시키는 **게이미피케이션 기반 운동 기록 서비스**입니다.

사용자는 자신의 운동을 기록하며 신체 부위별 근육 성장을 통해 캐릭터를 성장시키고 특정 목표를 달성하면 `뱃지`를 획득하는 등 게임적인 요소를 통해 운동에 대한 동기를 부여받고 성취감을 느낄 수 있습니다.

<br/>

## ✨ 주요 기능 (Features)

### 🎮 핵심 기능

- 캐릭터 시각화: 운동량에 따라 실시간으로 변화하는 캐릭터
- 근성장 시스템: 운동한 만큼 캐릭터의 각 신체부위별 근육 성장
- 근손실 시스템: 운동을 14일 이상 쉬면 캐릭터에 근손실 발생
- 뱃지 시스템: 다양한 운동 목표 달성 시 자동으로 뱃지 부여 및 조회

### 📱 상세 기능

- 메인 캐릭터 조회: 현재 캐릭터 상태 및 획득한 뱃지 확인
- 운동 기록: 직관적인 UI로 운동 목록 조회를 통해 운동 기록 데이터 입력
- 운동 기록 조회: 과거 운동 기록 및 진행 상황 캘린더 형태로 시각화
- 신체부위별 근육 성잘률 조회: 각 신체부위별로 성장률을 게이지바 형태로 시각화
- 달성 뱃지 조회: 획득한 뱃지 컬렉션 조회
- 캐릭터 다운로드: 성장시킨 나만의 캐릭터를 이미지 파일로 다운로드

<br/>

## 🛠️ 기술 스택 (Tech Stack)

| 구분                  | 기술                                          |
| --------------------- | --------------------------------------------- |
| **Frontend**          | `Next.js (App Router)`, `React`, `TypeScript` |
| **State Management**  | `TanStack Query (React Query)`                |
| **Styling**           | `Tailwind CSS`, `GSAP`                        |
| **Component Library** | `Storybook`                                   |
| **Database & ORM**    | `PostgreSQL`, `Prisma`                        |
| **Authentication**    | `NextAuth.js`                                 |
| **Code Quality**      | `ESLint`, `Prettier`, `Husky`, `lint-staged`  |
| **CI/CD**             | `GitHub Actions`                              |

<br/>

## 📁 디렉토리 구조 (Directory Structure)

```
.
├── app/              # Next.js App Router 기반의 페이지 및 API 라우트
│   ├── api/          # API 엔드포인트
│   ├── components/   # 페이지 단위의 조합 컴포넌트
│   └── ...
├── backend/          # 백엔드 로직
│   ├── application/  # 비즈니스 로직
│   ├── domain/       # 엔티티
│   ├── infrastructure/   # 데이터베이스 처리 로직
├── ds/               # 독립적인 디자인 시스템 (Atoms, Molecules)
│   ├── components/
│   └── styles/
├── hooks/            # Custom Hooks (비즈니스 로직, 상태 관리)
├── services/         # API 호출 함수 (fetcher)
├── prisma/           # Prisma 스키마 및 마이그레이션
├── public/           # 정적 에셋 (이미지 등)
├── static/           # 폰트, SVG 등 정적 파일
├── types/            # 전역 타입 정의
└── utils/            # 순수 함수 및 유틸리티
```

<br/>

## 👨‍💻 주목해주세요!

단순히 기능을 구현하는 것을 넘어 **유지보수성, 확장성, 그리고 개발 생산성**을 높이기 위한 아키텍처 설계를 고민했습니다.

### 1. **Custom Hooks를 통한 비즈니스 로직 분리 (`/hooks`)**

- **TanStack Query**(React Query)를 활용하여 서버 상태를 관리했습니다.
- API 호출, 데이터 가공, 상태 업데이트 등 비즈니스 로직을 UI 컴포넌트로부터 완전히 분리하여 **Custom Hooks**에 위임했습니다.
- **(예시)** `useGetUserLogs.ts` 와 같은 훅은 유저 로그 데이터를 가져오는 모든 로직(API 연동, 로딩/에러 처리 등)을 캡슐화하여, 어떤 컴포넌트에서든 재사용 가능하고 테스트가 용이합니다.

### 2. **독립적인 디자인 시스템 구축 (`/ds`)**

- `Atoms`, `Molecules` 단위의 컴포넌트를 정의하고, `Storybook`을 통해 시각적으로 테스트하며 독립적인 **디자인 시스템**(DS)을 구축했습니다.
- 이를 통해 전체 애플리케이션의 UI 일관성을 유지하고, 새로운 페이지나 기능을 개발할 때 이미 정의된 컴포넌트를 재사용하여 개발 속도를 크게 향상시켰습니다.

### 3. **Next.js App Router 기반의 API 엔드포인트 (`/app/api`)**

- 별도의 백엔드 서버 없이 Next.js의 **Route Handlers**를 사용하여 API 엔드포인트를 구축했습니다.
- `Prisma` ORM과 연동하여 데이터베이스 작업을 처리하는 로직은 `/backend` 경로에 명확하게 위치하여 프론트엔드와 백엔드 로직의 경계를 명확히 하면서도 단일 프로젝트 내에서 관리가 가능하도록 설계했습니다.

### 4. **CI/CD 파이프라인 자동화 (`/.github/workflows`)**

- `main` 브랜치에 Push 또는 Pull Request가 발생할 때마다 **GitHub Actions**가 자동으로 `ESLint`와 `Prettier`를 실행하여 코드 품질을 검사(CI)합니다.
- `main` 브랜치에 머지된 코드는 서버에 자동으로 배포(CD)되도록 파이프라인을 구축하여 안정적이고 신속한 배포 프로세스를 구현했습니다.

<br/>

---
