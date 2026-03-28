# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `AtelierForm` component (`components/sections/waitlist/atelier-form.tsx`) — shadcn Drawer wrapper around `AtelierInvitationForm`; accepts optional `trigger` prop; uses `useToggle` from `@uidotdev/usehooks` for open state; `DataManager` for bulk card translation access
- `components/sections/waitlist/index.ts` barrel export
- `__spec__/components/sections/waitlist/atelier-form.test.tsx` — 4 unit tests covering render, drawer content, header, and custom trigger
- `CHANGELOG.md` — Keep a Changelog format adopted

### Changed

- `DataManagerWithExtras` generic constrained to `TRaw extends object` — resolves TS2698 spread errors in tests and improves type safety
- `lib/data/atelier-form-data.ts` — static ICONS, SLIDE_VARIANTS, SLIDE_TRANSITION extracted from form component
- `components/sections/atelier-invitation/atelier-invitation-form.tsx` — refactored to use `DataManager<RawStepTranslation>` replacing ~90 lines of manual `t()` calls
