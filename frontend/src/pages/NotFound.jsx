import { Link } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 px-6 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <img
          src="/Logo%20image.png"
          alt="Foxelton logo"
          className="h-24 w-24 rounded-3xl object-cover shadow-2xl shadow-purple-500/20 ring-1 ring-white/10"
        />

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur">
          <Construction className="h-4 w-4 text-purple-300" />
          Feature still in development
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          This page does not exist yet.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
          The route you opened is not available in this build, or it has not been wired up yet.
          We’ll show it here once the feature ships.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
