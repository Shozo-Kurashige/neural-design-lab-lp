// client/src/lib/wordpress.ts

const API_URL = import.meta.env.VITE_WORDPRESS_API_URL as string;

async function fetchAPI(
  query: string,
  { variables }: { variables?: any } = {},
) {
  if (!API_URL) {
    throw new Error("VITE_WORDPRESS_API_URL が設定されていません");
  }

  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`WordPress API エラー: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          title
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    `,
  );
  return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    },
  );
  return data?.post;
}
