# 🚀 React Query Tutorial Project

A complete practical project demonstrating how to use **@tanstack/react-query** with **React + TypeScript** and a mock backend powered by **JSON Server**.

This project covers:

- 🔹 Querying data (`useQuery`)
- 🔹 Mutating data (`useMutation`)
- 🔹 Invalidating & refetching
- 🔹 Pagination
- 🔹 Search queries
- 🔹 Filtering
- 🔹 Prefetching (Next Page Optimizations)
- 🔹 Caching & `initialData`
- 🔹 Using `useIsFetching` for global loading states
- 🔹 AbortController for request cancellation
- 🔹 Dynamic query keys
- 🔹 CRUD with JSON Server (posts + comments)

---

# 📁 **Project Structure**

```
react-query-tutorial/
│
├── db.json                     # Fake backend using JSON Server
├── index.html
├── package.json
├── vite.config.ts
│
├── src/
│   ├── main.tsx                # React app entry + QueryClientProvider
│   ├── layouts/
│   │     └── Main.tsx
│   ├── pages/
│   │     ├── Home.tsx          # Home page listing posts
│   │     └── Info.tsx          # Post details + comments
│   ├── components/
│   │     ├── Post.tsx
│   │     ├── PostList.tsx
│   │     ├── PostFilter.tsx
│   │     └── SearchQuery.tsx
│   ├── hooks/
│   │     ├── useGetPosts.ts
│   │     ├── useGetPost.ts
│   │     ├── useSearch.ts
│   │     ├── useRemovePost.ts
│   │     ├── useAddComment.ts
│   │     └── useGetComments.ts
│   ├── types/
│   │     └── index.ts
│   └── vite-env.d.ts
```

---

# 🛠 **How to Run the Project**

### Install dependencies:

```bash
npm install
```

### Start JSON Server:

```bash
npm start
```

Runs at:
👉 `http://localhost:3009`

### Start Vite:

```bash
npm run dev
```

---

# 🗄 **Backend (JSON Server)**

The `db.json` includes:

### Posts

```json
{
  "id": 1,
  "title": "sunt aut facere...",
  "status": "published",
  "topRate": true
}
```

### Comments

```json
{
  "id": 1,
  "post_id": 3,
  "body": "first comment"
}
```

Filtering example used in the app:

```
/comments?post_id=3&_sort=id&_order=desc
```

---

# 🎯 **React Query Features Implemented**

## 1️⃣ **Fetching Posts (useQuery)**

File: `useGetPosts.ts`

Supports:

- Pagination
- Filtering by status
- Automatic refetch
- Stale time

```ts
const query = useQuery({
  queryKey: ["posts", { selectedStatus, paginate }],
  queryFn: () => fetchPosts(selectedStatus, paginate),
  staleTime: 10_000,
  refetchInterval: 15_000,
});
```

---

## 2️⃣ **Pagination + Prefetching**

Implemented inside `PostList.tsx`

```ts
useEffect(() => {
  const nextPage = paginate + 1;
  queryClient.prefetchQuery({
    queryKey: ["posts", { selectedStatus, paginate: nextPage }],
    queryFn: () => fetchPosts(selectedStatus, nextPage),
  });
}, [paginate]);
```

✔ Makes next page load instantly
✔ Great UX improvement

---

## 3️⃣ **Search (Dynamic Query Key)**

File: `useSearch.ts`

```ts
useQuery({
  queryKey: ["posts", "search", { q }],
  queryFn: () => fetchData(trimmed),
  enabled: trimmed.length > 0,
});
```

✔ Query runs only when user types
✔ Caches searches separately

---

## 4️⃣ **Fetching a Single Post with `initialData`**

File: `useGetPost.ts`

This pulls the post from cached paginated or search results:

```ts
initialData: () => {
  return cached?.find((post) => post.id === +id);
};
```

✔ No extra network call
✔ Instant UI

---

## 5️⃣ **Deleting a Post (useMutation + invalidation)**

File: `useRemovePost.ts`

```ts
const deletePost = async (postId: number) => axios.delete(`/posts/${postId}`);

useMutation({
  mutationFn: deletePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
  },
});
```

✔ Invalidates all pages of posts
✔ React Query automatically refetches

---

## 6️⃣ **Comments – Fetching with Abort Signal**

File: `useGetComments.ts`

```ts
queryFn: ({ signal }) => fetchComments(post_id, signal),
```

✔ Cancels previous request on rapid switching
✔ Prevents race conditions

---

## 7️⃣ **Creating Comments (useMutation)**

File: `useAddComment.ts`

```ts
const addComment = async (comment) => axios.post("/comments", comment);

useMutation({
  mutationFn: addComment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
  },
});
```

✔ Refreshes all comment sections
✔ Registers comment correctly in db.json

---

## 8️⃣ **Using `useIsFetching` for Global Loading**

File: `PostList.tsx`

```ts
const globalLoading = useIsFetching();

if (globalLoading) return <div>Loading...</div>;
```

✔ Shows a global loading spinner for ANY active request

---

## 9️⃣ **Filtering by Status**

File: `PostFilter.tsx`

```tsx
<Form.Select value={selectedStatus} onChange={onChangeHandler}>
  <option value="all">Select Status</option>
  <option value="published">Published</option>
  <option value="draft">Draft</option>
  <option value="block">Block</option>
</Form.Select>
```

---

## 🔟 **Query Keys Used Across the Project**

| Feature     | Query Key                               | Example                  |
| ----------- | --------------------------------------- | ------------------------ |
| Posts       | `["posts", {selectedStatus, paginate}]` | pagination & filters     |
| Search      | `["posts", "search", {q}]`              | per-search caching       |
| Single Post | `["post", {id}]`                        | detail page              |
| Comments    | `["comments", {post_id}]`               | per-post comment section |

---

# 🔍 **React Query Deep Dive: Core Concepts Explained**

It includes **invalidateQueries**, **useMutation**, **useQuery**, **queryClient**, **caching**, **refetching**, **staleTime**, **enabled**, and **query keys** — each with clear explanations and code examples directly from your project.

You can paste the section below anywhere inside your README.

---

# 🔥 React Query Deep Dive: Core Concepts Explained

This project uses many important React Query concepts.
Below is a deeper explanation of each concept and how it was applied with code examples from the project.

---

# 1️⃣ `useQuery` — Fetching & Caching Data

React Query’s `useQuery`:

- Fetches data
- Caches results
- Reuses cached data automatically
- Automatically refetches stale data
- Provides loading/error states

### Example from `useGetPosts.ts`

```ts
const query = useQuery({
  queryKey: ["posts", { selectedStatus, paginate }],
  queryFn: () => fetchPosts(selectedStatus, paginate),
  staleTime: 1000 * 10,
  refetchInterval: 1000 * 15,
});
```

### What this does:

- ✅ Unique cache entry based on `selectedStatus` & `paginate`
- ✅ Data stays “fresh” for 10 seconds
- ✅ After becoming stale, React Query refetches every 15 sec
- ✅ Cached pages load instantly when switching

### Why it’s powerful:

React Query removes the need for Redux/Context/UseState for server data — caching works automatically.

---

# 2️⃣ `useMutation` — Creating, Updating, Deleting Data

Mutations are used for:

- POST requests
- PUT/PATCH updates
- DELETE operations

They never cache results automatically — instead, you manually tell React Query what to “refresh”.

### Example: Adding a Comment (`useAddComment.ts`)

```ts
const addComment = async (comment: CommentItem) => {
  return axios.post("http://localhost:3009/comments", comment);
};

useMutation({
  mutationFn: addComment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
  },
});
```

### What this does:

- Sends POST `/comments`
- After a successful mutation → **invalidate all comment queries**
- React Query refetches comments automatically

---

# 3️⃣ `invalidateQueries` — Refresh Cached Data

You call `invalidateQueries` when you want to tell React Query:

> "This data is outdated — refetch it."

### Used after:

- Deleting a post
- Adding a comment

### Example: Delete Post (`useRemovePost.ts`)

```ts
queryClient.invalidateQueries({
  queryKey: ["posts"],
  exact: false,
});
```

### Why `{ exact: false }`?

It invalidates ALL queries that start with `"posts"`:

- `["posts", { selectedStatus: "all", paginate: 1 }]`
- `["posts", { selectedStatus: "draft", paginate: 2 }]`
- `["posts", "search", { q: 'hello' }]`

This ensures your entire posts list stays consistent everywhere.

---

# 4️⃣ `queryClient` — Manual Cache Control

React Query automatically manages cache, but you can take control:

### Common operations:

- `getQueryData` → read cache
- `setQueryData` → manually update cache
- `removeQueries` → clear cached data
- `prefetchQuery` → preload future data

### Example: Using cached posts (`useGetPost.ts`)

```ts
const cached = queryClient.getQueryData<PostItem[]>([
  "posts",
  { selectedStatus: "all", paginate: +paramKey },
]);

initialData: () => cached?.find((post) => post.id === +id);
```

### What this does:

- When user clicks a post → **detail page loads instantly**
- No refetch needed
- Prevents layout shifting

---

# 5️⃣ `prefetchQuery` — Load Next Page Before User Clicks

Used in `PostList.tsx`:

```ts
useEffect(() => {
  const nextPage = paginate + 1;
  queryClient.prefetchQuery({
    queryKey: ["posts", { selectedStatus, paginate: nextPage }],
    queryFn: () => fetchPosts(selectedStatus, nextPage),
  });
}, [paginate]);
```

### Result:

When user changes pages →
🔥 Page loads instantly
🔥 User never waits for loading spinner

This is called **Optimistic Prefetching**.

---

# 6️⃣ `useIsFetching` — Global Loading State

Instead of checking loading manually in every component:

```ts
const globalLoading = useIsFetching();
```

Used in `PostList.tsx`:

```ts
if (globalLoading) return <div>Loading...</div>;
```

### This displays a **single global loading indicator** for ALL ongoing queries.

---

# 7️⃣ `enabled` — Conditional Query Execution

Used in search:

```ts
enabled: trimmed.length > 0;
```

### Meaning:

Only fetch when user types
→ No blank search → No unnecessary request

This behaves like a built-in debounce.

---

# 8️⃣ `queryKey` — The Heart of React Query

### Query keys MUST be:

- Unique
- Stable
- Descriptive

### Examples in this project:

| Feature     | Query Key                               |
| ----------- | --------------------------------------- |
| Posts       | `["posts", {selectedStatus, paginate}]` |
| Search      | `["posts", "search", {q}]`              |
| Single Post | `["post", { id }]`                      |
| Comments    | `["comments", { post_id }]`             |

---

# 9️⃣ Request Cancellation with AbortController

React Query injects `signal` automatically.

In `useGetComments.ts`:

```ts
queryFn: ({ signal }) => axios.get(`/comments?post_id=${post_id}`, { signal });
```

### Why this matters:

If the user switches posts quickly:

- Previous request is aborted
- No race condition
- UI stays consistent

---

# 🔥 Complete Example of All Concepts Together

The comments system is the perfect example combining everything.

### **Hook: useGetComments.ts**

```ts
const fetchComments = async (post_id: string, signal: AbortSignal) => {
  return axios.get(`/comments?post_id=${post_id}&_sort=id&_order=desc`, {
    signal,
  });
};

useQuery({
  queryKey: ["comments", { post_id: +post_id }],
  queryFn: ({ signal }) => fetchComments(post_id, signal),
});
```

### **Hook: useAddComment.ts**

```ts
useMutation({
  mutationFn: addComment,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["comments"],
      exact: false,
    });
  },
});
```

### **UI: Info.tsx**

```ts
addComment.mutate(
  { body: comment, post_id: +id },
  { onSuccess: () => setComment("") }
);
```

### Combined Flow:

1. User submits a new comment → mutation triggers
2. React Query invalidates all `"comments"` queries
3. React Query automatically refetches comments
4. UI updates instantly with new data
5. old requests are cancelled automatically
6. cache ensures instant loading when returning

This is the **full power** of React Query.

---

# 📌 **Info Page (Post Details + Comments)**

File: `Info.tsx`

- Fetches the post by ID
- Fetches comments for that post
- Allows adding new comments
- Uses React Query invalidation to refresh instantly

Example:

```ts
addComment.mutate(
  { body: comment, post_id: +id },
  { onSuccess: () => setComment("") }
);
```

---

# ⭐ **Features Demonstrated in This Project**

✔ Data Fetching
✔ Pagination
✔ Search + Debounce-like behavior
✔ Mutations
✔ Updating cache with invalidation
✔ Error handling
✔ Global loading state
✔ Prefetching
✔ Caching & initialData
✔ Abort signal handling
✔ Filtering
✔ Dynamic routes + query params
✔ JSON Server integration

# 🎉 Final Thoughts

This project demonstrates **intermediate → advanced** React Query patterns used in real life:

✔ Caching
✔ Invalidation
✔ Mutations
✔ Prefetching
✔ Pagination
✔ Search
✔ Request cancellation
✔ Partial hydration with `initialData`
✔ Global loading state

This project teaches **real-world React Query usage**, not just basic examples.

---

# 📄 License

MIT License – free to use and modify.
