"use client";

import { useState } from "react";
import { Download, Film, Check, X } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import axios from "axios";

function App() {
  const [animeUrl, setAnimeUrl] = useState("");
  const [resolution, setResolution] = useState("1080p");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get<{
        links: string[];
      }>(import.meta.env.VITE_API_URL + "/", {
        params: {
          url: animeUrl,
          resolution,
        },
      });
      response.data.links.forEach((link) => {
        window.open(link, "_blank");
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(getErrorMessage(error));
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-clip bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-md">
        {/* Main card with glassmorphism effect */}
        <div className="relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-8">
          <div className="mb-6 flex items-center justify-center">
            <Film className="mr-2 h-8 w-8 text-pink-300" />
            <h1 className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-3xl font-bold text-transparent">
              AniFetch
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="animeUrl"
                className="block w-max text-sm font-medium text-pink-100"
              >
                Anime URL
              </label>
              <input
                type="url"
                id="animeUrl"
                value={animeUrl}
                onChange={(e) => setAnimeUrl(e.target.value)}
                placeholder="https://animepahe.ru/anime/..."
                required
                className="trans-all w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 backdrop-blur-sm focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block w-max text-sm font-medium text-pink-100">
                Resolution
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resolution"
                    value="720p"
                    checked={resolution === "720p"}
                    onChange={() => setResolution("720p")}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "trans-all flex h-12 w-16 items-center justify-center rounded-lg border-2",
                      resolution === "720p"
                        ? "border-pink-400 bg-pink-400/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <span className="font-medium text-white">720p</span>
                  </div>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resolution"
                    value="1080p"
                    checked={resolution === "1080p"}
                    onChange={() => setResolution("1080p")}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "trans-all flex h-12 w-16 items-center justify-center rounded-lg border-2",
                      resolution === "1080p"
                        ? "border-pink-400 bg-pink-400/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <span className="font-medium text-white">1080p</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !animeUrl}
              className={cn(
                "trans-all flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-medium",
                isLoading || !animeUrl
                  ? "cursor-not-allowed bg-white/10 text-white/50"
                  : isSuccess
                    ? "bg-green-500 text-white"
                    : isError
                      ? "bg-red-500 text-white"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
              )}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  Downloaded!
                </span>
              ) : isError ? (
                <span className="flex items-center">
                  <X className="mr-2 h-5 w-5" />
                  Failed!
                </span>
              ) : (
                <span className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/40">
            Download your favorite anime in high quality
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

