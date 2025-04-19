import { ResumeData } from "@/lib/types"

export default function ModernMinimalist({ resumeData: data }: { resumeData: ResumeData }) {
  const visibleCustomFields = Object.values(data.custom).filter((field) => !field.hidden)

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white text-gray-900 text-[0.875rem] leading-relaxed">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-300 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
        </div>
        <div className="mt-2 md:mt-0 md:text-right text-[0.8rem] space-y-0.5">
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.location}</div>
          {data.linkedin && <div>{data.linkedin}</div>}
        </div>
      </header>

      {/* Custom Fields */}
      {visibleCustomFields.length > 0 && (
  <div className="columns-2 md:columns-3 gap-4 mb-4 text-[0.8rem]">
    {visibleCustomFields.map((field) => (
      <div key={field.id} className="mb-2 break-inside-avoid flex">
        <span className="font-semibold capitalize mr-1">{field.title.replace(/_/g, " ")}:</span>
        {field.link ? (
          <a
            href={field.content.startsWith("http") ? field.content : `https://${field.content}`}
            className="text-blue-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {field.content}
          </a>
        ) : (
          <span>{field.content}</span>
        )}
      </div>
    ))}
  </div>
)}


      {/* Main Sections */}
      <main>
        {data.sections.map((section) => (
          <section key={section.id} className="mb-5">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-800 mb-2 border-b border-gray-200 pb-1">
              {section.title}
            </h2>
            {Object.entries(section.content).map(([title, details], index) => (
              <div key={index} className="mb-3">
                <div className="flex flex-col md:flex-row md:justify-between mb-1">
                  <h3 className="font-medium text-[0.875rem] text-gray-900">
                    {title.split("|")[0].trim()}
                  </h3>
                  {title.includes("|") && (
                    <span className="text-gray-600 text-[0.75rem]">
                      {title.split("|")[1].trim()}
                    </span>
                  )}
                </div>
                <ul className="list-disc list-outside ml-5 text-[0.85rem] text-gray-800 space-y-1">
                  {details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}
