import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "lucide-react";

function App() {
  const [search, setSearch] = useState("");
  const [travelData, setTravelData] = useState([]);

  const getTravelData = async () => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${search}`,
    );
    setTravelData(response.data.data);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTagClick = (tag) => {
    const keywords = search.trim().split(/\s+/).filter((value) => value.trim() !== "");
  
    if (keywords.includes(tag)) {
      return;
    }
    const newSearch = [...keywords, tag].join(" ");
    setSearch(newSearch);
  };

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("คัดลอกลิงก์แล้ว!");
    } catch (error) {
      alert("คัดลอกไม่สำเร็จ");
    }
  };

  useEffect(() => {
    getTravelData();
  }, [search]);

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          <h1 className="text-center text-4xl font-bold text-sky-400">
            เที่ยวไหนดี
          </h1>

          <div className="mt-8">
            <label
              htmlFor="search"
              className="mb-1 block text-sm text-gray-700"
            >
              ค้นหาที่เที่ยว
            </label>
            <input
              id="search"
              type="text"
              placeholder="หาที่เที่ยวแล้วไปกัน ..."
              className="w-full border-b border-gray-300 py-2 text-center text-gray-400 outline-none placeholder:text-gray-400"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </header>

        <section className="flex flex-col gap-12">
          {travelData.map((trip) => (
            <article key={trip.eid} className="flex gap-6">
              <img
                src={trip.photos[0]}
                alt={trip.title}
                className="h-50 w-72 shrink-0 rounded-3xl object-cover"
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-bold">
                    <a
                      href={trip.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black hover:underline"
                    >
                      {trip.title}
                    </a>
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {trip.description.length > 100
                      ? trip.description.slice(0, 100) + "..."
                      : trip.description}
                  </p>
                  <a
                    href={trip.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline text-sm"
                  >
                    อ่านต่อ
                  </a>

                  <p className="mt-3 flex gap-2 flex-wrap text-sm text-gray-700">
                    <span>หมวด </span>
                    {trip.tags.map((tag) => (
                      <span
                        key={tag}
                        className="underline cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}{" "}
                      </span>
                    ))}
                  </p>

                  <div className="flex justify-between">
                    <div className="mt-3 flex gap-6">
                      {trip.photos.slice(1, 4).map((photo) => (
                        <img
                          key={photo}
                          src={photo}
                          alt={`${trip.title} gallery`}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => handleCopyLink(trip.url)}
                      aria-label={`คัดลอกลิงก์ ${trip.title}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full bg-white border border-sky-400 mt-auto cursor-pointer"
                    >
                      <Link className="w-5 h-5 text-sky-400" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
