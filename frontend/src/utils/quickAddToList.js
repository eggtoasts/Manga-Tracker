import axios from "axios";

export async function quickAddToList(manga, user) {
  console.log(user);
  console.log(manga);
  if (!user || !user.id) {
    console.log("Please login to add manga to your list");
    return;
  }

  const ENDPOINT = "http://localhost:3000/userlist";
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("JWT missing. log in again.");
    return;
  }

  try {
    await axios.post(
      ENDPOINT,
      {
        mangaId: manga.id,
        name: manga.name,
        description: manga.description,
        cover_image: manga.image,
        authors: manga.authors,
        rating: manga.score,
        genres: manga.genres,
        total_chapters: manga.chapters,
        manga_status: manga.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`Add Success! "${manga.name}" added as "Reading".`);
  } catch (error) {
    console.log("add failed:", error);
  }
}
