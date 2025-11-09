export default function AddRecForm({
  closeDialog,
  selectedManga,
  setSelectedManga,
}) {
  const manga = selectedManga.manga;
  console.log(selectedManga);
  return (
    <>
      {/* form of the selected manga*/}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded p-3 bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          <button
            onClick={() => setSelectedManga({ selected: false, object: {} })}
          >
            dummy back button
          </button>

          {/* header */}
          <div>
            <h1 className="text-lg font-semibold">Add Your Recommendation</h1>
            <h2>Share your thoughts about {manga.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
