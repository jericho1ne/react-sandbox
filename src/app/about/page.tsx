import AboutBlocks from '@/components/AboutBlocks'
import Image from 'next/image'

export default function About() {
  return (
    <main className="page-about">
      <AboutBlocks />
      <div className="flex justify-center">
        <Image
          className="relative"
          src="/circle.svg"
          alt="zen circle logo"
          width={120}
          height={120}
          priority
        />
      </div>
    </main>
  )
}
