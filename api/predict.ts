export async function predictTrash() {
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  const response = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log(result.data);
  return result.data;
}
