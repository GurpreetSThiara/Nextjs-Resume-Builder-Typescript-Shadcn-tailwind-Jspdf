/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFDocument, StandardFonts } from "pdf-lib";
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


 export const generateModern = ({pdfRef,theme , resumeData}:generationProps) => {
    if (!pdfRef.current) return;

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

  
    const fontFamily = theme?.fontFamily || "times";
    pdf.setFont(fontFamily);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;

    // Add black header background
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pdfWidth, 80, "F");

    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle = "normal",
      maxWidth = pdfWidth - 2 * margin,
      align = "left",
      h = true
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);

      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      const xPos =
        align === "center"
          ? (pdfWidth - pdf.getTextWidth(lines[0])) / 2
          : margin;

      lines.forEach((line: string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        if (h) yOffset += fontSize * 1.15;
      });
    };

    // Header text in white
    pdf.setTextColor(255, 255, 255);
    addWrappedText(
      resumeData.name,
      18,
      "bold",
      pdfWidth - 2 * margin,
      "center"
    );
    yOffset -= 5;

    // Contact info in white
    const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`;
    addWrappedText(contactInfo, 10, "normal", pdfWidth - 2 * margin, "center");
    yOffset += 50;

    // Reset text color to black for rest of document
    pdf.setTextColor(0, 0, 0);

    // Add sections
    resumeData.sections.forEach((section) => {
      // Section title
      addWrappedText(
        section.title.toUpperCase(),
        16,
        "bold",
        pdfWidth - 2 * margin,
        "left",
        false
      );
      yOffset += 5;

      pdf.setLineWidth(1);
      pdf.setDrawColor("#000000"); // Adjust the width as needed for boldness

      // Set the starting and ending points of the line
      const x1 = 40
    
      // Draw the line
      pdf.line(x1, yOffset, pdfWidth - 40, yOffset);
      yOffset += 20;

      // Section content
      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(" | ");
          const title = parts[0];
          const details = parts[1];

          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;

          pdf.setFontSize(11);
          pdf.setFont(fontFamily, "bold");

          const wrappedTitle = pdf.splitTextToSize(title, maxTitleWidth);
          pdf.text(wrappedTitle[0], margin, yOffset);

          if (details) {
            const detailsWidth = pdf.getTextWidth(details);
            pdf.text(details, pdfWidth - margin - detailsWidth, yOffset);
          }

          yOffset += 15;

          if (wrappedTitle.length > 1) {
            for (let i = 1; i < wrappedTitle.length; i++) {
              pdf.text(wrappedTitle[i], margin, yOffset);
              yOffset += 12;
            }
          }
        }

        // Bullet points
        bullets.forEach((bullet) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.setFont(fontFamily, "normal");
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(
            bulletText,
            pdfWidth - (key ? margin * 3 : margin * 2)
          );

          lines.forEach((line: string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 14;
          });
        });
        yOffset += 5;
      });

      yOffset += 20;
    });

    pdf.save("resume.pdf");
 };


 export const generateClassic = ({pdfRef  ,theme , resumeData}:generationProps) => {
    if (!pdfRef.current) return;

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const fontFamily =
      theme.fontFamily === "times" ? "times" : "helvetica";
    pdf.setFont(fontFamily);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let yOffset = margin;

    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle = "normal",
      maxWidth = pdfWidth - 2 * margin,
      align = "left"
    ) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontFamily, fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);

      if (yOffset > pdfHeight - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      const xPos =
        align === "center"
          ? (pdfWidth - pdf.getTextWidth(lines[0])) / 2
          : margin;

      lines.forEach((line: string) => {
        if (yOffset > pdfHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
        pdf.text(line, xPos, yOffset);
        yOffset += fontSize * 1.15;
      });
    };

    // Add name and contact info
    addWrappedText(
      resumeData.name,
      14,
      "bold",
      pdfWidth - 2 * margin,
      "center"
    );
    yOffset += 5;

    const contactInfo = `${resumeData.email} | ${resumeData.phone} | ${resumeData.location}`;
    addWrappedText(contactInfo, 10, "normal", pdfWidth - 2 * margin, "center");
    yOffset += 15;

    // Add sections
    resumeData.sections.forEach((section) => {
      addWrappedText(section.title.toUpperCase(), 12, "bold");
      yOffset += 10;

      Object.entries(section.content).forEach(([key, bullets]) => {
        if (key) {
          const parts = key.split(" | ");
          const title = parts[0];
          const details = parts[1];

          const maxTitleWidth = (pdfWidth - 2 * margin) * 0.6;

          pdf.setFontSize(11);
          pdf.setFont(fontFamily, "bold");

          const wrappedTitle = pdf.splitTextToSize(title, maxTitleWidth);
          pdf.text(wrappedTitle[0], margin, yOffset);

          if (details) {
            const detailsWidth = pdf.getTextWidth(details);
            pdf.text(details, pdfWidth - margin - detailsWidth, yOffset);
          }

          yOffset += 15;

          if (wrappedTitle.length > 1) {
            for (let i = 1; i < wrappedTitle.length; i++) {
              pdf.text(wrappedTitle[i], margin, yOffset);
              yOffset += 12;
            }
          }
        }

        bullets.forEach((bullet) => {
          if (yOffset > pdfHeight - margin) {
            pdf.addPage();
            yOffset = margin;
          }

          pdf.setFont(fontFamily, "normal");
          pdf.setFontSize(10);
          const bulletText = key ? `• ${bullet}` : bullet;
          const lines = pdf.splitTextToSize(
            bulletText,
            pdfWidth - (key ? margin * 3 : margin * 2)
          );

          lines.forEach((line: string) => {
            pdf.text(line, key ? margin + 15 : margin, yOffset);
            yOffset += 12;
          });
        });
        yOffset += 5;
      });

      yOffset += 15;
    });

    pdf.save("resume.pdf");
  }