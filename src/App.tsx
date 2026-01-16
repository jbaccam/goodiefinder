import { Header } from './components/Header'
import { FilterBar } from './components/FilterBar'
import { JobList } from './components/JobList'
import { CompanyDirectory } from './components/CompanyDirectory'

function App() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Decorative background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-6xl text-lavender-light/20">~</div>
        <div className="absolute top-40 right-20 text-4xl text-dusty-pink-light/20">^..^</div>
        <div className="absolute bottom-40 left-1/4 text-5xl text-dusty-blue-light/20">~</div>
        <div className="absolute bottom-20 right-1/3 text-3xl text-soft-mint-light/20">=^..^=</div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto pb-8">
        <Header />
        <FilterBar />
        <CompanyDirectory />
        <JobList />
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-text-muted text-sm border-t border-cream-dark">
        <p>Made with love in Iowa</p>
        <p className="mt-1 text-lavender-light">~(=^..^=)~</p>
      </footer>
    </div>
  )
}

export default App
