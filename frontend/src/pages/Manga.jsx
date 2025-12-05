import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
export default function Manga() {
  const { mangaId } = useParams();
  const [manga, setManga] = useState(" ");

  //on mount, get info on manga id
  useEffect(() => {
    const ENDPOINT = `http://localhost:3000/mangas/${mangaId}`;
    const getManga = async (mangaId) => {
      try {
        const response = await axios.get(ENDPOINT);
        const mangaInfo = response.data;
        setManga(mangaInfo);
        console.log(mangaInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getManga(mangaId);
  }, []);

  return (
    <>
      <p>{manga.name}</p>
    </>
  );
}
