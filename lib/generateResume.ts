/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFArray, PDFDocument, PDFName, rgb, StandardFonts } from "pdf-lib";
import { ResumeData, ThemeConfig } from "./types";
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
    yOffset -= (pdFtheme.pdfSpacing?.page);
  
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
    console.log("saved")
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
  console.log("saved")
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
  console.log("saved")
}
