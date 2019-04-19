"use strict";

function removeFbclid(window = window) {
  const currentHref = window.location.href;
  if (!currentHref) return;
  if (typeof currentHref !== "string") return;

  const questionmarkIndex = currentHref.indexOf("?");
  if (questionmarkIndex === -1) return;

  const url = currentHref.substring(0, questionmarkIndex);
  const hashIndex = currentHref.indexOf("#");

  const query =
    hashIndex !== -1
      ? currentHref.substr(questionmarkIndex + 1, hashIndex - questionmarkIndex - 1)
      : currentHref.substr(questionmarkIndex + 1);

  const hash = hashIndex !== -1 ? currentHref.substr(hashIndex + 1) : undefined;

  const params = query.split("&").filter(param => !param.startsWith("fbclid="));

  const newHref = url + (params.length ? "?" + params.join("&") : "") + (hash !== undefined ? "#" + hash : "");
  if (window.history && window.history.replaceState) {
    window.history.replaceState(undefined, undefined, newHref);
  } else {
    window.location.replace(newHref);
  }
}
module.exports = removeFbclid;
