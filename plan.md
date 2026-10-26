# Plan — OpenCode Mobile

Owner: Dzianis Vashchuk (VIBE TECHNOLOGIES, LLC).
Repo: `dzianisv/opencode-mobile` · Android app `cc.agentlabs.opencode` · MIT.
Last updated: Oct 26, 2026. This file replaces the closed $10k MRR plan.
Execution rule (owner, Oct 26): work in one batch via `gh` CLI, one push.
No per-call approval loops.

## Goal

Ship a free, reliable, open-source Android client that works against
**opencode v1 AND v2**, maintained through community PRs with a regular
owner merge cadence — with no paid relay, no ads, and no iOS promise.

In one line: existing users can keep using the app after upstream moved
to opencode 2, without being misled about what will ship next.

### Explicitly NOT the goal (closed, do not re-litigate)
- $10k MRR via OpenCode Connect ($4.99/$9.99 relay, ~1,541 subs / ~51k MAU).
  Never validated: MRR $0, no Stripe product, no founding offer sent,
  no Connect code in the repo. See HANDOFF.md.
- Zeekend ads ($200/mo x 2). Declined in principle: breaks the README's
  no-ad-network promise and sends user questions to match sponsors —
  a privacy conflict for a self-hosted coding app.
- iOS / TestFlight (#65). Not planned. Do not count it as a KPI.

## KPIs (baseline Oct 26, 2026 — target = done, not "more")

| # | KPI | Baseline | Target | How measured |
|---|-----|----------|--------|--------------|
| 1 | v2 compatibility | #205, #219 open | #205 and #219 closed, #209 merged | GitHub issues/PRs |
| 2 | Shipped release | Users on v0.4.15, README says v0.4.7 | One release published: Play + GitHub APK + self-hosted F-Droid | Play listing, release tag, F-Droid repo |
| 3 | PR queue triaged | 18 open PRs (Oct 26) | Every pre-Oct PR has a decision: merged or closed with a reason; no PR older than 30 days without a decision | `gh pr list --state open` |
| 4 | Quality gates on main | #217/#216 merged, no app test run after them by the owner | `typecheck` + full test suite pass on main after every merge | CI / local run, recorded in the merge commit |
| 5 | Feedback funnel intact | Triage crashed Oct 13/15, fixed by #217 | 0 Play reviews dropped; triage workflow green | Triage workflow runs, triage issues created |
| 6 | Honest docs | README version stale, Notion last updated Jul 30 | README version = shipped version; Notion/plan updated on release; waitlist told Connect will not ship | README, Notion, sent mail (founder gate) |
| 7 | Merge cadence | Last owner code push Aug 18–20, then Oct merges | At least one merge every 60 days (GitHub disables cron workflows after 60 days without commits) | `git log` |

Non-KPIs, on purpose: MRR, download growth, stars, iOS, Connect signups.
Chasing them is how this project stalled before (owner gates, unvalidated
monetization) while the app itself broke on upstream drift.

## Plan

### M0 — Done (Oct 26, 2026)
- Merged #217: triage never loses Play feedback to a missing label
  (commit `7d2acc86`, verified on main).
- Merged #216: PermissionV2 + keyboard avoidance (commit `c980c9e8`,
  10 files, +246/-21, no app-ID change).
- Sunset paused: branch `docs/status-not-maintained-oct26` created but
  NOT merged — do not merge it.
- #218 blocked: applicationId changed to `cc.agentlabs.opencode.test`
  (versionCode 44), 59 files, no device / no live v2 testing, now
  `mergeable=false` / dirty after #216 merged.
- #209 merge attempt, Oct 26: `gh pr merge 209 --squash` failed with
  "Pull Request has merge conflicts", despite the API reporting
  `mergeable=true` / `behind` before the attempt. That field was stale.
  #209 is NOT cleanly mergeable — it needs a real rebase.

### M1 — v2 compatibility (the only P0)
1. Rebase #209 onto current main. Author offered to rebase/split; if the
   author does not, rebase it on an owner branch (fetch the fork branch,
   rebase, open a new PR — never force-push to the author's fork).
   Maintainer edits on forks are not enabled (403 on update-branch).
2. Resolve conflicts in keyboard/events files (overlap with #216).
   Keep #209's v2 transport + probe classifier (`/api/info` vs
   `/global/health` by content type, never status code) and its
   `docs/v2-api-map.md`.
3. Run the verification floor before merging: `npm run typecheck`,
   full test suite (author claimed 363/363), `git diff --check`.
   Record the result in the merge commit. Do not merge on claims alone
   after the stale-mergeable lesson above.
4. Merge with `--squash`. Verify #205, #194, #156 auto-close (they are
   named "Fixes" in #209's body); close #219 manually after checking
   opentunnel.xyz against the merged build, or record why it stays open.
5. If live v2 + v1 testing is possible, do it (author verified v2 2.0.16
   and v1 1.18.32). If not, say so in the release notes — do not claim
   live verification that did not happen.

### M2 — Close the v2 duplicate and the keyboard queue
- #218: close in favour of #209 once M1 merges, unless the author first
  reverts the `.test` app ID, rebases, and drops duplicated #216 work.
  Do not merge #218 as-is under any circumstances.
- Keyboard PRs #206, #203, #201, #193, #208, #215 (draft): deduplicate.
  #216 + #209 already cover most of the keyboard problem. Close the
  rest with a link to the merged fix, not with silence.
- Public comments under the owner's name need his per-post approval.
  Draft them, do not post them on your own.

### M3 — Release (v0.4.16 or next, per PUBLISHING.md)
1. Version bump + changelog. #209 deliberately left these out — follow
   the release process in PUBLISHING.md, do not invent a version number.
2. Publish in this order: GitHub release APK → Play production →
   self-hosted F-Droid repo. Verify each channel, not just the build.
3. Update README version to the shipped version (fixes the v0.4.7 stale
   claim). Update HANDOFF.md with the release tag.
4. Check the two known Play/CI risks before calling it done:
   Play package registration (#162, deadline Sep 30 passed — confirm
   "Registered" in Play Console) and the stale `SENTRY_ORG` secret
   (AGE-497 — org-scoped Sentry calls 403 until the secret is fixed).
   Both are founder/secret gates, not code.

### M4 — Honesty cleanup (founder gates, exact-text approval only)
- Send the Zeekend decline (partnerships@zeekend.com) — already drafted,
  not sent.
- Send the waitlist note: OpenCode Connect will not ship; the app stays
  free and open-source. No launch date, no release promise.
- Close #152 (OpenCode Connect paid tiers epic) with that explanation,
  not by deleting it. Keep #65 (iOS) open but out of scope, or mark it
  as not planned — do not let it read as a promise.

### M5 — Steady state (so this does not stall again)
- Weekly PR triage via `gh`, one batch, one push. Every open PR gets a
  decision within 30 days.
- Never let main go 60 days without a merge (cron-inactivity clock).
- No new feature, monetization, or distribution promise without a
  shipped, tested PR behind it. Validate-first applies to everything,
  not just Connect.

## Risks
- Fork rebase permission (403) and stale `mergeable` flags — verify by
  an actual merge attempt or a local rebase, never by the API field alone.
- No device / no live-server testing on several PRs — label it, do not
  hide it.
- Upstream v2 API drift continues — the probe classifier in #209 is the
  mitigation; keep `docs/v2-api-map.md` updated when upstream changes.
- Play/Sentry founder gates (#162, AGE-497) can block a release even
  when the code is ready — surface them early, do not work around them
  in secret.

## Done = all of these, or an explicit owner decision to stop
- KPI 1–7 all met, or
- The owner explicitly closes the project with a sunset note on the repo
  and Play listing, the waitlist told, and the code left up under MIT.
- Drifting (no merge, no note, no decision for 60+ days) is not a third
  option. That is how the Aug–Oct stall happened.
