import { redirect } from "next/navigation";

export default function GoToBlog() {
  /* 
    This function allows you to redirect the user to another URL. It can be used in Server Components, Route Handlers, and Server Actions.

    In a Server Component, this will insert a meta tag to redirect the user to the target page.
    In a Route Handler, it will serve a 307 to the caller.
    In a Server Action, it will perform a client-side navigation when JavaScript is available or serve a 303 for a progressive enhancement form submission.
    In a Server Action, type defaults to 'push' and 'replace' elsewhere.
*/
  redirect("/blog", "replace");

  //   return <>Never renders!</>
}
