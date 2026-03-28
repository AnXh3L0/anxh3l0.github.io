<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#fafafa;color:#27272a;line-height:1.6;padding:2rem 1rem}
          .container{max-width:42rem;margin:0 auto}
          .banner{background:#f0fdfa;border:1px solid #99f6e4;border-radius:.75rem;padding:1.25rem;margin-bottom:2rem}
          .banner p{font-size:.875rem;color:#0f766e}
          .banner a{color:#0d9488;text-decoration:underline}
          h1{font-size:1.5rem;font-weight:700;margin-bottom:.25rem}
          .description{color:#71717a;margin-bottom:2rem;font-size:.875rem}
          .item{border-bottom:1px solid #e4e4e7;padding:1.25rem 0}
          .item:last-child{border-bottom:none}
          .item h2{font-size:1rem;font-weight:600}
          .item h2 a{color:#18181b;text-decoration:none}
          .item h2 a:hover{color:#0d9488}
          .item .meta{font-size:.75rem;color:#a1a1aa;margin-top:.25rem}
          .item .summary{font-size:.875rem;color:#52525b;margin-top:.5rem}
          .tags{display:flex;gap:.375rem;flex-wrap:wrap;margin-top:.5rem}
          .tag{font-size:.6875rem;background:#f4f4f5;color:#52525b;padding:.125rem .5rem;border-radius:9999px}
          @media(prefers-color-scheme:dark){
            body{background:#09090b;color:#e4e4e7}
            .banner{background:#042f2e;border-color:#115e59}
            .banner p{color:#5eead4}
            .banner a{color:#2dd4bf}
            h1{color:#fafafa}
            .item{border-color:#27272a}
            .item h2 a{color:#fafafa}
            .item h2 a:hover{color:#2dd4bf}
            .item .summary{color:#a1a1aa}
            .tag{background:#27272a;color:#a1a1aa}
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
            <p>This is an <strong>RSS feed</strong>. Copy the URL into your feed reader to subscribe. <a href="https://aboutfeeds.com">What is RSS?</a></p>
          </div>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
              <div class="meta"><xsl:value-of select="pubDate"/></div>
              <p class="summary"><xsl:value-of select="description"/></p>
              <xsl:if test="category">
                <div class="tags">
                  <xsl:for-each select="category">
                    <span class="tag"><xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
