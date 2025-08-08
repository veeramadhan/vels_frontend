import Image from 'next/image';
import main from '../../../public/main.jpg';

export default function HomePage() {
  return (
    <>
      <section id='/' className="relative h-screen w-full">
        {/* Background image */}
        <Image
          src={main}
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10 top-0 flex items-center justify-center px-4 text-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Welcome to Vels Promoter
            </h1>
            <p className="text-lg sm:text-xl mb-8">
              Find your dream property today.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-300 leading-snug">
              நிலமும் வீடுகளும் உங்கள்<br />
              கனவுகளுக்கு உயிர் கொடுக்கும் இடம்.<br />
              விற்பனையும் நம்பிக்கையும் ஒரே இடத்தில்!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
