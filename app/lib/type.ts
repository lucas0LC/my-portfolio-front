import { Locale } from "../idioma-config";

export interface JsonApiResponse<T, I = any> {
  data: T;
  included?: I[];
}

export interface DrupalNode {
  type: string;
  id: string;
}

interface EntityReference {
  data: {
    type: string;
    id: string;
  } | null;
}

export interface TechnologyAttributes {
  name: string;
}
export type Technology = DrupalNode & { attributes: TechnologyAttributes };

export interface FileAttributes {
  uri: {
    url: string;
  };
  filename: string;
}
export type DrupalFile = DrupalNode & { attributes: FileAttributes };

export interface ProjectAttributes {
  title: string;
  field_subtitulo: string;
  field_descricao: {
    processed: string;
    summary: string;
  };
  field_url_do_projeto: { uri: string };
  field_url_do_repositorio: { uri: string };
  path: { alias: string };
  field_destaque_na_homepage: boolean;
}

export type Project = DrupalNode & {
  type: 'node--projeto';
  attributes: ProjectAttributes;
  relationships: {
    field_imagem_de_destaque: EntityReference;
    field_tecnologias: {
      data: {
        type: string;
        id: string;
      }[];
    };
  };
};

export interface ProcessedProject {
  id: string;
  title: string;
  subtitle: string;
  descriptionHtml: string;
  summary: string;
  projectUrl: string;
  repositoryUrl: string;
  path: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  destaque_na_homepage: boolean;
  translations?: Partial<Record<Locale, string>>;
}

export interface DecoupledRouterResponse {
  entity?: { uuid: string };
  resolved: string;
  is_home_path?: boolean;
  translations?: {
    [key: string]: {
      path: string;
    };
  };
}