/**
 * Converts a Tiptap JSON document to an HTML string.
 * Pure server-safe — no browser globals, no Tiptap extensions needed.
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMarks(text, marks = []) {
  let out = escapeHtml(text);
  for (const mark of marks) {
    switch (mark.type) {
      case "bold":        out = `<strong>${out}</strong>`; break;
      case "italic":      out = `<em>${out}</em>`;         break;
      case "underline":   out = `<u>${out}</u>`;           break;
      case "strike":      out = `<s>${out}</s>`;           break;
      case "code":        out = `<code>${out}</code>`;     break;
      case "link": {
        const href = escapeHtml(mark.attrs?.href || "#");
        const target = mark.attrs?.target ? ` target="${escapeHtml(mark.attrs.target)}"` : "";
        out = `<a href="${href}"${target} rel="noopener noreferrer">${out}</a>`;
        break;
      }
    }
  }
  return out;
}

function renderInline(nodes = []) {
  return nodes.map((n) => {
    if (n.type === "text") return renderMarks(n.text ?? "", n.marks);
    if (n.type === "hardBreak") return "<br>";
    return "";
  }).join("");
}

function renderNode(node) {
  const c = node.content ?? [];

  switch (node.type) {
    case "doc":
      return c.map(renderNode).join("");

    case "paragraph":
      return c.length ? `<p>${renderInline(c)}</p>` : "<p><br></p>";

    case "heading": {
      const level = node.attrs?.level ?? 2;
      return `<h${level}>${renderInline(c)}</h${level}>`;
    }

    case "bulletList":
      return `<ul>${c.map(renderNode).join("")}</ul>`;

    case "orderedList":
      return `<ol>${c.map(renderNode).join("")}</ol>`;

    case "listItem":
      return `<li>${c.map(renderNode).join("")}</li>`;

    case "blockquote":
      return `<blockquote>${c.map(renderNode).join("")}</blockquote>`;

    case "codeBlock": {
      const lang = node.attrs?.language ? ` class="language-${escapeHtml(node.attrs.language)}"` : "";
      const code = c.map((n) => escapeHtml(n.text ?? "")).join("");
      return `<pre><code${lang}>${code}</code></pre>`;
    }

    case "horizontalRule":
      return "<hr>";

    // Standard Tiptap image
    case "image": {
      const src = escapeHtml(node.attrs?.src ?? "");
      const alt = escapeHtml(node.attrs?.alt ?? "");
      return `<img src="${src}" alt="${alt}" />`;
    }

    // Custom imageWithAlt node used in the editor
    case "imageWithAlt": {
      const src = escapeHtml(node.attrs?.src ?? "");
      const alt = escapeHtml(node.attrs?.alt ?? "");
      return `<figure><img src="${src}" alt="${alt}" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`;
    }

    default:
      // Unknown node — try to render children gracefully
      return c.length ? c.map(renderNode).join("") : "";
  }
}

export function tiptapToHtml(doc) {
  if (!doc || doc.type !== "doc") return "";
  return renderNode(doc);
}
