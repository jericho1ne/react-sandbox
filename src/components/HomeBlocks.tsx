import Image from "next/image"

export default function HomeBlocks() {
  const cards = [
    { 
      title: "General Docs", 
      description: "In-depth information about Next.js features.", 
      link: "https://nextjs.org/docs" 
    }, { 
      title: "Request Caching", 
      description: "Learn about Next.js in an interactive course with quizzes!", 
      link: "https://nextjs.org/docs/app/building-your-application/caching#data-cache"
    }, { 
      title: "Templates", 
      description: "A rich collection of Next.js starter templates.", 
      link: "https://vercel.com/templates?framework=next.js" 
    }, {
      title: "Deploy",
      description: "Deploy your Next.js site w/ Vercel, and connect it to a TLD.", 
      link: "https://vercel.com/new"
    }
  ]
  
  return (
    <div className="space-y-12 mt-8 mb-12">
      <div className="flex items-center justify-center h-auto">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={0}
          height={0}
          priority
          style={{ width: 'auto', height: '20px' }}
        />
      </div>

      <div className="mb-8 mt-12 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {cards.map((card, idx) => (
          <a
            key={idx}
            href={card.link}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              {card.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              {card.description}
            </p>
          </a>
        ))}
      </div>
    </div>
    )
  }