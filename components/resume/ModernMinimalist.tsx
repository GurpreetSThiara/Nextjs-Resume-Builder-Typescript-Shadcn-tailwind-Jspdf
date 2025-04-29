import { ResumeData } from "@/lib/types"
import React, { LegacyRef, useRef, useEffect } from 'react'

export default function ModernMinimalist({ 
  resumeData: data, 
  setResumeData, 
  pdfRef, 
  activeSection 
}: { 
  resumeData: ResumeData,
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>,
  pdfRef?: LegacyRef<HTMLDivElement> | undefined,
  activeSection?: string
}) {
  const visibleCustomFields = Object.values(data.custom).filter((field) => !field.hidden)
  
  // Refs for each section to scroll to
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const customFieldsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Effect to handle scrolling when activeSection changes
  useEffect(() => {
    if (!activeSection) return;
    
    // Determine which element to scroll to
    let elementToScroll: HTMLElement | null = null;
    
    if (activeSection === 'personal') {
      elementToScroll = personalInfoRef.current;
    } else if (activeSection === 'custom') {
      elementToScroll = customFieldsRef.current;
    } else if (activeSection.startsWith('section-')) {
      const sectionId = activeSection.replace('section-', '');
      elementToScroll = sectionRefs.current[sectionId] || null;
    }
    
    // Scroll to the element if found
    if (elementToScroll && pdfRef && typeof pdfRef !== 'function') {
      const container = (pdfRef as { current: HTMLDivElement | null }).current;
    
      if (!container) return; // extra safety
    
      const containerRect = container.getBoundingClientRect();
      const elementRect = elementToScroll.getBoundingClientRect();
    
      const scrollTop = elementRect.top - containerRect.top + container.scrollTop - 20;
    
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [activeSection, pdfRef]);

  const handleNameChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newValue = e.currentTarget.textContent || '';
    setResumeData(prev => ({...prev, name: newValue}));
  };

  const handleContactInfoChange = (e: React.FormEvent<HTMLDivElement>, key: string) => {
    const content = e.currentTarget.textContent || '';
    setResumeData(prev => ({
      ...prev,
      [key]: content
    }));
  };

  const handleCustomItemChange = (id: string, field: 'title' | 'content', value: string) => {
    setResumeData(prev => {
      // Create a deep copy to preserve order
      const updatedResumeData = JSON.parse(JSON.stringify(prev));
      
      if (updatedResumeData.custom[id]) {
        // Update the specific field while preserving the object structure
        updatedResumeData.custom[id][field] = value;
      }
      
      return updatedResumeData;
    });
  };

  const handleSectionTitleChange = (sectionId: string, newTitle: string) => {
    setResumeData(prev => {
      // Create a deep copy to preserve order
      const updatedResumeData = JSON.parse(JSON.stringify(prev));
      
      const sectionIndex = updatedResumeData.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        updatedResumeData.sections[sectionIndex].title = newTitle;
      }
      
      return updatedResumeData;
    });
  };

  const handleSectionHeaderChange = (sectionId: string, originalKey: string, newText: string, position: 0 | 1) => {
    setResumeData(prev => {
      // Create a deep copy to preserve order
      const updatedResumeData = JSON.parse(JSON.stringify(prev));
      
      const sectionIndex = updatedResumeData.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return prev;
      
      const section = updatedResumeData.sections[sectionIndex];
      const keyParts = originalKey.split('|');
      const trimmedParts = keyParts.map(part => part.trim());
      trimmedParts[position] = newText;
      const newKey = trimmedParts.join(' | ');
      
      // Preserve the order of entries by creating a new ordered object
      if (originalKey !== newKey) {
        const orderedContent = {};
        // Get original keys to maintain order
        const originalKeys = Object.keys(section.content);
        
        originalKeys.forEach(k => {
          if (k === originalKey) {
            orderedContent[newKey] = section.content[originalKey];
          } else {
            orderedContent[k] = section.content[k];
          }
        });
        
        section.content = orderedContent;
      }
      
      return updatedResumeData;
    });
  };

  const handleBulletChange = (sectionId: string, key: string, index: number, newText: string) => {
    setResumeData(prev => {
      // Create a deep copy to preserve order
      const updatedResumeData = JSON.parse(JSON.stringify(prev));
      
      const sectionIndex = updatedResumeData.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return prev;
      
      const section = updatedResumeData.sections[sectionIndex];
      // Directly update the bullet at the specific index
      if (section.content[key] && section.content[key][index] !== undefined) {
        section.content[key][index] = newText;
      }
      
      return updatedResumeData;
    });
  };

  return (
    <div ref={pdfRef} className="max-w-3xl mx-auto p-4 bg-white text-gray-900 text-[0.875rem] leading-relaxed">
      {/* Header */}
      <header ref={personalInfoRef} className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-300 pb-2">
        <div>
          <h1 
            className="text-2xl font-bold tracking-tight"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleNameChange}
          >
            {data.name}
          </h1>
        </div>
        <div className="mt-2 md:mt-0 md:text-right text-[0.8rem] space-y-0.5">
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContactInfoChange(e, "email")}
          >
            {data.email}
          </div>
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContactInfoChange(e, "phone")}
          >
            {data.phone}
          </div>
          <div
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContactInfoChange(e, "location")}
          >
            {data.location}
          </div>
          {data.linkedin && (
            <div
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContactInfoChange(e, "linkedin")}
            >
              {data.linkedin}
            </div>
          )}
        </div>
      </header>

      {/* Custom Fields */}
      {visibleCustomFields.length > 0 && (
        <div ref={customFieldsRef} className="columns-2 md:columns-3 gap-4 mb-4 text-[0.8rem]">
          {visibleCustomFields.map((field) => (
            <div key={field.id} className="mb-2 break-inside-avoid flex">
              <span 
                className="font-semibold capitalize mr-1"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleCustomItemChange(field.id, 'title', e.currentTarget.textContent?.replace(/:/g, '') || '')}
              >
                {field.title.replace(/_/g, " ")}:
              </span>
              {field.link ? (
                <a
                  href={field.content.startsWith("http") ? field.content : `https://${field.content}`}
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleCustomItemChange(field.id, 'content', e.currentTarget.textContent || '')}
                >
                  {field.content}
                </a>
              ) : (
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleCustomItemChange(field.id, 'content', e.currentTarget.textContent || '')}
                >
                  {field.content}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Sections */}
      <main>
        {data.sections.map((section) => (
          <section 
            key={section.id} 
            className="mb-5"
            ref={(el) => { sectionRefs.current[section.id] = el; }}
          >
            <h2 
              className="text-lg font-semibold uppercase tracking-wide text-gray-800 mb-2 border-b border-gray-200 pb-1"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleSectionTitleChange(section.id, e.currentTarget.textContent || '')}
            >
              {section.title}
            </h2>
            {Object.entries(section.content).map(([title, details], index) => {
              const titleParts = title.split('|');
              const mainTitle = titleParts[0].trim();
              const subTitle = titleParts.length > 1 ? titleParts[1].trim() : '';
              
              return (
                <div key={index} className="mb-3">
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 
                      className="font-medium text-[0.875rem] text-gray-900"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleSectionHeaderChange(section.id, title, e.currentTarget.textContent || '', 0)}
                    >
                      {mainTitle}
                    </h3>
                    {title.includes("|") && (
                      <span 
                        className="text-gray-600 text-[0.75rem]"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleSectionHeaderChange(section.id, title, e.currentTarget.textContent || '', 1)}
                      >
                        {subTitle}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc list-outside ml-5 text-[0.85rem] text-gray-800 space-y-1">
                    {details.map((detail, i) => (
                      <li 
                        key={i}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleBulletChange(section.id, title, i, e.currentTarget.textContent || '')}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        ))}
      </main>
    </div>
  )
}