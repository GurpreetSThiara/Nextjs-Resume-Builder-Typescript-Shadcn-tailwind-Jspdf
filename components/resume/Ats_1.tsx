import { FontConfig, ResumeData, ThemeConfig } from '@/lib/types'

import React, { LegacyRef, useRef, useEffect } from 'react'
//fonts[font] second param
//themes[theme]
const ATS1 = ({pdfRef,font,theme,resumeData,setResumeData,activeSection}:{
  theme:ThemeConfig,
  resumeData:ResumeData,
  font: FontConfig,
  pdfRef:LegacyRef<HTMLDivElement> | undefined,
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>,
  activeSection?: string
}) => {
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

  const handleContactInfoChange = (e: React.FormEvent<HTMLParagraphElement> , key) => {
    const content = e.currentTarget.textContent || '';
   
    
  
      setResumeData(prev => ({
        ...prev,
       [key]:content
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
      const keyParts = originalKey.split(' | ');
      keyParts[position] = newText;
      const newKey = keyParts.join(' | ');
      
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
   <div className="">
     <div 
    ref={pdfRef} 
    className={`bg-white p-6 shadow-lg ${font.className} overflow-auto`}
    style={{ fontFamily: font.name }}
  >
    <div ref={personalInfoRef} className="text-center mb-4">
      <h1 
        className={`${theme.fontSize.name} font-bold ${theme.colors.primary}`} 
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={handleNameChange}
      >
        {resumeData.name}
      </h1>
      <div
        className={`${theme.fontSize.small} ${theme.colors.secondary} flex items-center justify-center gap-4`}
      
      >
        <p   contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContactInfoChange(e , "email")}>{resumeData.email}</p> | <p  contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContactInfoChange(e , "phone")}>{resumeData.phone}</p> | <p  contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleContactInfoChange(e , "location")}>{resumeData.location}</p>
      </div>
    </div>
    <div ref={customFieldsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1 gap-x-8 pb-6">
            {Object.keys(resumeData.custom).map((i, index) => {
              const item = resumeData.custom[i];
              return (
                <div className={`flex gap-2 text-xs justify-between ${item.hidden && "hidden"}`} key={`${index} ${item.id}`}>
                  <span 
                    className="font-semibold"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleCustomItemChange(i, 'title', e.currentTarget.textContent || '')}
                  >
                    {item.title}
                  </span>
                  <span 
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleCustomItemChange(i, 'content', e.currentTarget.textContent || '')}
                  >
                    {item.content}
                  </span>
                </div>
              );
            })}
          </div>
    
    {resumeData.sections.map((section) => (
      <div 
        key={section.id} 
        className={theme.spacing.section}
        ref={(el) => { sectionRefs.current[section.id] = el; }}
      >
        <h2 
          className={`${theme.fontSize.section} font-bold uppercase ${theme.colors.primary} mb-2`}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleSectionTitleChange(section.id, e.currentTarget.textContent || '')}
        >
          {section.title}
        </h2>
        
        {Object.entries(section.content).map(([key, bullets]) => (
          <div key={key} className={theme.spacing.item}>
            {key && (
              <div className="flex justify-between items-baseline">
                <div className="flex-1 pr-4">
                  <h3 
                    className={`${theme.fontSize.content} font-semibold`}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSectionHeaderChange(section.id, key, e.currentTarget.textContent || '', 0)}
                  >
                    {key.split(' | ')[0]}
                  </h3>
                </div>
                <div className="text-right font-semibold">
                  <span 
                    className={`${theme.fontSize.small} ${theme.colors.secondary}`}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSectionHeaderChange(section.id, key, e.currentTarget.textContent || '', 1)}
                  >
                    {key.split(' | ')[1]}
                  </span>
                </div>
              </div>
            )}
            <ul className={key ? "list-disc ml-4 mt-1" : ""}>
              {bullets.map((bullet, index) => (
                <li 
                  key={index} 
                  className={`${theme.fontSize.small} ${theme.colors.text} mb-1`}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleBulletChange(section.id, key, index, e.currentTarget.textContent || '')}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ))}
  </div>


   </div>
  )
}

export default ATS1