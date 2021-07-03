export const updateNote = (token, id, title, content) => {
  return fetch("/api/notes/" + id, {
    headers: {
      "api-token": token,
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      content: content
    })
  })
    .then((res) => res.json())
};