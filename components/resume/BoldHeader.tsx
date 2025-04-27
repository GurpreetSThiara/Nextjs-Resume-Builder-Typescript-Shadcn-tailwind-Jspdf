import {  ResumeProps } from "@/lib/types"

export default function BoldHeader({ pdfRef, font, theme, resumeData:data }:ResumeProps) {
    // Filter out hidden custom fields
    const visibleCustomFields = Object.values(data.custom).filter((field) => !field.hidden)

    console.log("visibleCustomFields", visibleCustomFields)
  
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800">
        {/* Header with name and contact info */}
        <header className="mb-8">
          <div className="border-b-4 border-gray-800 pb-2 mb-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{data.name}</h1>
          </div>
  
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg> */}
              {data.email}
            </div>
            <div className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg> */}
              {data.phone}
            </div>
            <div className="flex items-center">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg> */}
              {data.location}
            </div>
            {data.linkedin && (
              <div className="flex items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg> */}
                {data.linkedin}
              </div>
            )}
          </div>
  
          {/* Custom Fields */}
          {visibleCustomFields.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
              {visibleCustomFields.map((field) => (
                <div key={field.id} className="flex items-center">
                  <span className="font-medium capitalize mr-1">{field?.title?.replace(/_/g, " ")}:</span>
                  {field.link ? (
                    <a
                      href={field.content.startsWith("http") ? field.content : `https://${field.content}`}
                      className="text-gray-700 hover:underline"
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
        </header>
  
        {/* Main Content */}
        <main>
          {data.sections.map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase">{section.title}</h2>
              {Object.entries(section.content).map(([title, details], index) => (
                <div key={index} className="mb-6">
                  {title.includes("|") ? (
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 border-b border-gray-200 pb-1">
                      <h3 className="font-bold text-gray-800">{title.split("|")[0].trim()}</h3>
                      <div className="text-gray-600">{title.split("|")[1].trim()}</div>
                    </div>
                  ) : (
                    <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">{title}</h3>
                  )}
                  <ul className="space-y-2 text-gray-700 mt-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span>{detail}</span>
                      </li>
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