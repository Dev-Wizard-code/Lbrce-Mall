export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Campus Events</h1>
        <p className="text-muted-foreground">Stay updated with LBRCE campus activities</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Tech Fest 2024</h3>
              <p className="text-muted-foreground">Annual technology festival</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Upcoming</span>
          </div>
          <p className="mb-4">Join us for workshops, competitions, and tech talks by industry experts.</p>
          <div className="text-sm text-muted-foreground">
            <p>📅 Date: January 15-17, 2024</p>
            <p>📍 Location: Main Campus</p>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Cultural Night</h3>
              <p className="text-muted-foreground">Celebrate diversity and talent</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">This Week</span>
          </div>
          <p className="mb-4">An evening of music, dance, and cultural performances by students.</p>
          <div className="text-sm text-muted-foreground">
            <p>📅 Date: December 22, 2024</p>
            <p>📍 Location: Auditorium</p>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Career Fair</h3>
              <p className="text-muted-foreground">Meet top recruiters</p>
            </div>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Next Month</span>
          </div>
          <p className="mb-4">Connect with leading companies and explore career opportunities.</p>
          <div className="text-sm text-muted-foreground">
            <p>📅 Date: February 5-6, 2024</p>
            <p>📍 Location: Sports Complex</p>
          </div>
        </div>
      </div>
    </div>
  )
}
