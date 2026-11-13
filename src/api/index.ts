import { BlogPost } from "@/services/BlogAPI";
import { error } from "console";

// fetchGET(`/api/blog/posts/123/comments`);

const authHeaders = {
  "Content-Type": "application/json",
  // 'Authorization': `Bearer ${'tajnytoken'}`
};

const baseUrl = `http://localhost:3000`;

/// ----

export async function fetchGET<T>(url: string): Promise<T> {
  try {
    const res = await fetch(`${baseUrl}${url}`, {});
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? "Unknown Error");
    }

    const data = await res.json();

    return data;
  } catch (e: unknown) {
    console.error(e);
    throw new Error(
      `Fetch API error - ${url} - ${e instanceof Error ? e.message : "Unknown errorF"} `,
    );
  }
}
export async function fetchPOST<TResBody, TBody = object>(
  url: string,
  body: TBody,
): Promise<TResBody> {
  try {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        ...authHeaders,
      },
      // credentials: 'include', // Cross-origin Cookies!?
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  } catch (e: unknown) {
    console.error(e);

    throw new Error(
      `Fetch API error - ${url} - ${e instanceof Error ? e.message : "Unknown errorF"} `,
    );
  }
}

// fetchGET<BlogPost["comments"]>("");

// fetchPOST("", {
//   user: "asdf",
//   comment: "123",
// });
