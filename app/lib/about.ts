import { fetchDrupalData } from './drupal';
import { processDrupalHtml } from './processHtml';
import { JsonApiResponse, DrupalNode, DrupalFile } from './type';
import { lang as idioma } from '../idioma-config';

interface AboutPageAttributes {
  title: string;
  body: { processed: string };
}
type AboutPageNode = DrupalNode & {
  attributes: AboutPageAttributes;
  relationships: {
    field_foto_de_perfil: {
      data: { id: string };
    };
  };
};

export interface ProcessedAboutPage {
  title: string;
  bodyHtml: string;
  imageUrl: string;
}

export async function getAboutPage(lang?: string): Promise<ProcessedAboutPage | null> {
  let routerEndpoint = '';
  
  if (lang === idioma.defaultLocale) {
    routerEndpoint = `/router/translate-path?path=/sobre`;
  } else {
    routerEndpoint = `/${lang}/router/translate-path?path=/sobre`;
  }

  const routerData = await fetchDrupalData<{ entity?: { uuid: string } }>(routerEndpoint);
  const pageUuid = routerData?.entity?.uuid;
  if (!pageUuid) {
    console.error("Decoupled Router não conseguiu encontrar o caminho '/sobre'");
    return null;
  }

  let pageEndpoint = ''
  if (lang === idioma.defaultLocale){
     pageEndpoint = `/jsonapi/node/page/${pageUuid}?include=field_foto_de_perfil`;
  } else {
     pageEndpoint = `/${lang}/jsonapi/node/page/${pageUuid}?include=field_foto_de_perfil`
  }

  const response = await fetchDrupalData<JsonApiResponse<AboutPageNode, DrupalFile>>(pageEndpoint);

  const pageData = response?.data;
  if (!pageData) return null;
  
  const image = response?.included?.find(
    (item) => item.id === pageData.relationships.field_foto_de_perfil.data.id
  );
  const descriptionHtml = await processDrupalHtml(pageData.attributes.body.processed);

  return {
    title: pageData.attributes.title,
    bodyHtml: descriptionHtml,
    imageUrl: image ? new URL(image.attributes.uri.url, process.env.NEXT_PUBLIC_DRUPAL_BASE_URL).href : '/placeholder.jpg',
  };
}