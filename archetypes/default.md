---
title: "{{ replace .TranslationBaseName "-" " " | title }}"
summary: "{{ .Summary }}"
slug: "{{ .TranslationBaseName | urlize }}/"
date: {{ .Date }}
banner:
  path: /media/placeholder-image.jpg
  caption: ""
tags:
categories:
draft: false

---
