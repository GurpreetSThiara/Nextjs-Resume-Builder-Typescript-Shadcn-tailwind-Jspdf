# Resume Builder Pro

A modern, feature-rich resume builder application built with Next.js 15 and React, designed to help users create professional resumes with ease.

![Resume Builder Pro](public/og.png)

## 🌟 Features

- **Modern UI/UX**: Built with a clean, responsive interface using TailwindCSS and Radix UI components
- **Multiple Resume Templates**: Choose from various professionally designed templates
- **Export Options**: Download resumes in multiple formats (PDF, DOCX)
- **AI Integration**: Smart resume suggestions and improvements
- **Real-time Preview**: See changes as you type
- **Privacy-Focused**: Your data stays local and secure
- **Mobile Responsive**: Create resumes on any device
- **SEO Optimized**: Implements next-sitemap for better search engine visibility

## 🚀 Tech Stack

- **Framework**: Next.js 15.0.2
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 3.4.1
- **Components**: Radix UI
- **PDF Processing**: 
  - jspdf
  - pdf-lib
  - html2canvas
- **Document Handling**: 
  - docxtemplater
  - mammoth
  - pizzip
- **Type Safety**: TypeScript
- **Code Quality**: ESLint

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
resume-builder/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── ai/               # AI features
│   ├── blog/             # Blog section
│   ├── contact/          # Contact page
│   ├── resume-templates/ # Resume templates
│   └── ...
├── components/           # Reusable UI components
├── lib/                 # Utility libraries
├── public/              # Static assets
└── utils/              # Helper functions
```

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
# Add other environment variables as needed
```

### Tailwind Configuration

The project uses a custom Tailwind configuration (tailwind.config.ts) with:
- Custom color schemes
- Extended typography
- Animation utilities
- Responsive breakpoints

## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run postbuild`: Generate sitemap

## 🔒 Security

- All user data is processed client-side
- No personal information is stored on servers
- Implements secure PDF generation
- Regular security updates

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Optimized for various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@resumebuilder.com or join our Slack channel.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- All contributors and users

---

Built with ❤️ using [Next.js](https://nextjs.org/)
