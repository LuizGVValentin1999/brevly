import { useState } from "react";
import { Link, DownloadSimple } from "phosphor-react";

export function App() {
  const [focusedInput, setFocusedInput] = useState<"original" | "short" | null>(null);
  const [shortValue, setShortValue] = useState("");
  
  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-10 ">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="w-24 pl-1 mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 items-start">
          {/* Card - Novo link */}
          <section className="p-8 bg-white rounded-lg">
            <h2 className="mb-6 text-lg font-bold">Novo link</h2>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="original"
                      className={`block mb-1  font-normal transition-colors ${
                        focusedInput === "original" ? "text-blue-base" : "text-gray-500"
                      }`}
                    >
                      LINK ORIGINAL
                    </label>
                    <input
                      id="original"
                      type="text"
                      placeholder="www.exemplo.com.br"
                      onFocus={() => setFocusedInput("original")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full px-4 py-4 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-base focus:border-blue-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="short"
                      className={`block mb-1  font-normal transition-colors ${
                        focusedInput === "short" ? "text-blue-base" : "text-gray-500"
                      }`}
                    >
                      LINK ENCURTADO
                    </label>
                    <div className="flex items-center w-full px-4 py-4 transition-colors bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-base focus-within:border-blue-base">
                      <span className="text-sm text-gray-500 select-none ">brev.ly/</span>
                      <input
                        id="short"
                        type="text"
                        value={shortValue}
                        onChange={(e) => setShortValue(e.target.value)}
                        onFocus={() => setFocusedInput("short")}
                        onBlur={() => setFocusedInput(null)}
                        className="text-sm text-gray-700 bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button className="h-12 px-1 font-semibold text-white transition-colors rounded-lg text-md bg-blue-base hover:bg-blue-dark">
                  Salvar link
                </button>
            </div>
          </section>

          {/* Card - Meus links */}
          <section className="p-8 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Meus links</h2>
              <button className="flex items-center gap-2 text-gray-500 bg-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-200 transition">
                <DownloadSimple size={16} className="text-gray-600" weight="regular" />
                Baixar CSV
              </button>
            </div>
            <div className="w-full h-px bg-gray-200" />
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-gray-500">
              <Link className="w-8 h-8 text-gray-400" />
              <span>AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}