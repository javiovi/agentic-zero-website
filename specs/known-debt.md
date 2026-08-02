# Known Debt

Things that are wrong or risky and are not being fixed right now. Recorded so
nobody has to rediscover them.

Last updated: 2026-08-02

## Build checks are disabled

`next.config.mjs` sets both of these:

```js
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true },
```

A build passes regardless of type errors and lint errors. `npm run build`
succeeding is not evidence that the code typechecks.

To actually check types, run it separately:

```bash
npx tsc --noEmit
```

Anyone relying on CI or on a green Vercel deploy to catch a type error will not
get one.

## hooks/use-toast.ts does not typecheck

`npx tsc --noEmit` currently reports two errors, both in `hooks/use-toast.ts`:

```
hooks/use-toast.ts(9,8): error TS2307: Cannot find module '@/components/ui/toast'
                                       or its corresponding type declarations.
hooks/use-toast.ts(161,22): error TS7006: Parameter 'open' implicitly has an 'any' type.
```

The file imports `@/components/ui/toast`, which is not present in the repo. The
second error follows from the first, since the missing types make the parameter
implicit `any`.

This is invisible during a normal build because of the section above. Either add
the missing shadcn/ui `toast` component or delete the hook if nothing renders
toasts.

## agenticzero.com is not ours

The canonical domain is `agenticzero.xyz`. Every internal link, canonical tag,
sitemap entry, and JSON-LD `url` and `sameAs` value points there.

`agenticzero.com` is a different registration on a non-Vercel host. It currently
returns a 114-byte response and does not redirect to the canonical domain. We
cannot configure a redirect on it because we do not control it.

Do not add it to `sameAs`, to metadata, or to `llms.txt`. Asserting a domain we
do not control as an official property is a claim we cannot back and cannot fix
if the content there changes.
