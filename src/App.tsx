import { CheckIcon, FilmIcon } from "lucide-react";
import { useState } from "react";
import Navbar from "./components/common/Navbar";

const MARKING_SCHEME = {
  pass_criteria: "90 Hours",
  event_contribution: [
    { activity: "Attending Official meetings (Offline)", hours: 2 },
    { activity: "Attending Events", hours: 2 },
    { activity: "Being part of Organizing Committee", hours: 3 },
  ],
  committee_contribution: {
    artistic: [
      { activity: "Acting in marketing reels", hours: 2 },
      { activity: "YouTube Vlogs/Insta Content", hours: 2 },
    ],
    content: [
      { activity: "Content ideas (Posts/Reels)", hours: 2 },
      { activity: "Taking MoM for meetings", hours: 2 },
    ],
    design: [{ activity: "Creating poster/insta post designs", hours: 4 }],
    editing: [
      { activity: "Promo edits", hours: 2 },
      { activity: "Marketing reel edits", hours: 2 },
      { activity: "Aftermovies", hours: 2 },
      { activity: "Fan Edits", hours: 2 },
    ],
    event_management: [
      { activity: "Pitching Event Ideas", hours: 2 },
      { activity: "Event coordinator", hours: 4 },
      { activity: "Other volunteering", hours: 2 },
    ],
    marketing: [
      { activity: "Desk Marketing", hours: "Duration based" },
      { activity: "Proposing Reel ideas", hours: 2 },
    ],
    photography: [
      { activity: "Event photographer", hours: 4 },
      { activity: "Reel shoot", hours: 2 },
    ],
    social_media: [
      { activity: "Content for weekly posts", hours: 2 },
      { activity: "Providing ideas for posts", hours: 2 },
    ],
  },
  creative_contributions: {
    project_type: "Short Film",
    requirements: ["Team of 10 max", "Minimum 5 mins long"],
    role_allocations: [
      { role: "Director", hours: 10 },
      { role: "Writer", hours: 6 },
      { role: "Cinematographer", hours: 8 },
      { role: "Editor", hours: 8 },
      { role: "Music", hours: 6 },
      { role: "Asst. Director", hours: 6 },
      { role: "Posters", hours: 4 },
      { role: "Lead Actors", hours: 8 },
      { role: "Supporting Actors", hours: 6 },
      { role: "Junior Artists", hours: 4 },
    ],
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-800">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <CheckIcon className="w-4 h-4 text-indigo-600" />
            Official Hours Tracking Portal
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            From Script to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Screen.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            VITSION is the premier filmmaking club. We visualize, we create, and
            we inspire. Track your FFCS contribution hours seamlessly and manage
            your creative journey.
          </p>

          {/* The Goal Card */}
          <div className="mt-12 inline-block">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl flex flex-col items-center shadow-xl shadow-slate-200/50">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Your Target
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-6xl font-extrabold text-slate-800 tracking-tighter">
                  {MARKING_SCHEME.pass_criteria}
                </span>
                <span className="text-green-600 font-semibold text-lg">
                  to pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marking Scheme Section */}
      <section className="py-20 bg-white border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Marking Scheme
            </h2>
            <p className="text-slate-500 text-lg">
              How you can earn your credits.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 p-1 rounded-xl inline-flex border border-slate-200">
              {["general", "committees", "short film"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? "bg-white text-indigo-600 shadow-sm border border-slate-200"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            {/* GENERAL TAB */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                {MARKING_SCHEME.event_contribution.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-lg hover:border-indigo-200 transition-all group"
                  >
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
                      <span className="font-bold text-xl">{item.hours}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {item.activity}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      General contribution
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* COMMITTEES TAB */}
            {activeTab === "committees" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {Object.entries(MARKING_SCHEME.committee_contribution).map(
                  ([dept, activities]) => (
                    <div
                      key={dept}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 capitalize flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          {dept.replace("_", " ")}
                        </h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {activities.map((act, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-slate-600 font-medium">
                              {act.activity}
                            </span>
                            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded font-bold border border-indigo-100">
                              {act.hours}
                              {typeof act.hours === "number" && "h"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* SHORT FILM TAB - Project File Style */}
            {activeTab === "short film" && (
              <div className="animate-fade-in max-w-4xl mx-auto">
                <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-lg relative">
                  <div className="text-center mb-10">
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Production Requirements
                    </span>
                    <h3 className="text-3xl font-bold text-slate-800 mt-2 mb-4">
                      The Short Film Project
                    </h3>
                    <div className="flex justify-center gap-4 text-sm text-slate-600">
                      {MARKING_SCHEME.creative_contributions.requirements.map(
                        (req, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-medium"
                          >
                            {req}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    {MARKING_SCHEME.creative_contributions.role_allocations.map(
                      (role, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-end border-b border-slate-100 pb-2 group hover:border-slate-300 transition-colors"
                        >
                          <span className="text-slate-700 font-medium text-lg">
                            {role.role}
                          </span>
                          <span className="text-indigo-600 font-bold text-xl">
                            {role.hours}{" "}
                            <span className="text-xs text-slate-400 font-normal">
                              HRS
                            </span>
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-10 text-center">
                    <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                      Vitsion Productions • 2025
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FilmIcon className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-slate-800">VITSION</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} VITSION Club. All rights reserved.{" "}
            <br />
            Built for the creative minds of tomorrow.
          </p>
        </div>
      </footer>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
