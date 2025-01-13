// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export const middleware = (request) => {
//   const path = request.nextUrl.pathname;
//   const checkPublicPath = path === "/signup" || path === "/login";
//   const getCookies = cookies();
//   const token = getCookies.get("token")?.value || "";

//   if (checkPublicPath && token !== "") {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!checkPublicPath && token == "") {
//     return NextResponse.redirect(new URL("/signup", request.nextUrl));
//   }
// };

// export const config  = {
//   matcher: ["/signup", "/login"],
// };
