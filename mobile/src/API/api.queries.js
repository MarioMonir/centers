import { stringify } from "query-string";

// =================================================================

const endpoints = (builder) => ({
  // ------------------------------------------------

  login: builder.mutation({
    query: ({ email, password }) => ({
      url: "/oauth/login",
      method: "POST",
      body: { email, password },
    }),
  }),

  // ------------------------------------------------

  register: builder.mutation({
    query: ({ email, password, name, userType }) => ({
      url: "/oauth/register",
      method: "POST",
      body: { email, password, name, userType },
    }),
  }),

  // ------------------------------------------------

  me: builder.query({
    query: () => ({
      url: "/oauth/me",
      method: "GET",
    }),
  }),

  // ------------------------------------------------

  create: builder.mutation({
    query: ({ entity, body }) => ({
      url: `/${entity}`,
      method: "POST",
      body,
    }),
  }),

  // ------------------------------------------------

  getList: builder.query({
    query: ({ entity }) => ({
      url: `/${entity}`,
      method: "GET",
    }),
  }),

  // ------------------------------------------------

  getOne: builder.query({
    query: ({ entity, id }) => ({
      url: `/${entity}/${id}`,
      method: "GET",
    }),
  }),

  // ------------------------------------------------

  update: builder.mutation({
    query: ({ entity, id, body }) => ({
      url: `/${entity}/${id}`,
      method: "PUT",
      body,
    }),
  }),

  // ------------------------------------------------

  deleteOne: builder.query({
    query: ({ entity, id }) => ({
      url: `/${entity}/${id}`,
      method: "DELETE",
    }),
  }),

  // ------------------------------------------------

  search: builder.query({
    query: ({ entity, filter }) => {
      const query = {
        // sort: JSON.stringify(["id", sortBy || "ASC"]),
        // range: JSON.stringify([rangeStart, rangeEnd]),
        filter: JSON.stringify(filter),
      };
      const url = `/${entity}/?${stringify(query)}`;
      return { url, method: "GET" };
    },
  }),

  // ------------------------------------------------
});

// =============================================================

export default endpoints;
