---
title: Mermaid Test
description: A page to test mermaid diagrams
pubDate: 2024-03-15T10:00:00Z
---

This is a test for Mermaid rendering.

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Another diagram:

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hi Bob
    Bob->>Alice: Hi Alice
```

And one with special characters like '<' and '>' or newlines:
```mermaid
graph TD;
  A["Node with <br/> new line and &lt;html&gt; tags"] --> B;
```
