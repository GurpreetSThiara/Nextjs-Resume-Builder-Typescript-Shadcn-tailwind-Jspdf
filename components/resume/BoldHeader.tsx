import { ResumeProps } from "@/lib/types"
import React, { LegacyRef, useRef, useEffect } from 'react'

export default function BoldHeader({ pdfRef, font, theme, resumeData: data, setResumeData, activeSection }: ResumeProps) {
    // Filter out hidden custom fields
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
        keyParts[position] = newText;
        const newKey = keyParts.join('|');
        
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
      <div ref={pdfRef} className="max-w-4xl mx-auto p-8 bg-white text-gray-800">
        {/* Header with name and contact info */}
        <header ref={personalInfoRef} className="mb-8">
          <div className="border-b-4 border-gray-800 pb-2 mb-4">
            <h1
              className="text-4xl font-bold tracking-tight text-gray-900"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={handleNameChange}
            >
              {data.name}
            </h1>
          </div>
  
          <div className="flex flex-wrap gap-4 text-sm">
            <div
              className="flex items-center"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContactInfoChange(e, "email")}
            >
              {data.email}
            </div>
            <div 
              className="flex items-center"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContactInfoChange(e, "phone")}
            >
              {data.phone}
            </div>
            <div 
              className="flex items-center"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContactInfoChange(e, "location")}
            >
              {data.location}
            </div>
            {data.linkedin && (
              <div 
                className="flex items-center"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContactInfoChange(e, "linkedin")}
              >
                {data.linkedin}
              </div>
            )}
          </div>
  
          {/* Custom Fields */}
          {visibleCustomFields.length > 0 && (
            <div ref={customFieldsRef} className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
              {visibleCustomFields.map((field) => {
                const fieldId = Object.keys(data.custom).find(key => data.custom[key].id === field.id) || '';
                return (
                <div key={field.id} className="flex items-center">
                  <span 
                    className="font-medium capitalize mr-1"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleCustomItemChange(fieldId, 'title', e.currentTarget.textContent?.replace(/:$/, '') || '')}
                  >
                    {field?.title?.replace(/_/g, " ")}:
                  </span>
                  {field.link ? (
                    <a
                      href={field.content.startsWith("http") ? field.content : `https://${field.content}`}
                      className="text-gray-700 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleCustomItemChange(fieldId, 'content', e.currentTarget.textContent || '')}
                    >
                      {field.content}
                    </a>
                  ) : (
                    <span
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleCustomItemChange(fieldId, 'content', e.currentTarget.textContent || '')}
                    >
                      {field.content}
                    </span>
                  )}
                </div>
              )})}
            </div>
          )}
        </header>
  
        {/* Main Content */}
        <main>
          {data.sections.map((section) => (
            <section 
              key={section.id} 
              className="mb-8"
              ref={(el) => { sectionRefs.current[section.id] = el; }}
            >
              <h2 
                className="text-2xl font-bold text-gray-900 mb-4 uppercase"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleSectionTitleChange(section.id, e.currentTarget.textContent || '')}
              >
                {section.title}
              </h2>
              {Object.entries(section.content).map(([title, details], index) => (
                <div key={index} className="mb-6">
                  {title.includes("|") ? (
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 border-b border-gray-200 pb-1">
                      <h3 
                        className="font-bold text-gray-800"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleSectionHeaderChange(section.id, title, e.currentTarget.textContent || '', 0)}
                      >
                        {title.split("|")[0].trim()}
                      </h3>
                      <div 
                        className="text-gray-600"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleSectionHeaderChange(section.id, title, e.currentTarget.textContent || '', 1)}
                      >
                        {title.split("|")[1].trim()}
                      </div>
                    </div>
                  ) : (
                    <h3 
                      className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleSectionHeaderChange(section.id, title, e.currentTarget.textContent || '', 0)}
                    >
                      {title}
                    </h3>
                  )}
                  <ul className="space-y-2 text-gray-700 mt-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <span
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleBulletChange(section.id, title, i, e.currentTarget.textContent || '')}
                        >
                          {detail}
                        </span>
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