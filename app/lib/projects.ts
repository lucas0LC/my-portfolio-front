import { processDrupalHtml } from './processHtml';
import { fetchDrupalData } from './drupal';
import { JsonApiResponse, Project, DrupalFile, Technology, ProcessedProject, DecoupledRouterResponse } from './type';
import { lang as idioma} from '../idioma-config';

const PROJECTS_INCLUDES = 'field_imagem_de_destaque,field_tecnologias';

async function processProjectData(projectData: JsonApiResponse<Project | Project[], any>): Promise<ProcessedProject[]> {
  const projects = Array.isArray(projectData.data) ? projectData.data : [projectData.data];
  const included = projectData.included || [];

  const processedProjects = await Promise.all(projects.map(async (project) => {
    const featuredImage = included.find(
      (element): element is DrupalFile =>
        element.type === 'file--file' && element.id === project.relationships.field_imagem_de_destaque.data?.id
    );

    const technologies = project.relationships.field_tecnologias.data
      .map(ref => {
        const tech = included.find(
          (element): element is Technology => 
            element.type === 'taxonomy_term--tecnologias' && element.id === ref.id
        );
        return tech?.attributes.name;
      })
      .filter(Boolean) as string[];

    const descriptionHtml = await processDrupalHtml(project.attributes.field_descricao.processed);

    return {
      id: project.id,
      title: project.attributes.title,
      subtitle: project.attributes.field_subtitulo,
      summary: project.attributes.field_descricao.summary,
      descriptionHtml: descriptionHtml,
      projectUrl: project.attributes.field_url_do_projeto.uri,
      repositoryUrl: project.attributes.field_url_do_repositorio.uri,
      path: project.attributes.path.alias,
      imageUrl: featuredImage ? new URL(featuredImage.attributes.uri.url, process.env.NEXT_PUBLIC_DRUPAL_BASE_URL).href : '/placeholder.jpg',
      imageAlt: featuredImage?.attributes.filename || 'Imagem de destaque do projeto',
      technologies,
      destaque_na_homepage:project.attributes.field_destaque_na_homepage,
    };
  }));

  return processedProjects;
}

export async function getProjects(lang?: string): Promise<ProcessedProject[]> {
  const endpointLangPrefix = lang === idioma.defaultLocale ? '' : `/${lang}`;
  const endpoint = `${endpointLangPrefix}/jsonapi/node/projeto?include=${PROJECTS_INCLUDES}&sort=-created`;

  const drupalData = await fetchDrupalData<JsonApiResponse<Project[]>>(endpoint);
  
  if (!drupalData || !drupalData.data) return [];
  
  return processProjectData(drupalData);
}

export async function getProjectBySlug(slug: string, lang?: string): Promise<ProcessedProject | null> {
  const path = `/projetos/${slug}`;
  const routerLangPrefix = lang === idioma.defaultLocale ? '' : `/${lang}`;
  const routerEndpoint = `${routerLangPrefix}/router/translate-path?path=${path}`;

  const routerData = await fetchDrupalData<DecoupledRouterResponse>(routerEndpoint);
  const projectUuid = routerData?.entity?.uuid;
  if (!projectUuid) return null;

  const endpointLangPrefix = lang === idioma.defaultLocale ? '' : `/${lang}`;
  const endpoint = `${endpointLangPrefix}/jsonapi/node/projeto/${projectUuid}?include=${PROJECTS_INCLUDES}`;

  const drupalData = await fetchDrupalData<JsonApiResponse<Project>>(endpoint);
  
  if (!drupalData || !drupalData.data) return null;
  
  const processedData = await processProjectData(drupalData);
  const project = processedData[0];
  
  return { ...project};
}

export async function getProjectPathById (projectUuid: string, lang?: string): Promise<string | null> {
  const endpointLangPrefix = lang === idioma.defaultLocale ? '' : `/${lang}`;
  const endpoint = `${endpointLangPrefix}/jsonapi/node/projeto/${projectUuid}?include=${PROJECTS_INCLUDES}&sort=-created`;

  const drupalData = await fetchDrupalData<JsonApiResponse<Project>>(endpoint);
  
  if (!drupalData || !drupalData.data) return null;
  
  const processedData = await processProjectData(drupalData);
  const project = processedData[0];
  const path = project.path;

  return path;
}

