import { CheckCircle } from 'lucide-react'

const features = [
  'Free Resume Maker',
  'No Hidden Charges',
  'Highly ATS Friendly',
  'Professional Free Templates',
  'Multiple Download Formats'
]

export default function FeatureGrid() {
  return (
    <section className="py-12 bg-purple-50 w-full ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">
          Why Choose Our Resume Builder
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div 
              key={`feature-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-purple-600 p-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  {item}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  {getFeatureDescription(item)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function getFeatureDescription(feature: string): string {
  switch (feature) {
    case 'Free Resume Maker':
      return 'Create your professional resume at no cost with our easy-to-use builder.'
    case 'No Hidden Charges':
      return 'Enjoy all features without any surprise fees or hidden costs.'
    case 'Highly ATS Friendly':
      return 'Ensure your resume passes through Applicant Tracking Systems with our optimized templates.'
    case 'Professional Free Templates':
      return 'Choose from a variety of expertly designed templates suitable for any industry.'
    case 'Multiple Download Formats':
      return 'Download your resume in various formats including PDF, png, and more.'
    default:
      return 'Enhance your job application with our feature-rich resume builder.'
  }
}

