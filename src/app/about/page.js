import {
  FaMapMarkedAlt,
  FaSmile,
  FaRupeeSign,
  FaHandshake,
  FaUserSecret,
} from "react-icons/fa";

export default function AboutPage() {
  const features = [
    {
      icon: <FaMapMarkedAlt />,
      title: "Local Knowledge",
      desc: "We know the heart of every street, every property, and every deal in your area.",
    },
    {
      icon: <FaRupeeSign />,
      title: "Affordable & Trustworthy",
      desc: "We offer budget-friendly, reliable property deals you can trust.",
    },
    {
      icon: <FaSmile />,
      title: "Happy Clients",
      desc: "Over 1,000+ satisfied clients who found their dream properties with us.",
    },
    {
      icon: <FaHandshake />,
      title: "Not Like the Rest",
      desc: "We believe in sincerity, not sales tactics. We’re not like other agents.",
    },
    {
      icon: <FaUserSecret />,
      title: "Professional & Quiet",
      desc: "We work silently behind the scenes — no noise, no pressure, just results.",
    },
    {
      icon: <FaUserSecret />,
      title: "Dedicated Support",
      desc: "Our team is always available to assist you with personalized service.",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 pt-24 px-6 md:px-12 lg:px-20"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-14">
        Why Choose Vels Promoter?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-5 text-3xl bg-blue-600 text-white group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
            <p className="leading-relaxed text-gray-700">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
