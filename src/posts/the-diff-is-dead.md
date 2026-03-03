---
title: "The Diff Is Dead"
date: 2026-03-03
tags:
  - post
  - ai
  - engineering
---

Everyone's losing their minds over how to review AI-generated code. "How do you review a 500-line diff an agent wrote?" You don't. That's the wrong question.

Here's the right one: if the spec is unambiguous enough to generate comprehensive e2e tests, and those tests pass, does the code in the middle even matter?

Pin both ends. Let the middle be fungible.

The spec defines what you want. The tests define what "done" looks like. If the tests pass, the code is correct — by definition. Doesn't matter if a human wrote it, an agent wrote it, or it looks like garbage. It works. Ship it.

This flips the whole model:

- **Before:** Spec → Code → Review the code → Hope it works
- **Now:** Spec → Tests → Code → Tests pass → Ship

The review doesn't disappear. It moves. Upstream to the spec. Downstream to the test suite. The code in the middle? Implementation detail.

The hard part becomes writing specs that are precise enough to generate real tests. Which, if you think about it, is the same skill as writing good tests. It all collapses into one question: *can you define "done" precisely enough that a machine can verify it?*

That's where this gets interesting. The bottleneck shifts from "can you code" to "can you define the problem." Domain expertise becomes the scarce resource, not engineering hours.

The people still reviewing diffs are solving yesterday's problem.
