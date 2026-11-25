---
# [TYPE · step 4] Your first write-up: a title, a date and a one-line summary, then the story in Markdown
title: Threat modelling a payments feature
date: 2026-03-14
summary: A one-hour whiteboard session found three flaws before any code was written.
---

We mapped how money moves through the new "split the bill" feature, then asked one question at every arrow: what could go wrong here?

- A shared payment link could be **replayed** to pay twice
- Amounts were trusted from the phone instead of checked on the server
- Error messages leaked other users' names

All three were fixed in the design, before a single line of code.
