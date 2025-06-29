"use server";

import * as cheerio from 'cheerio';

export async function processDrupalHtml(html: string) {
  const backendUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

  if (!html || !backendUrl) {
    return html;
  }

  const $ = cheerio.load(html);

  $('img').each((i, element) => {
    const src = $(element).attr('src');
    if (src && src.startsWith('/')) {
      const newSrc = new URL(src, backendUrl).href;
      $(element).attr('src', newSrc);
    }
  });

  return $('body').html() || "";
}
