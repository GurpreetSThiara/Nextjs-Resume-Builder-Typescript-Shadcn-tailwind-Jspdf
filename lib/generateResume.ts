/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFArray, PDFDocument, PDFName, rgb, StandardFonts } from "pdf-lib";
import { ResumeData, ResumeProps, ThemeConfig } from "./types";
import jsPDF from "jspdf";

interface generationProps {
    pdfRef: any,
    theme:ThemeConfig;
    resumeData:ResumeData
}

export async function generateImpact({pdfRef,theme , resumeData}:generationProps){
  if (!pdfRef.current) return;
    const pdFtheme: ThemeConfig = theme


    const pdfDoc = await PDFDocument.create();
    let currentPage = pdfDoc.addPage([595.276, 841.890]); // A4 size in points
  
    // Embed fonts
    const regularFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  
    let yOffset = 800; // Start from top of page
    const margin = 50;
    const pageWidth = 595.276 - 2 * margin;
  
    // Helper function to add a new page when needed
    const ensureSpace = (spaceNeeded: number) => {
      if (yOffset - spaceNeeded < margin) {
        currentPage = pdfDoc.addPage([595.276, 841.890]);
        yOffset = 800;
      }
    };
  
    // Helper function to wrap text
    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
  
      words.forEach(word => {
        const width = regularFont.widthOfTextAtSize(currentLine + ' ' + word, (pdFtheme.pdfSize?.small));
        if (width < maxWidth) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
  
      if (currentLine) {
        lines.push(currentLine);
      }
  
      return lines;
    };
  

    currentPage.drawText(resumeData.name, {
      x: margin,
      y: yOffset,
      size: (pdFtheme.pdfSize?.name),
      font: boldFont,
      color: pdFtheme.rgb?.text,
    });
    //yOffset -= (pdFtheme.pdfSpacing?.page);
    yOffset -= (pdFtheme.pdfSpacing?.section);
    
  
    // Contact info
    const contactInfo = `${resumeData.email}    ${resumeData.phone}    ${resumeData.location}`;
    currentPage.drawText(contactInfo, {
      x: margin,
      y: yOffset,
      size: (pdFtheme.pdfSize?.small),
      font: regularFont,
      color: pdFtheme.rgb?.secondary,
    });
   // yOffset -= (pdFtheme.pdfSpacing?.page);
    yOffset -= (pdFtheme.pdfSpacing?.section);

// Custom Section with Proper Justification Between Key & Value
const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden);
const columnCount = 2;
const rowCount = Math.ceil(customEntries.length / columnCount);

const leftX = margin;
const rightX = margin + pageWidth / 2; // Right column starts halfway
const columnWidth = pageWidth / 2 - 10;
const rowHeight = 15;


for (let i = 0; i < rowCount; i++) {
  ensureSpace(rowHeight + 5);

  for (let j = 0; j < columnCount; j++) {
    const index = i + j * rowCount;
    if (index >= customEntries.length) break;

    const [key, item] = customEntries[index];
    const xPos = j === 0 ? leftX : rightX;

    // Key (left-aligned)
    currentPage.drawText(`${item.title}:`, {
      x: xPos,
      y: yOffset,
      size: pdFtheme.pdfSize?.small,
      font: boldFont,
      color: pdFtheme.rgb?.text,
    });

    const textWidth = regularFont.widthOfTextAtSize(item.content, pdFtheme.pdfSize?.small);
    const contentX = xPos + columnWidth - textWidth;

    if (item.link) {
      // Draw the link text
      currentPage.drawText(item.content, {
        x: contentX,
        y: yOffset,
        size: pdFtheme.pdfSize?.small,
        font: regularFont,
        color: pdFtheme.rgb?.linkColor || rgb(0, 0, 1), // Blue color for links
      });

      // Ensure URL starts with http(s)
      const url = item.content.startsWith("http") ? item.content : `https://${item.content}`;

      // Create the link annotation
      const linkAnnotation = currentPage.doc.context.obj({
        Type: PDFName.of("Annot"),
        Subtype: PDFName.of("Link"),
        Rect: [contentX, yOffset, contentX + textWidth, yOffset + pdFtheme.pdfSize?.small],
        Border: [0, 0, 0],
        A: currentPage.doc.context.obj({
          Type: PDFName.of("Action"),
          S: PDFName.of("URI"),
          URI: currentPage.doc.context.obj(url),
        }),
      });

      // Register the annotation in the document context
      const linkRef = currentPage.doc.context.register(linkAnnotation);

      // Get existing annotations or create a new array
      let annotations = currentPage.node.get(PDFName.of("Annots"));

      if (!annotations) {
        annotations = currentPage.doc.context.obj([]); // Create new annotations array
        currentPage.node.set(PDFName.of("Annots"), annotations);
      }

      // Ensure annotations is a PDFArray and add the new link
      if (annotations instanceof PDFArray) {
        annotations.push(linkRef);
      } else {
        const newAnnotations = currentPage.doc.context.obj([annotations, linkRef]);
        currentPage.node.set(PDFName.of("Annots"), newAnnotations);
      }
    } else {
      // Draw regular text if it's not a link
      currentPage.drawText(item.content, {
        x: contentX,
        y: yOffset,
        size: pdFtheme.pdfSize?.small,
        font: regularFont,
        color: pdFtheme.rgb?.text,
      });
    }
  }

  yOffset -= rowHeight;
}

    
yOffset -= (pdFtheme.pdfSpacing?.section)/2;

  
    // Sections
    for (const section of resumeData.sections) {
      ensureSpace((pdFtheme.pdfSpacing?.section) + 20);
  
      currentPage.drawText(section.title, {
        x: margin,
        y: yOffset,
        size: (pdFtheme.pdfSize?.section),
        font: boldFont,
        color: pdFtheme.rgb?.heading,
      });
      yOffset -= (pdFtheme.pdfSpacing?.page);
  
      for (const [key, bullets] of Object.entries(section.content)) {
        ensureSpace((pdFtheme.pdfSpacing?.item) + 20);
  
        if (key) {
          const [title, subtitle] = key.split(' | ');
          currentPage.drawText(title, {
            x: margin,
            y: yOffset,
            size: (pdFtheme.pdfSize?.content),
            font: boldFont,
            color: (pdFtheme.rgb?.text),
          });
          yOffset -= (pdFtheme.pdfSize?.content);
  
          if (subtitle) {
            currentPage.drawText(subtitle, {
              x: margin,
              y: yOffset,
              size: (pdFtheme.pdfSize?.small),
              font: regularFont,
              color: (pdFtheme.rgb?.secondary),
            });
            yOffset -= (pdFtheme.pdfSize?.small);
          }
        }
  
        for (const bullet of bullets) {
          ensureSpace(pdFtheme.pdfSize?.small?? 0 + 5);
          
          const bulletText = `• ${bullet}`;
          const lines = wrapText(bulletText, pageWidth - 20);
          
          for (const line of lines) {
            currentPage.drawText(line, {
              x: margin + 10,
              y: yOffset,
              size: (pdFtheme.pdfSize?.small),
              font: regularFont,
              color: (pdFtheme.rgb?.text),
            });
            yOffset -=  15;
          }
        }
  
        yOffset -= (pdFtheme.pdfSpacing?.item) / 2;
      }
  
      yOffset -= (pdFtheme.pdfSpacing?.section) / 2;
    }
  
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'new.pdf';
    link.click();
   
 }


 export const generateModern = async ({ pdfRef, theme, resumeData }: generationProps) => {
  if (!pdfRef.current) return

  const pdfDoc = await PDFDocument.create()
  let currentPage = pdfDoc.addPage([595.276, 841.89]) // A4 size in points

  // Determine font based on theme
  const fontFamily = theme.fontFamily === "times" ? StandardFonts.TimesRoman : StandardFonts.Helvetica
  const regularFont = await pdfDoc.embedFont(fontFamily)
  const boldFont = await pdfDoc.embedFont(
    theme.fontFamily === "times" ? StandardFonts.TimesRomanBold : StandardFonts.HelveticaBold,
  )

  const pageWidth = 595.276
  const pageHeight = 841.89
  const margin = 40
  let yOffset = pageHeight - margin // Start from top of page

  // Helper function to add a new page when needed
  const ensureSpace = (spaceNeeded: number) => {
    if (yOffset - spaceNeeded < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      yOffset = pageHeight - margin
    }
  }

  // Helper function to wrap text
  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    const words = text.split(" ")
    const lines: string[] = []
    let currentLine = ""

    words.forEach((word) => {
      const width = regularFont.widthOfTextAtSize(currentLine + " " + word, fontSize)
      if (width < maxWidth) {
        currentLine += (currentLine ? " " : "") + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  // Add black header background
  currentPage.drawRectangle({
    x: 0,
    y: pageHeight - 80,
    width: pageWidth,
    height: 80,
    color: rgb(0, 0, 0),
  })

  // Add name (centered, in white)
  const nameWidth = boldFont.widthOfTextAtSize(resumeData.name, 18)
  currentPage.drawText(resumeData.name, {
    x: (pageWidth - nameWidth) / 2,
    y: pageHeight - 40,
    size: 18,
    font: boldFont,
    color: rgb(1, 1, 1), // White
  })

  // Contact info (centered, in white)
  const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`
  const contactWidth = regularFont.widthOfTextAtSize(contactInfo, 10)
  currentPage.drawText(contactInfo, {
    x: (pageWidth - contactWidth) / 2,
    y: pageHeight - 60,
    size: 10,
    font: regularFont,
    color: rgb(1, 1, 1), // White
  })

  // Start content below the header
  yOffset = pageHeight - 100

  // Custom Section with Proper Justification Between Key & Value
  const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden)
  const columnCount = 2
  const rowCount = Math.ceil(customEntries.length / columnCount)

  const availableWidth = pageWidth - 2 * margin
  const leftX = margin
  const rightX = margin + availableWidth / 2 // Right column starts halfway
  const columnWidth = availableWidth / 2 - 10
  const rowHeight = 15

  for (let i = 0; i < rowCount; i++) {
    ensureSpace(rowHeight + 5)

    for (let j = 0; j < columnCount; j++) {
      const index = i + j * rowCount
      if (index >= customEntries.length) break

      const [key, item] = customEntries[index]
      const xPos = j === 0 ? leftX : rightX

      // Key (left-aligned)
      currentPage.drawText(`${item.title}:`, {
        x: xPos,
        y: yOffset,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      const textWidth = regularFont.widthOfTextAtSize(item.content, 10)
      const contentX = xPos + columnWidth - textWidth

      if (item.link) {
        // Draw the link text
        currentPage.drawText(item.content, {
          x: contentX,
          y: yOffset,
          size: 10,
          font: regularFont,
          color: rgb(0, 0, 1), // Blue color for links
        })

        // Ensure URL starts with http(s)
        const url = item.content.startsWith("http") ? item.content : `https://${item.content}`

        // Create the link annotation
        const linkAnnotation = currentPage.doc.context.obj({
          Type: PDFName.of("Annot"),
          Subtype: PDFName.of("Link"),
          Rect: [contentX, yOffset - 2, contentX + textWidth, yOffset + 10],
          Border: [0, 0, 0],
          A: currentPage.doc.context.obj({
            Type: PDFName.of("Action"),
            S: PDFName.of("URI"),
            URI: currentPage.doc.context.obj(url),
          }),
        })

        // Register the annotation in the document context
        const linkRef = currentPage.doc.context.register(linkAnnotation)

        // Get existing annotations or create a new array
        let annotations = currentPage.node.get(PDFName.of("Annots"))

        if (!annotations) {
          annotations = currentPage.doc.context.obj([]) // Create new annotations array
          currentPage.node.set(PDFName.of("Annots"), annotations)
        }

        // Ensure annotations is a PDFArray and add the new link
        if (annotations instanceof PDFArray) {
          annotations.push(linkRef)
        } else {
          const newAnnotations = currentPage.doc.context.obj([annotations, linkRef])
          currentPage.node.set(PDFName.of("Annots"), newAnnotations)
        }
      } else {
        // Draw regular text if it's not a link
        currentPage.drawText(item.content, {
          x: contentX,
          y: yOffset,
          size: 10,
          font: regularFont,
          color: rgb(0, 0, 0),
        })
      }
    }

    yOffset -= rowHeight
  }

  yOffset -= 15

  // Add sections
  for (const section of resumeData.sections) {
    ensureSpace(30)

    // Section title (uppercase)
    const sectionTitle = section.title.toUpperCase()
    currentPage.drawText(sectionTitle, {
      x: margin,
      y: yOffset,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yOffset -= 5

    // Draw horizontal line
    currentPage.drawLine({
      start: { x: margin, y: yOffset },
      end: { x: pageWidth - margin, y: yOffset },
      thickness: 1,
      color: rgb(0, 0, 0),
    })
    yOffset -= 20

    for (const [key, bullets] of Object.entries(section.content)) {
      ensureSpace(20)

      if (key) {
        const parts = key.split(" | ")
        const title = parts[0]
        const details = parts[1]

        const maxTitleWidth = (pageWidth - 2 * margin) * 0.6
        const wrappedTitle = wrapText(title, maxTitleWidth, 11)

        // Draw title (left-aligned)
        currentPage.drawText(wrappedTitle[0], {
          x: margin,
          y: yOffset,
          size: 11,
          font: boldFont,
          color: rgb(0, 0, 0),
        })

        // Draw details (right-aligned) if present
        if (details) {
          const detailsWidth = regularFont.widthOfTextAtSize(details, 11)
          currentPage.drawText(details, {
            x: pageWidth - margin - detailsWidth,
            y: yOffset,
            size: 11,
            font: regularFont,
            color: rgb(0, 0, 0),
          })
        }

        yOffset -= 15

        // Handle multi-line titles
        if (wrappedTitle.length > 1) {
          for (let i = 1; i < wrappedTitle.length; i++) {
            currentPage.drawText(wrappedTitle[i], {
              x: margin,
              y: yOffset,
              size: 11,
              font: boldFont,
              color: rgb(0, 0, 0),
            })
            yOffset -= 12
          }
        }
      }

      // Draw bullets
      for (const bullet of bullets) {
        ensureSpace(15)

        const bulletText = key ? `• ${bullet}` : bullet
        const maxBulletWidth = pageWidth - (key ? margin * 3 : margin * 2)
        const lines = wrapText(bulletText, maxBulletWidth, 10)

        for (const line of lines) {
          currentPage.drawText(line, {
            x: key ? margin + 15 : margin,
            y: yOffset,
            size: 10,
            font: regularFont,
            color: rgb(0, 0, 0),
          })
          yOffset -= 14
        }
      }

      yOffset -= 5
    }

    yOffset -= 20
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "resume.pdf"
  link.click()
 
}

 export const generateClassic = async ({ pdfRef, theme, resumeData }: generationProps) => {
  if (!pdfRef.current) return

  const pdFtheme: ThemeConfig = theme

  const pdfDoc = await PDFDocument.create()
  let currentPage = pdfDoc.addPage([595.276, 841.89]) // A4 size in points

  // Embed fonts
  const fontFamily = theme.fontFamily === "times" ? StandardFonts.TimesRoman : StandardFonts.Helvetica
  const regularFont = await pdfDoc.embedFont(fontFamily)
  const boldFont = await pdfDoc.embedFont(
    theme.fontFamily === "times" ? StandardFonts.TimesRomanBold : StandardFonts.HelveticaBold,
  )

  const pageWidth = 595.276
  const pageHeight = 841.89
  const margin = 40
  let yOffset = pageHeight - margin // Start from top of page

  // Helper function to add a new page when needed
  const ensureSpace = (spaceNeeded: number) => {
    if (yOffset - spaceNeeded < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      yOffset = pageHeight - margin
    }
  }

  // Helper function to wrap text
  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    const words = text.split(" ")
    const lines: string[] = []
    let currentLine = ""

    words.forEach((word) => {
      const width = regularFont.widthOfTextAtSize(currentLine + " " + word, fontSize)
      if (width < maxWidth) {
        currentLine += (currentLine ? " " : "") + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  // Add name (centered)
  const nameWidth = boldFont.widthOfTextAtSize(resumeData.name, 14)
  currentPage.drawText(resumeData.name, {
    x: (pageWidth - nameWidth) / 2,
    y: yOffset,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  })
  yOffset -= 20

  // Contact info (centered)
  const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`
  const contactWidth = regularFont.widthOfTextAtSize(contactInfo, 10)
  currentPage.drawText(contactInfo, {
    x: (pageWidth - contactWidth) / 2,
    y: yOffset,
    size: 10,
    font: regularFont,
    color: rgb(0, 0, 0),
  })
  yOffset -= 25

  // Custom Section with Proper Justification Between Key & Value
  const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden)
  const columnCount = 2
  const rowCount = Math.ceil(customEntries.length / columnCount)
  const availableWidth = pageWidth - 2 * margin
  const leftX = margin
  const rightX = margin + availableWidth / 2 // Right column starts halfway
  const columnWidth = availableWidth / 2 - 10
  const rowHeight = 15

  for (let i = 0; i < rowCount; i++) {
    ensureSpace(rowHeight + 5)

    for (let j = 0; j < columnCount; j++) {
      const index = i + j * rowCount
      if (index >= customEntries.length) break

      const [key, item] = customEntries[index]
      const xPos = j === 0 ? leftX : rightX

      // Key (left-aligned)
      currentPage.drawText(`${item.title}`, {
        x: xPos,
        y: yOffset,
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      const textWidth = regularFont.widthOfTextAtSize(item.content, 10)
      const contentX = xPos + columnWidth - textWidth

      if (item.link) {
        // Draw the link text
        currentPage.drawText(item.content, {
          x: contentX,
          y: yOffset,
          size: 10,
          font: regularFont,
          color: rgb(0, 0, 1), // Blue color for links
        })

        // Ensure URL starts with http(s)
        const url = item.content.startsWith("http") ? item.content : `https://${item.content}`

        // Create the link annotation
        const linkAnnotation = currentPage.doc.context.obj({
          Type: PDFName.of("Annot"),
          Subtype: PDFName.of("Link"),
          Rect: [contentX, yOffset - 2, contentX + textWidth, yOffset + 10],
          Border: [0, 0, 0],
          A: currentPage.doc.context.obj({
            Type: "Action",
            S: "URI",
            URI: currentPage.doc.context.obj(url),
          }),
        })

        // Register the annotation in the document context
        const linkRef = currentPage.doc.context.register(linkAnnotation)

        // Get existing annotations or create a new array
        let annotations = currentPage.node.get(PDFName.of("Annots"))

        if (!annotations) {
          annotations = currentPage.doc.context.obj([]) // Create new annotations array
          currentPage.node.set(PDFName.of("Annots"), annotations)
        }

        // Ensure annotations is a PDFArray and add the new link
        if (annotations instanceof PDFArray) {
          annotations.push(linkRef)
        } else {
          const newAnnotations = currentPage.doc.context.obj([annotations, linkRef])
          currentPage.node.set(PDFName.of("Annots"), newAnnotations)
        }
      } else {
        // Draw regular text if it's not a link
        currentPage.drawText(item.content, {
          x: contentX,
          y: yOffset,
          size: 10,
          font: regularFont,
          color: rgb(0, 0, 0),
        })
      }
    }

    yOffset -= rowHeight
  }

  yOffset -= 15

  // Add sections
  for (const section of resumeData.sections) {
    ensureSpace(25)

    // Section title (uppercase)
    const sectionTitle = section.title.toUpperCase()
    currentPage.drawText(sectionTitle, {
      x: margin,
      y: yOffset,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    yOffset -= 20

    for (const [key, bullets] of Object.entries(section.content)) {
      ensureSpace(20)

      if (key) {
        const parts = key.split(" | ")
        const title = parts[0]
        const details = parts[1]

        const maxTitleWidth = (pageWidth - 2 * margin) * 0.6
        const wrappedTitle = wrapText(title, maxTitleWidth, 11)

        // Draw title (left-aligned)
        currentPage.drawText(wrappedTitle[0], {
          x: margin,
          y: yOffset,
          size: 11,
          font: boldFont,
          color: rgb(0, 0, 0),
        })

        // Draw details (right-aligned) if present
        if (details) {
          const detailsWidth = regularFont.widthOfTextAtSize(details, 11)
          currentPage.drawText(details, {
            x: pageWidth - margin - detailsWidth,
            y: yOffset,
            size: 11,
            font: regularFont,
            color: rgb(0, 0, 0),
          })
        }

        yOffset -= 15

        // Handle multi-line titles
        if (wrappedTitle.length > 1) {
          for (let i = 1; i < wrappedTitle.length; i++) {
            currentPage.drawText(wrappedTitle[i], {
              x: margin,
              y: yOffset,
              size: 11,
              font: boldFont,
              color: rgb(0, 0, 0),
            })
            yOffset -= 12
          }
        }
      }

      // Draw bullets
      for (const bullet of bullets) {
        ensureSpace(15)

        const bulletText = key ? `• ${bullet}` : bullet
        const maxBulletWidth = pageWidth - (key ? margin * 3 : margin * 2)
        const lines = wrapText(bulletText, maxBulletWidth, 10)

        for (const line of lines) {
          currentPage.drawText(line, {
            x: key ? margin + 15 : margin,
            y: yOffset,
            size: 10,
            font: regularFont,
            color: rgb(0, 0, 0),
          })
          yOffset -= 12
        }
      }

      yOffset -= 5
    }

    yOffset -= 15
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "resume.pdf"
  link.click()

}


// export async function generateModernMinimalistPDF({ ResumeData:data}): Promise<Uint8Array> {
//   const pdfDoc = await PDFDocument.create()
//   let page = pdfDoc.addPage()
//   const { width, height } = page.getSize()

//   const margin = 50
//   let y = height - margin

//   const fontSize = 10
//   const titleSize = 14
//   const headingSize = 12
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
//   const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

//   const drawText = (text: string, opts: { x: number; y: number; size?: number; bold?: boolean; color?: any }) => {
//     page.drawText(text, {
//       x: opts.x,
//       y: opts.y,
//       size: opts.size || fontSize,
//       font: opts.bold ? boldFont : regularFont,
//       color: opts.color || rgb(0, 0, 0),
//     })
//   }

//   // Draw Name
//   drawText(data.name, { x: margin, y, size: 18, bold: true })
//   y -= 20

//   // Draw Contact (right-aligned)
//   const contactLines = [
//     data.email,
//     data.phone,
//     data.location,
//     data.linkedin,
//   ].filter(Boolean)

//   contactLines.forEach((line, i) => {
//     const textWidth = regularFont.widthOfTextAtSize(line!, fontSize)
//     drawText(line!, { x: width - margin - textWidth, y: height - margin - i * 12, size: fontSize })
//   })

//   y -= 30

//   // Draw visible custom fields
//   const visibleFields = Object.values(data.custom).filter(f => !f.hidden)
//   if (visibleFields.length) {
//     const colWidth = (width - margin * 2) / 3
//     visibleFields.forEach((field, i) => {
//       const col = i % 3
//       const row = Math.floor(i / 3)
//       const x = margin + col * colWidth
//       const fieldY = y - row * 15
//       const label = field.title.replace(/_/g, ' ') + ': '
//       drawText(label, { x, y: fieldY, bold: true })
//       drawText(field.content, { x: x + regularFont.widthOfTextAtSize(label, fontSize), y: fieldY })
//     })
//     y -= Math.ceil(visibleFields.length / 3) * 15 + 10
//   }

//   // Draw Sections
//   for (const section of data.sections) {
//     // Section title
//     drawText(section.title.toUpperCase(), {
//       x: margin,
//       y,
//       size: headingSize,
//       bold: true,
//     })
//     y -= 16
//     page.drawLine({
//       start: { x: margin, y: y },
//       end: { x: width - margin, y: y },
//       thickness: 0.5,
//       color: rgb(0.8, 0.8, 0.8),
//     })
//     y -= 8

//     for (const [title, bullets] of Object.entries(section.content)) {
//       if (y < 60) {
//         page = pdfDoc.addPage()
//         y = height - margin
//       }

//       const [mainTitle, dateOrLoc] = title.split('|').map(t => t.trim())

//       drawText(mainTitle, { x: margin, y, bold: true })
//       if (dateOrLoc) {
//         const rightTextWidth = regularFont.widthOfTextAtSize(dateOrLoc, fontSize)
//         drawText(dateOrLoc, {
//           x: width - margin - rightTextWidth,
//           y,
//           size: fontSize - 1,
//           color: rgb(0.4, 0.4, 0.4),
//         })
//       }

//       y -= 14

//       bullets.forEach(bullet => {
//         if (y < 50) {
//           page = pdfDoc.addPage()
//           y = height - margin
//         }
//         drawText('• ' + bullet, { x: margin + 10, y })
//         y -= 12
//       })

//       y -= 10
//     }
//   }

//   return await pdfDoc.save()
// }

// Helper function to wrap text
const wrapText = (text: string, font: any, fontSize: number, maxWidth: number): string[] => {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize)
    if (width < maxWidth) {
      currentLine += (currentLine ? " " : "") + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

// Helper function to ensure space on page
const ensureSpace = (currentPage: any, pdfDoc: any, yOffset: number, spaceNeeded: number, margin: number) => {
  if (yOffset - spaceNeeded < margin) {
    currentPage = pdfDoc.addPage([595.276, 841.89])
    return { page: currentPage, yOffset: 800 }
  }
  return { page: currentPage, yOffset }
}

// Helper function to add link annotation
const addLinkAnnotation = (
  currentPage: any,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  font: any,
  color: any,
) => {
  // Draw the link text
  currentPage.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
    color,
  })

  // Calculate text width for the annotation rectangle
  const textWidth = font.widthOfTextAtSize(text, fontSize)

  // Ensure URL starts with http(s)
  const url = text.startsWith("http") ? text : `https://${text}`

  // Create the link annotation
  const linkAnnotation = currentPage.doc.context.obj({
    Type: PDFName.of("Annot"),
    Subtype: PDFName.of("Link"),
    Rect: [x, y, x + textWidth, y + fontSize],
    Border: [0, 0, 0],
    A: currentPage.doc.context.obj({
      Type: PDFName.of("Action"),
      S: PDFName.of("URI"),
      URI: currentPage.doc.context.obj(url),
    }),
  })

  // Register the annotation in the document context
  const linkRef = currentPage.doc.context.register(linkAnnotation)

  // Get existing annotations or create a new array
  let annotations = currentPage.node.get(PDFName.of("Annots"))

  if (!annotations) {
    annotations = currentPage.doc.context.obj([]) // Create new annotations array
    currentPage.node.set(PDFName.of("Annots"), annotations)
  }

  // Ensure annotations is a PDFArray and add the new link
  if (annotations instanceof PDFArray) {
    annotations.push(linkRef)
  } else {
    const newAnnotations = currentPage.doc.context.obj([annotations, linkRef])
    currentPage.node.set(PDFName.of("Annots"), newAnnotations)
  }

  return textWidth
}

const drawLine = (currentPage , margin , yOffset , pageWidth) => {
  currentPage.drawLine({
    start: { x: margin, y: yOffset },
    end: { x: pageWidth + margin, y: yOffset },
    thickness: 0.4,
    color: rgb(0.1, 0.1, 0.1),
  })
}

// Template 1: Classic Professional
export async function generateTemplate1({ pdfRef, theme, resumeData }: generationProps) {
  if (!pdfRef.current) return
  const pdFtheme: ThemeConfig = theme

  const pdfDoc = await PDFDocument.create()
  let currentPage = pdfDoc.addPage([595.276, 841.89]) // A4 size in points

  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let yOffset = 800 // Start from top of page
  const margin = 50
  const pageWidth = 595.276 - 2 * margin

  // Header with name
  currentPage.drawText(resumeData.name, {
    x: margin,
    y: yOffset,
    size: pdFtheme.pdfSize?.name || 24,
    font: boldFont,
    color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
  })
  yOffset -= pdFtheme.pdfSpacing?.page || 20

  // Contact info
  const contactInfoItems = [
    { text: resumeData.email, icon: "📧" },
    { text: resumeData.phone, icon: "📱" },
    { text: resumeData.location, icon: "📍" },
    { text: resumeData.linkedin, icon: "🔗" },
  ]

  for (const item of contactInfoItems) {
    if (!item.text) continue

    currentPage.drawText(`${item.icon} ${item.text}`, {
      x: margin,
      y: yOffset,
      size: pdFtheme.pdfSize?.small || 10,
      font: regularFont,
      color: rgb(
        pdFtheme.rgb?.secondary?.r || 0.5,
        pdFtheme.rgb?.secondary?.g || 0.5,
        pdFtheme.rgb?.secondary?.b || 0.5,
      ),
    })
    yOffset -= 15
  }
  yOffset -= (pdFtheme.pdfSpacing?.section || 30) / 2

  // Custom Fields
  const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden)
  if (customEntries.length > 0) {
    for (const [_, item] of customEntries) {
      const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(currentPage, pdfDoc, yOffset, 15, margin)
      currentPage = updatedPage
      yOffset = updatedYOffset

      currentPage.drawText(`${item.title}: `, {
        x: margin,
        y: yOffset,
        size: pdFtheme.pdfSize?.small || 10,
        font: boldFont,
        color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
      })

      const titleWidth = boldFont.widthOfTextAtSize(`${item.title}: `, pdFtheme.pdfSize?.small || 10)

      if (item.link) {
        addLinkAnnotation(
          currentPage,
          item.content,
          margin + titleWidth,
          yOffset,
          pdFtheme.pdfSize?.small || 10,
          regularFont,
          rgb(pdFtheme.rgb?.linkColor?.r || 0, pdFtheme.rgb?.linkColor?.g || 0, pdFtheme.rgb?.linkColor?.b || 0.8),
        )
      } else {
        currentPage.drawText(item.content, {
          x: margin + titleWidth,
          y: yOffset,
          size: pdFtheme.pdfSize?.small || 10,
          font: regularFont,
          color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
        })
      }

      yOffset -= 15
    }
    yOffset -= (pdFtheme.pdfSpacing?.section || 30) / 2
  }

  // Sections
  for (const section of resumeData.sections) {
    const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
      currentPage,
      pdfDoc,
      yOffset,
      (pdFtheme.pdfSpacing?.section || 30) + 20,
      margin,
    )
    currentPage = updatedPage
    yOffset = updatedYOffset

    currentPage.drawText(section.title, {
      x: margin,
      y: yOffset,
      size: pdFtheme.pdfSize?.section || 16,
      font: boldFont,
      color: rgb(pdFtheme.rgb?.heading?.r || 0.2, pdFtheme.rgb?.heading?.g || 0.2, pdFtheme.rgb?.heading?.b || 0.2),
    })
    yOffset -= pdFtheme.pdfSpacing?.page || 20

    for (const [key, bullets] of Object.entries(section.content)) {
      const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
        currentPage,
        pdfDoc,
        yOffset,
        (pdFtheme.pdfSpacing?.item || 15) + 20,
        margin,
      )
      currentPage = updatedPage
      yOffset = updatedYOffset

      if (key) {
        const [title, subtitle] = key.split(" | ")
        currentPage.drawText(title, {
          x: margin,
          y: yOffset,
          size: pdFtheme.pdfSize?.content || 12,
          font: boldFont,
          color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
        })
        yOffset -= pdFtheme.pdfSize?.content || 12 + 5

        if (subtitle) {
          currentPage.drawText(subtitle, {
            x: margin,
            y: yOffset,
            size: pdFtheme.pdfSize?.small || 10,
            font: regularFont,
            color: rgb(
              pdFtheme.rgb?.secondary?.r || 0.5,
              pdFtheme.rgb?.secondary?.g || 0.5,
              pdFtheme.rgb?.secondary?.b || 0.5,
            ),
          })
          yOffset -= pdFtheme.pdfSize?.small || 10 + 5
        }
      }

      for (const bullet of bullets) {
        const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
          currentPage,
          pdfDoc,
          yOffset,
          pdFtheme.pdfSize?.small || 10 + 5,
          margin,
        )
        currentPage = updatedPage
        yOffset = updatedYOffset

        const bulletText = `• ${bullet}`
        const lines = wrapText(bulletText, regularFont, pdFtheme.pdfSize?.small || 10, pageWidth - 20)

        for (const line of lines) {
          currentPage.drawText(line, {
            x: margin + 10,
            y: yOffset,
            size: pdFtheme.pdfSize?.small || 10,
            font: regularFont,
            color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
          })
          yOffset -= 15
        }
      }

      yOffset -= (pdFtheme.pdfSpacing?.item || 15) / 2
    }

    yOffset -= (pdFtheme.pdfSpacing?.section || 30) / 2
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "template1_resume.pdf"
  link.click()
}

// Template 2: Modern Minimalist
export async function generateModernMinimalistPDF({ pdfRef, theme, resumeData }: generationProps) {
 
 // if (!pdfRef.current) return
  const pdFtheme: ThemeConfig = theme 

  const pdfDoc = await PDFDocument.create()
  let currentPage = pdfDoc.addPage([595.276, 841.89]) // A4 size in points

  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let yOffset = 800 // Start from top of page
  const margin = 50
  const pageWidth = 595.276 - 2 * margin

  // Two-column header
  currentPage.drawText(resumeData.name, {
    x: margin,
    y: yOffset,
    size: pdFtheme.pdfSize?.name || 24,
    font: boldFont,
    color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
  })

  // Contact info in right column
  const contactInfoItems = [resumeData.email, resumeData.phone, resumeData.location, resumeData.linkedin]
  let contactY = yOffset

  for (const item of contactInfoItems) {
    if (!item) continue

    const textWidth = regularFont.widthOfTextAtSize(item, pdFtheme.pdfSize?.small || 10)
    currentPage.drawText(item, {
      x: pageWidth + margin - textWidth,
      y: contactY + 8,
      size: pdFtheme.pdfSize?.small || 10,
      font: regularFont,
      color: rgb(
        pdFtheme.rgb?.secondary?.r || 0.1,
        pdFtheme.rgb?.secondary?.g || 0.1,
        pdFtheme.rgb?.secondary?.b || 0.1,
      ),
    })
    contactY -= 15
  }

  // Draw a horizontal line
  yOffset -=  50
  currentPage.drawLine({
    start: { x: margin, y: yOffset },
    end: { x: pageWidth + margin, y: yOffset },
    thickness: 0.4,
    color: rgb(0.1, 0.1, 0.1),
  })
  yOffset -=  18

  // Custom Fields
  const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden)
  if (customEntries.length > 0) {
    const columns = 3
    const itemsPerColumn = Math.ceil(customEntries.length / columns)
    const columnWidth = pageWidth / columns

    for (let i = 0; i < itemsPerColumn; i++) {
      for (let j = 0; j < columns; j++) {
        const index = i + j * itemsPerColumn
        if (index >= customEntries.length) continue

        const [_, item] = customEntries[index]
        const xPos = margin + j * columnWidth

        currentPage.drawText(`${item.title}: `, {
          x: xPos,
          y: yOffset,
          size: pdFtheme.pdfSize?.small || 10,
          font: boldFont,
          color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
        })

        const titleWidth = boldFont.widthOfTextAtSize(`${item.title}: `, pdFtheme.pdfSize?.small || 10)

        if (item.link) {
          addLinkAnnotation(
            currentPage,
            item.content,
            xPos + titleWidth,
            yOffset,
            pdFtheme.pdfSize?.small || 10,
            regularFont,
            rgb(pdFtheme.rgb?.linkColor?.r || 0, pdFtheme.rgb?.linkColor?.g || 0, pdFtheme.rgb?.linkColor?.b || 0.8),
          )
        } else {
          currentPage.drawText(item.content, {
            x: xPos + titleWidth,
            y: yOffset,
            size: pdFtheme.pdfSize?.small || 10,
            font: regularFont,
            color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
          })
        }
      }
      yOffset -= 15
    }
    yOffset -= (pdFtheme.pdfSpacing?.section || 30) / 2
  }

  // Sections
  for (const section of resumeData.sections) {
    const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
      currentPage,
      pdfDoc,
      yOffset,
      (pdFtheme.pdfSpacing?.section || 30) + 20,
      margin,
    )
    currentPage = updatedPage
    yOffset = updatedYOffset

    currentPage.drawText(section.title.toUpperCase(), {
      x: margin,
      y: yOffset,
      size: pdFtheme.pdfSize?.section || 16,
      font: boldFont,
      color: rgb(pdFtheme.rgb?.heading?.r || 0.2, pdFtheme.rgb?.heading?.g || 0.2, pdFtheme.rgb?.heading?.b || 0.2),
    })
    yOffset -=  8

    drawLine(currentPage ,margin , yOffset , pageWidth);

    yOffset -= 20

    for (const [key, bullets] of Object.entries(section.content)) {
      const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
        currentPage,
        pdfDoc,
        yOffset,
        (pdFtheme.pdfSpacing?.item || 15) + 20,
        margin,
      )
      currentPage = updatedPage
      yOffset = updatedYOffset

      if (key) {
        const [title, subtitle] = key.split(" | ")
        currentPage.drawText(title, {
          x: margin,
          y: yOffset,
          size: pdFtheme.pdfSize?.content || 12,
          font: boldFont,
          color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
        })

        if (subtitle) {
          const titleWidth = boldFont.widthOfTextAtSize(title, pdFtheme.pdfSize?.content || 12)
          const subtitleX = pageWidth + margin - regularFont.widthOfTextAtSize(subtitle, pdFtheme.pdfSize?.small || 10)

          currentPage.drawText(subtitle, {
            x: subtitleX,
            y: yOffset,
            size: pdFtheme.pdfSize?.small || 10,
            font: regularFont,
            color: rgb(
              pdFtheme.rgb?.secondary?.r || 0.5,
              pdFtheme.rgb?.secondary?.g || 0.5,
              pdFtheme.rgb?.secondary?.b || 0.5,
            ),
          })
        }

        yOffset -= pdFtheme.pdfSize?.content || 12 + 5
      }

      for (const bullet of bullets) {
        const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(
          currentPage,
          pdfDoc,
          yOffset,
          pdFtheme.pdfSize?.small || 10 + 5,
          margin,
        )
        currentPage = updatedPage
        yOffset = updatedYOffset

        const bulletText = `• ${bullet}`
        const lines = wrapText(bulletText, regularFont, pdFtheme.pdfSize?.small || 10, pageWidth - 20)

        for (const line of lines) {
          currentPage.drawText(line, {
            x: margin + 10,
            y: yOffset,
            size: pdFtheme.pdfSize?.small || 10,
            font: regularFont,
            color: rgb(pdFtheme.rgb?.text?.r || 0.1, pdFtheme.rgb?.text?.g || 0.1, pdFtheme.rgb?.text?.b || 0.1),
          })
          yOffset -= 15
        }
      }

      yOffset -= (pdFtheme.pdfSpacing?.item || 15) / 2
    }

    yOffset -= (pdFtheme.pdfSpacing?.section || 30) / 2
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "template2_resume.pdf"
  link.click()
}

export async function generateBoldHeader({ pdfRef, theme, resumeData }: generationProps) {
 // if (!pdfRef.current) return

  const pdfDoc = await PDFDocument.create()
  let currentPage = pdfDoc.addPage([595.276, 841.89]) // A4 size in points

  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let yOffset = 800 // Start from top of page
  const margin = 50
  const pageWidth = 495.276 // 595.276 - 2 * margin

  // Header with name in bold with border below
  currentPage.drawText(resumeData.name, {
    x: margin,
    y: yOffset,
    size: 24,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  })

  yOffset -= 30

  // Draw a thick border line below the name (matching the border-b-4 in the component)
  currentPage.drawLine({
    start: { x: margin, y: yOffset + 10 },
    end: { x: margin + pageWidth, y: yOffset + 10 },
    thickness: 4,
    color: rgb(0.1, 0.1, 0.1),
  })

  yOffset -= 20

  // Contact info with icons
  const contactInfoItems = [
    { text: resumeData.email, icon: "✉" },
    { text: resumeData.phone, icon: "📱" },
    { text: resumeData.location, icon: "📍" },
    { text: resumeData.linkedin, icon: "🔗" },
  ]

  // Calculate positions for contact info in a row with proper spacing
  const contactInfoSpacing = 20
  let contactX = margin

  for (const item of contactInfoItems) {
    if (!item.text) continue

    // Draw icon
    // currentPage.drawText(item.icon, {
    //   x: contactX,
    //   y: yOffset,
    //   size: 10,
    //   font: regularFont,
    //   color: rgb(0.4, 0.4, 0.4),
    // })

    // Draw text after icon
    currentPage.drawText(item.text, {
      x: contactX,
      y: yOffset,
      size: 10,
      font: regularFont,
      color: rgb(0.1, 0.1, 0.1),
    })

    // Move to next position
    const textWidth = regularFont.widthOfTextAtSize(item.text, 10)
    contactX += textWidth + 20 // Icon width + text width + spacing
  }

  yOffset -= 30

  // Custom Fields in a grid layout
  const customEntries = Object.entries(resumeData.custom).filter(([_, item]) => !item.hidden)

  if (customEntries.length > 0) {
    const columns = 3
    const columnWidth = pageWidth / columns

    // Calculate rows needed
    const rows = Math.ceil(customEntries.length / columns)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col
        if (index >= customEntries.length) continue

        const [_, item] = customEntries[index]
        const xPos = margin + col * columnWidth

        // Draw field title (capitalized)
        const title = item.title.replace(/_/g, " ")
        const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)

        currentPage.drawText(`${capitalizedTitle}: `, {
          x: xPos,
          y: yOffset,
          size: 10,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.1),
        })

        const titleWidth = boldFont.widthOfTextAtSize(`${capitalizedTitle}: `, 10)

        // Draw content (with link if needed)
        if (item.link) {
          addLinkAnnotation(currentPage, item.content, xPos + titleWidth, yOffset, 10, regularFont, rgb(0, 0, 0.8))
        } else {
          currentPage.drawText(item.content, {
            x: xPos + titleWidth,
            y: yOffset,
            size: 10,
            font: regularFont,
            color: rgb(0.1, 0.1, 0.1),
          })
        }
      }

      yOffset -= 20
    }

    yOffset -= 10
  }

  // Main content sections
  for (const section of resumeData.sections) {
    const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(currentPage, pdfDoc, yOffset, 40, margin)
    currentPage = updatedPage
    yOffset = updatedYOffset

    // Section title in uppercase and bold
    currentPage.drawText(section.title.toUpperCase(), {
      x: margin,
      y: yOffset,
      size: 16,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    })

    yOffset -= 25

    // Process each content item
    for (const [key, bullets] of Object.entries(section.content)) {
      const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(currentPage, pdfDoc, yOffset, 30, margin)
      currentPage = updatedPage
      yOffset = updatedYOffset

      if (key) {
        // Split title and details if they exist
        const [title, details] = key.split(" | ").map((part) => part?.trim())

        // Draw title
        currentPage.drawText(title, {
          x: margin,
          y: yOffset,
          size: 12,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.1),
        })

        // Draw details on the right if they exist
        if (details) {
          const detailsWidth = regularFont.widthOfTextAtSize(details, 10)
          currentPage.drawText(details, {
            x: margin + pageWidth - detailsWidth,
            y: yOffset,
            size: 10,
            font: regularFont,
            color: rgb(0.4, 0.4, 0.4),
          })
        }

        yOffset -= 15

        // Draw a light border below the title (matching border-b border-gray-200)
        currentPage.drawLine({
          start: { x: margin, y: yOffset + 5 },
          end: { x: margin + pageWidth, y: yOffset + 5 },
          thickness: 0.5,
          color: rgb(0.8, 0.8, 0.8),
        })

        yOffset -= 10
      }

      // Draw bullet points
      for (const bullet of bullets) {
        const { page: updatedPage, yOffset: updatedYOffset } = ensureSpace(currentPage, pdfDoc, yOffset, 15, margin)
        currentPage = updatedPage
        yOffset = updatedYOffset

        // Draw bullet point
        currentPage.drawText("•", {
          x: margin,
          y: yOffset,
          size: 10,
          font: regularFont,
          color: rgb(0.1, 0.1, 0.1),
        })

        // Draw bullet text with wrapping
        const bulletText = bullet
        const lines = wrapText(bulletText, regularFont, 10, pageWidth - 15)

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          currentPage.drawText(line, {
            x: margin + 15, // Indent after bullet
            y: yOffset - i * 15,
            size: 10,
            font: regularFont,
            color: rgb(0.1, 0.1, 0.1),
          })
        }

        // Move down based on number of lines
        yOffset -= Math.max(1, lines.length) * 15
      }

      yOffset -= 15
    }

    yOffset -= 15
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: "application/pdf" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "bold_header_resume.pdf"
  link.click()
}




