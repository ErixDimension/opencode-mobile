# HANDOFF — OpenCode Mobile (owner, Oct 26, 2026)

Read this first. Do not re-ask the owner for A/B decisions. Use `gh` CLI
(not the GitHub MCP tool) for all repo work: `gh` is already logged in as
dzianisv and does not pop a per-call approval card. One batch, one push.

## Owner decision (final, unless the owner says otherwise)
- Project is NOT sunset. It is owner-merge-starved, not dead.
- $10k MRR / OpenCode Connect goal is CLOSED. Connect will not ship.
- Zeekend ads are DECLINED in principle (breaks the README's no-ad-network
  promise; $200/mo x 2 = $400 total; its model sends user questions to match
  sponsors — a privacy conflict for a self-hosted coding app).
  Zeekend decline + waitlist note are drafted, NOT sent. Sending under the
  owner's name still needs his exact-text go-ahead — that is the only gate
  left that is genuinely his. Drafts live in the previous agent's owner file
  (workspace/opencode-mobile-owner-decision.md, outside this repo).

## Already done and verified on main
- MERGED #217 — fix(triage): never lose Play review feedback to a missing
  label. Commit 7d2acc86. Restores the Play feedback funnel that dropped
  reviews Oct 13/15, resets GitHub's 60-day cron-inactivity clock.
- MERGED #216 — fix: handle PermissionV2 events and keyboard avoidance on
  connection screens. Commit c980c9e8. Scope: 10 files, +246/-21,
  src/lib/permissions.ts + tests, KeyboardAvoidingView + IME insets.
  No app-ID/version change. No reviews on record; author claimed 338/338
  tests, TS clean, release APK on Pixel 9 Pro XL. Fork branch could not be
  updated (403, maintainer edits not enabled) — merged from head.

## DO NOT MERGE
- Branch `docs/status-not-maintained-oct26` (commit ec88b330, README sunset
  note + triage workflow deletion attempt). Superseded by the revised
  decision above. The workflow deletion did NOT apply. Leave the branch
  alone or delete it; never merge it.

## Next, in this order
1. **#209 — the v2 candidate.** Live-verified against opencode v2 2.0.16
   AND v1 1.18.32, 363/363 tests, screenshots, docs/v2-api-map.md,
   android/ untouched, no app-ID change. Also fixes #194 (keyboard) and
   #205 (opencode2 support). BLOCKED only on: rebase onto current main
   (after #216/#217 merges — likely conflicts on keyboard/events files)
   + a real test run. Do NOT merge blind. Author offered to rebase/split.
   If the author does not rebase, rebase it yourself with `gh` (fetch the
   fork branch, rebase, force-push to YOUR branch, open a new PR — never
   force-push to the author's fork).
2. **#218 — superseded candidate.** 59 files, +4736/-568. BLOCKED on:
   (a) reverting applicationId to `cc.agentlabs.opencode` (it currently
   changes it to `cc.agentlabs.opencode.test`, versionCode 44 — a Play
   identity breaker), (b) rebasing + dropping duplicated #216 work,
   (c) device + live v2 testing (both unchecked in its own test plan).
   If (a)–(c) are not done, close it in favour of #209.
3. **Keyboard queue after v2:** #206, #203, #201, #193, #208, #215
   (message navigation for #214). Deduplicate — several solve the same
   keyboard problem. Do not merge all of them.
4. **Then, only with owner exact-text approval:** send the Zeekend decline
   (partnerships@zeekend.com) and the OpenCode Connect waitlist note
   (Connect will not ship; app stays free OSS). Do not invent a launch
   date, do not promise a release.

## Facts to not re-litigate
- Repo: dzianisv/opencode-mobile, Android app cc.agentlabs.opencode,
  MIT, not affiliated with opencode/Anomaly. Play + self-hosted F-Droid
  repo + direct APK are live. iOS never shipped (Apple enrollment pending).
- Users still on v0.4.15. README on main still says v0.4.7 in places —
  stale, fix only with a verified version number.
- Open issues that matter: #205 (opencode2), #219 (opentunnel.xyz),
  #198 (messages silently lost), #194 (keyboard), #214 (navigation).
- Notion "OpenCode Mobile" page last updated Jul 30, 2026 (MRR $0,
  Connect $4.99/$9.99 spec, 8 waitlist signups then). Waitlist signups
  kept arriving after that (latest Oct 22, 2026) — mostly bare
  "Sign me up!" mails to support@agentlabs.cc. Only real use case on
  record: a user who locks his server down and wastes time hunting
  hostnames — exactly the Connect pitch that will not ship.
- Last owner code push before this handoff: Aug 18–20, 2026, then an
  Oct 24 auto-commit. Contributors kept working into Oct 2026.

## Commands (gh, one batch)
```
gh repo clone dzianisv/opencode-mobile
gh pr list --repo dzianisv/opencode-mobile --state open
gh pr view 209 --repo dzianisv/opencode-mobile
gh pr view 218 --repo dzianisv/opencode-mobile
gh pr merge 209 --repo dzianisv/opencode-mobile --squash   # only after rebase + tests
```
