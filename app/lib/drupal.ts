/**
 * Busca dados da API JSON:API do Drupal de forma segura.
 * Utiliza um tipo genérico <T> para que o chamador possa definir a estrutura de dados esperada.
 * @param {string} endpoint - O endpoint da API para buscar (ex: /jsonapi/node/projetos).
 * @returns {Promise<T | null>} Uma promessa que resolve para os dados tipados ou nulo em caso de erro.
 */
export async function fetchDrupalData<T>(endpoint: string): Promise<T | null> {
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

  try {
    const url = new URL(endpoint, baseUrl);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Drupal: ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    return data;

  } catch (error) {
    console.error("Falha ao buscar dados do Drupal:", error);
    return null;
  }
}